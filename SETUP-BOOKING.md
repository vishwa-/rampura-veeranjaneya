# Booking system setup runbook

> Status 2026-08-30: Sections 1 (Supabase) and 4 (Vercel env vars) are DONE
> and verified end to end on the branch preview (calendar live, booking RPC
> live, admin auth enforced, Sep 5 date seeded). Remaining: the admin user
> in Supabase Auth if not yet created, section 2 (Razorpay) and section 3
> (Meta/WhatsApp). Note: NODEJS_HELPERS=0 is required in Vercel env (set).

The code on the `booking` branch is complete but needs four external accounts
wired up before it can go live. Everything below is one-time setup.

## 1. Supabase (database + admin login) — ~30 minutes, no waiting

1. Create a free project at supabase.com (region: Mumbai `ap-south-1`).
2. SQL Editor -> paste and run `supabase/schema.sql` from this repo.
3. Authentication -> Sign In / Up: **disable public sign-ups**.
4. Authentication -> Users -> Add user: create the admin account
   (email + strong password; enable MFA on it after first login).
5. Project Settings -> API Keys (this project uses the new key system):
   - Project URL (https://jhpklnpdctehrglirpxk.supabase.co) -> Vercel env `SUPABASE_URL`
   - The `sb_secret_...` key -> Vercel env `SUPABASE_SERVICE_ROLE_KEY` (secret!)
   - The `sb_publishable_...` key -> already wired into `assets/js/admin.js`
     (public by design). [Steps 1-3 and 5 DONE 2026-08-30; remaining: admin
     user creation, sign-ups already disabled? see checklist]

## 2. Razorpay (payments) — KYC takes ~3-7 working days; test mode works day one

1. Sign up at razorpay.com as the trust (business type: Trust / NGO).
   Documents: trust PAN, registration deed/certificate, bank account,
   authorized signatory KYC.
2. Meanwhile, use **Test Mode**: Settings -> API Keys -> Generate test keys
   -> Vercel envs `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`.
3. Settings -> Webhooks -> Add:
   - URL: `https://<deployment>/api/rzp-webhook`
   - Secret: generate a random string -> Vercel env `RAZORPAY_WEBHOOK_SECRET`
   - Events: `payment.captured`, `refund.processed`
4. At go-live, repeat keys + webhook in Live Mode.

## 3. WhatsApp Cloud API (Meta) — business verification takes 1-3 weeks; start now

1. You need a **new phone number** for the temple that has never been on
   consumer WhatsApp (once on the API it cannot run the phone app).
2. business.facebook.com -> create a Business Portfolio for the trust ->
   Settings -> Business Verification (upload trust documents).
3. developers.facebook.com -> Create App (type: Business) -> add the
   WhatsApp product. This gives a **test number** immediately: add up to 5
   recipient numbers to test with while verification runs.
4. WhatsApp -> API Setup: copy
   - Phone number ID -> Vercel env `WA_PHONE_NUMBER_ID`
   - Create a **System User** (Business Settings -> Users -> System Users),
     grant it the WhatsApp app + WABA, generate a **permanent token** with
     `whatsapp_business_messaging` -> Vercel env `WA_TOKEN`
     (the dashboard's default token expires in 24h — do not use it).
   - App Settings -> Basic -> App Secret -> Vercel env `WA_APP_SECRET`.
5. WhatsApp -> Configuration -> Webhook:
   - URL: `https://<deployment>/api/wa-webhook`
   - Verify token: any random string -> Vercel env `WA_VERIFY_TOKEN`
   - Subscribe to the `messages` field (delivers message status updates).
6. Message Templates -> create two **Utility** templates, each in English
   ("en") and Kannada ("kn"):

   `booking_confirmation` (body):
   > Namaste {{1}}, your booking for {{2}} on {{3}} at Sri Kubera
   > Anjaneyaswamy Temple, Rampura is confirmed. Booking reference: {{4}}.
   > Contribution received: Rs {{5}}. For any help, call +91 96206 36465.

   `pooja_reminder` (body):
   > Namaste {{1}}, a gentle reminder: your {{2}} at Sri Kubera
   > Anjaneyaswamy Temple, Rampura is tomorrow, {{3}}. Booking reference:
   > {{4}}. Om Sri Anjaneyaya Namaha.

   (Kannada versions: translate the same bodies; parameter order must match.)

## 4. Vercel

1. Project Settings -> Environment Variables: set everything in `.env.example`
   (`CRON_SECRET` = any long random string; `ADMIN_EMAILS` = comma-separated
   admin login emails, matching the Supabase user(s) from step 1.4).
2. The `booking` branch deploys as a Preview; use its URL for all testing
   (Razorpay test webhook + Meta webhook can point at the preview URL).
3. Merge to `main` only at go-live (see checklist below).

## 5. Code placeholders to fill

- `assets/js/admin.js`: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (from step 1.5).

## Go-live checklist

- [ ] Supabase: schema run, sign-ups disabled, admin user created with MFA.
- [ ] Poojas + calendar dates seeded via admin.html.
- [ ] Razorpay live keys in Vercel, live webhook configured, KYC approved.
- [ ] Meta business verified, production number connected, both templates
      approved in en + kn, webhook verified.
- [ ] One real low-value booking end-to-end (pay, WhatsApp confirmation
      received), then refund from the Razorpay dashboard and confirm the
      admin panel shows status `refunded`.
- [ ] Kannada copy on book.html proofread by a native reader.
- [ ] 2FA enabled on Vercel, GitHub, Supabase, Razorpay, Meta accounts.
- [ ] Merge `booking` -> `main`.
