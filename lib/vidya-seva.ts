import { VidyaSevaItemSelection } from "@/lib/types";

export interface VidyaSevaCatalogItem {
  id: keyof VidyaSevaItemSelection;
  name_en: string;
  name_kn: string;
  desc_en: string;
  desc_kn: string;
  price_rupees: number;
}

export const VIDYA_SEVA_CATALOG: Record<keyof VidyaSevaItemSelection, VidyaSevaCatalogItem> = {
  combo: {
    id: "combo",
    name_en: "Combo (with pouch)",
    name_kn: "ಕಾಂಬೋ (ಪೌಚ್ ಸಹಿತ)",
    desc_en: "Complete student kit: Notebook, Pen, Pencil, Eraser, Sharpener & Pouch",
    desc_kn: "ಸಂಪೂರ್ಣ ವಿದ್ಯಾರ್ಥಿ ಕಿಟ್: ನೋಟ್‌ಬುಕ್, ಪೆನ್, ಪೆನ್ಸಿಲ್ ಮತ್ತು ಆಕರ್ಷಕ ಪೌಚ್",
    price_rupees: 100,
  },
  book: {
    id: "book",
    name_en: "Book",
    name_kn: "ಪುಸ್ತಕ (ನೋಟ್‌ಬುಕ್)",
    desc_en: "Single high-quality 192-page ruled long notebook for students",
    desc_kn: "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉತ್ತಮ ಗುಣಮಟ್ಟದ 192-ಪುಟಗಳ ನೋಟ್‌ಬುಕ್",
    price_rupees: 40,
  },
  pen: {
    id: "pen",
    name_en: "Pen",
    name_kn: "ಪೆನ್",
    desc_en: "Smooth-writing ball pen for classroom study and exams",
    desc_kn: "ತರಗತಿ ಮತ್ತು ಪರೀಕ್ಷೆಗಳಿಗೆ ಬರೆಯುವ ಪೆನ್",
    price_rupees: 15,
  },
  pencil: {
    id: "pencil",
    name_en: "Pencil",
    name_kn: "ಪೆನ್ಸಿಲ್",
    desc_en: "Quality writing and drawing pencil for young learners",
    desc_kn: "ಚಿಕ್ಕ ಮಕ್ಕಳಿಗೆ ಬರವಣಿಗೆ ಹಾಗೂ ಚಿತ್ರಕಲೆಗೆ ಗುಣಮಟ್ಟದ ಪೆನ್ಸಿಲ್",
    price_rupees: 15,
  },
};

/**
 * Calculates total amount in Paise strictly from trusted catalog prices.
 */
export function calcVidyaSevaTotalPaise(items?: Partial<VidyaSevaItemSelection> | null): number {
  if (!items) return 0;
  let totalRupees = 0;
  for (const [key, item] of Object.entries(VIDYA_SEVA_CATALOG)) {
    const qty = Math.max(0, Math.floor(Number(items[key as keyof VidyaSevaItemSelection]) || 0));
    totalRupees += qty * item.price_rupees;
  }
  return totalRupees * 100;
}

/**
 * Returns a human-readable breakdown string, e.g. "2x Combo, 1x Book".
 */
export function formatVidyaSevaSummary(items?: Partial<VidyaSevaItemSelection> | null, isKn = false): string {
  if (!items) return "";
  const parts: string[] = [];
  for (const [key, item] of Object.entries(VIDYA_SEVA_CATALOG)) {
    const qty = Math.max(0, Math.floor(Number(items[key as keyof VidyaSevaItemSelection]) || 0));
    if (qty > 0) {
      const name = isKn ? item.name_kn : item.name_en;
      parts.push(`${qty} × ${name}`);
    }
  }
  return parts.join(", ");
}
