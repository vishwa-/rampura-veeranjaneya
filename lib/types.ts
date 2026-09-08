export interface Pooja {
  id: string;
  slug: string;
  name_en: string;
  name_kn: string;
  desc_en?: string | null;
  desc_kn?: string | null;
  amount_paise: number;
  capacity?: number | null;
  active: boolean;
  created_at?: string;
}

export interface PoojaDate {
  id: string;
  pooja_id: string;
  event_date: string;
  status: 'open' | 'closed' | 'cancelled';
  created_at?: string;
  remaining?: number | null;
  counts?: { paid: number; pending: number };
  poojas?: Pooja | { name_en: string; slug: string; capacity: number | null };
}

export interface Booking {
  id: string;
  booking_ref: string;
  pooja_date_id: string;
  pooja_id: string;
  devotee_name: string;
  phone: string;
  email?: string | null;
  gotra?: string | null;
  nakshatra?: string | null;
  rashi?: string | null;
  family_names?: string | null;
  note?: string | null;
  lang: 'en' | 'kn';
  amount_paise: number;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  status: 'pending' | 'paid' | 'expired' | 'cancelled' | 'refunded';
  needs_review?: boolean;
  created_at?: string;
  expires_at?: string;
  paid_at?: string | null;
  pooja_dates?: { event_date: string };
  poojas?: { name_en: string; name_kn: string; slug?: string };
  wa_messages?: Array<{ kind: 'confirmation' | 'reminder'; status: string; error?: string | null }>;
}

export interface ContactPerson {
  name: string;
  kn: string;
  role: string;
  roleKn: string;
  tel: string;
  display: string;
}
