-- Vidhya Seva schema for srikshetrarampura.in
-- Run this in your Supabase SQL Editor once.

create table if not exists vidya_sevas (
  id uuid primary key default gen_random_uuid(),
  booking_ref text unique not null,
  devotee_name text not null,
  phone text not null, -- E.164, +91XXXXXXXXXX
  email text,
  gotra text,
  nakshatra text,
  rashi text,
  note text,
  lang text not null default 'kn' check (lang in ('en','kn')),
  items jsonb not null, -- { "combo": 2, "book": 1, "pencil": 0, "pen": 0 }
  total_amount_paise int not null check (total_amount_paise >= 1500), -- minimum ₹15
  razorpay_order_id text unique,
  razorpay_payment_id text,
  status text not null default 'pending'
    check (status in ('pending','paid','expired','cancelled','refunded')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists vidya_sevas_phone_idx on vidya_sevas (phone);
create index if not exists vidya_sevas_status_idx on vidya_sevas (status);
create index if not exists vidya_sevas_created_at_idx on vidya_sevas (created_at desc);
create index if not exists vidya_sevas_order_id_idx on vidya_sevas (razorpay_order_id);

-- Enable RLS: only service role key can access/modify
alter table vidya_sevas enable row level security;
revoke all on vidya_sevas from anon, authenticated;
