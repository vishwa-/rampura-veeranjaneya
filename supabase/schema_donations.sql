-- Donations (E-Hundi / Seva Kanike) schema for srikshetrarampura.in
-- Run this in your Supabase SQL Editor once.

create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  donation_ref text unique not null,
  donor_name text not null,
  phone text not null, -- E.164, +91XXXXXXXXXX
  email text,
  pan text,
  gotra text,
  nakshatra text,
  rashi text,
  note text,
  lang text not null default 'kn' check (lang in ('en','kn')),
  amount_paise int not null check (amount_paise >= 1000), -- minimum ₹10
  razorpay_order_id text unique,
  razorpay_payment_id text,
  status text not null default 'pending'
    check (status in ('pending','paid','expired','cancelled','refunded')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists donations_phone_idx on donations (phone);
create index if not exists donations_status_idx on donations (status);
create index if not exists donations_created_at_idx on donations (created_at desc);
create index if not exists donations_order_id_idx on donations (razorpay_order_id);

-- Enable RLS: only service role key can access/modify
alter table donations enable row level security;
revoke all on donations from anon, authenticated;
