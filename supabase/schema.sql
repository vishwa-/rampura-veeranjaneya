-- Pooja booking schema for srikshetrarampura.in
-- Run once in the Supabase SQL editor of a fresh project.
-- All money is in paise. All dates are IST calendar dates.

create table poojas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_en text not null,
  name_kn text not null,
  desc_en text,
  desc_kn text,
  amount_paise int not null check (amount_paise > 0),
  capacity int check (capacity >= 1), -- null = unlimited
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table pooja_dates (
  id uuid primary key default gen_random_uuid(),
  pooja_id uuid not null references poojas(id),
  event_date date not null,
  status text not null default 'open' check (status in ('open','closed','cancelled')),
  created_at timestamptz not null default now(),
  unique (pooja_id, event_date)
);
create index pooja_dates_event_date_idx on pooja_dates (event_date);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  booking_ref text unique not null,
  pooja_date_id uuid not null references pooja_dates(id),
  pooja_id uuid not null references poojas(id),
  devotee_name text not null,
  phone text not null, -- E.164, +91XXXXXXXXXX
  email text,
  gotra text,
  nakshatra text,
  rashi text,
  family_names text,
  note text,
  lang text not null default 'en' check (lang in ('en','kn')),
  amount_paise int not null, -- snapshot of poojas.amount_paise at booking time
  razorpay_order_id text unique,
  razorpay_payment_id text,
  status text not null default 'pending'
    check (status in ('pending','paid','expired','cancelled','refunded')),
  needs_review boolean not null default false,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  paid_at timestamptz
);
create index bookings_pooja_date_idx on bookings (pooja_date_id);
create index bookings_phone_idx on bookings (phone);

create table wa_messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id),
  kind text not null check (kind in ('confirmation','reminder')),
  wa_message_id text,
  status text not null default 'queued'
    check (status in ('queued','sent','delivered','read','failed')),
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  unique (booking_id, kind)
);
create index wa_messages_wa_id_idx on wa_messages (wa_message_id);

create table webhook_events (
  event_id text primary key,
  received_at timestamptz not null default now()
);

-- Deny-all row level security: only the service-role key (used by the
-- serverless functions) can touch data. No policies on purpose.
alter table poojas enable row level security;
alter table pooja_dates enable row level security;
alter table bookings enable row level security;
alter table wa_messages enable row level security;
alter table webhook_events enable row level security;

-- Belt and braces: PostgREST must not expose these to the public keys at all.
revoke all on all tables in schema public from anon, authenticated;
alter default privileges in schema public revoke all on tables from anon, authenticated;

-- A live hold is a paid booking or a pending one that has not expired.
create or replace function live_holds(p_date_id uuid)
returns int language sql stable as $$
  select count(*)::int from bookings
   where pooja_date_id = p_date_id
     and (status = 'paid' or (status = 'pending' and expires_at > now()));
$$;

create or replace function gen_booking_ref()
returns text language sql volatile as $$
  select 'RMP-' || to_char(now() at time zone 'Asia/Kolkata', 'YYYYMMDD')
         || '-' || upper(substr(md5(random()::text), 1, 6));
$$;

-- Creates a pending booking with a 30-minute hold, race-safely.
-- Raises exceptions whose MESSAGE is a machine-readable code:
--   date_closed | sold_out | already_booked | too_many
create or replace function create_booking(
  p_pooja_date_id uuid,
  p_name text, p_phone text, p_email text,
  p_gotra text, p_nakshatra text, p_rashi text,
  p_family_names text, p_note text, p_lang text
) returns jsonb language plpgsql as $$
declare
  d record;
  existing record;
  holds int;
  b record;
begin
  select pd.id as date_id, pd.event_date, pd.status as date_status,
         p.id as pooja_id, p.active, p.capacity, p.amount_paise,
         p.name_en, p.name_kn, p.slug
    into d
    from pooja_dates pd
    join poojas p on p.id = pd.pooja_id
   where pd.id = p_pooja_date_id
     for update of pd;

  if not found or not d.active or d.date_status <> 'open'
     or d.event_date < (now() at time zone 'Asia/Kolkata')::date then
    raise exception 'date_closed';
  end if;

  -- Same phone already holds a paid booking for this date.
  perform 1 from bookings
    where pooja_date_id = p_pooja_date_id and phone = p_phone and status = 'paid';
  if found then
    raise exception 'already_booked';
  end if;

  -- Same phone has a live pending booking for this date: resume it instead
  -- of creating a duplicate (refresh the hold so checkout can complete).
  select * into existing from bookings
   where pooja_date_id = p_pooja_date_id and phone = p_phone
     and status = 'pending' and expires_at > now()
   limit 1;
  if found then
    update bookings set expires_at = now() + interval '30 minutes'
     where id = existing.id;
    return jsonb_build_object(
      'booking_id', existing.id, 'booking_ref', existing.booking_ref,
      'amount_paise', existing.amount_paise, 'resumed', true,
      'razorpay_order_id', existing.razorpay_order_id,
      'pooja_name_en', d.name_en, 'pooja_name_kn', d.name_kn,
      'event_date', d.event_date);
  end if;

  -- Spam guard: at most 3 live pending bookings per phone overall.
  perform 1 from bookings
   where phone = p_phone and status = 'pending' and expires_at > now()
  having count(*) >= 3;
  if found then
    raise exception 'too_many';
  end if;

  holds := live_holds(p_pooja_date_id);
  if d.capacity is not null and holds >= d.capacity then
    raise exception 'sold_out';
  end if;

  insert into bookings
    (booking_ref, pooja_date_id, pooja_id, devotee_name, phone, email,
     gotra, nakshatra, rashi, family_names, note, lang, amount_paise,
     expires_at)
  values
    (gen_booking_ref(), p_pooja_date_id, d.pooja_id, p_name, p_phone, p_email,
     p_gotra, p_nakshatra, p_rashi, p_family_names, p_note, p_lang,
     d.amount_paise, now() + interval '30 minutes')
  returning * into b;

  return jsonb_build_object(
    'booking_id', b.id, 'booking_ref', b.booking_ref,
    'amount_paise', b.amount_paise, 'resumed', false,
    'razorpay_order_id', null,
    'pooja_name_en', d.name_en, 'pooja_name_kn', d.name_kn,
    'event_date', d.event_date);
end $$;

-- Stores the Razorpay order id created for a pending booking.
create or replace function attach_order(p_booking_id uuid, p_order_id text)
returns void language sql volatile as $$
  update bookings set razorpay_order_id = p_order_id
   where id = p_booking_id and status = 'pending';
$$;

-- Idempotent pending/expired -> paid transition. Returns the booking row
-- plus 'transitioned' so callers know whether to send the confirmation.
-- Honors payments that land after the hold expired (never strand money);
-- flags needs_review when that overruns a capacity limit.
create or replace function mark_paid(p_order_id text, p_payment_id text)
returns jsonb language plpgsql as $$
declare
  b record;
  cap int;
  paid_count int;
begin
  update bookings
     set status = 'paid', paid_at = now(), razorpay_payment_id = p_payment_id
   where razorpay_order_id = p_order_id and status in ('pending','expired')
  returning * into b;

  if not found then
    select * into b from bookings where razorpay_order_id = p_order_id;
    if not found then
      return jsonb_build_object('found', false);
    end if;
    return jsonb_build_object('found', true, 'transitioned', false,
      'booking', to_jsonb(b));
  end if;

  select p.capacity into cap from poojas p where p.id = b.pooja_id;
  if cap is not null then
    select count(*)::int into paid_count from bookings
     where pooja_date_id = b.pooja_date_id and status = 'paid';
    if paid_count > cap then
      update bookings set needs_review = true where id = b.id;
      b.needs_review := true;
    end if;
  end if;

  return jsonb_build_object('found', true, 'transitioned', true,
    'booking', to_jsonb(b));
end $$;

create or replace function mark_refunded(p_payment_id text)
returns void language sql volatile as $$
  update bookings set status = 'refunded'
   where razorpay_payment_id = p_payment_id and status = 'paid';
$$;

-- The public keys must not be able to call any of these via PostgREST.
revoke execute on all functions in schema public from anon, authenticated, public;
alter default privileges in schema public revoke execute on functions from anon, authenticated, public;

-- Seed: the first bookable pooja (edit price/dates in the admin UI later).
insert into poojas (slug, name_en, name_kn, desc_en, desc_kn, amount_paise, capacity)
values ('shravana-shanivara',
        'Shravana Shanivara Vishesha Pooja',
        'ಶ್ರಾವಣ ಶನಿವಾರ ವಿಶೇಷ ಪೂಜೆ',
        'Vishesha pooja and alankara in your family''s name on a Saturday of Shravana.',
        'ಶ್ರಾವಣದ ಶನಿವಾರದಂದು ನಿಮ್ಮ ಕುಟುಂಬದ ಹೆಸರಿನಲ್ಲಿ ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಅಲಂಕಾರ.',
        350000, 1);
