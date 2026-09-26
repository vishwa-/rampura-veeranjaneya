"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { Pooja, PoojaDate } from "@/lib/types";

interface PoojaCalendarProps {
  dates: PoojaDate[];
  selectedPooja: Pooja;
  selection: { dateRow: PoojaDate; pooja: Pooja } | null;
  onSelectDate: (dateRow: PoojaDate, pooja: Pooja) => void;
  bookable: (d: PoojaDate) => boolean;
}

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MONTHS_KN = [
  "ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್",
  "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"
];

const DOW_SHORT_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_SHORT_KN = ["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"];

const DOW_FULL_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DOW_FULL_KN = ["ಭಾನುವಾರ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ"];

export const PoojaCalendar: React.FC<PoojaCalendarProps> = ({
  dates,
  selectedPooja,
  selection,
  onSelectDate,
  bookable,
}) => {
  const { isKn, t } = useLanguage();

  // O(1) date lookup map by "YYYY-MM-DD"
  const dateMap = useMemo(() => {
    const map = new Map<string, PoojaDate>();
    for (const d of dates) {
      map.set(d.event_date, d);
    }
    return map;
  }, [dates]);

  // Today in IST / Local string format "YYYY-MM-DD"
  const todayStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  // Determine allowed date range bounds from existing available dates
  const { minYearMonth, maxYearMonth, initialYear, initialMonth } = useMemo(() => {
    const now = new Date();
    const currentYM = now.getFullYear() * 12 + (now.getMonth() + 1);

    if (!dates.length) {
      return {
        minYearMonth: currentYM,
        maxYearMonth: currentYM + 12,
        initialYear: now.getFullYear(),
        initialMonth: now.getMonth() + 1,
      };
    }

    // Sort to find bounds
    const sorted = [...dates].sort((a, b) => a.event_date.localeCompare(b.event_date));
    const firstDate = sorted[0].event_date;
    const lastDate = sorted[sorted.length - 1].event_date;

    const [firstY, firstM] = firstDate.split("-").map(Number);
    const [lastY, lastM] = lastDate.split("-").map(Number);

    const firstYM = firstY * 12 + firstM;
    const lastYM = lastY * 12 + lastM;

    // Minimum viewable month should not precede the current calendar month
    const minYM = Math.max(firstYM, currentYM);
    const maxYM = Math.max(lastYM, minYM);

    let initY = firstY;
    let initM = firstM;

    if (selection && selection.dateRow) {
      const [sy, sm] = selection.dateRow.event_date.split("-").map(Number);
      initY = sy;
      initM = sm;
    } else {
      const firstBookable = sorted.find(bookable);
      if (firstBookable) {
        const [by, bm] = firstBookable.event_date.split("-").map(Number);
        initY = by;
        initM = bm;
      }
    }

    return {
      minYearMonth: minYM,
      maxYearMonth: maxYM,
      initialYear: initY,
      initialMonth: initM,
    };
  }, [dates, selection, bookable]);

  // Current calendar view (year and 1-indexed month)
  const [viewYear, setViewYear] = useState<number>(initialYear);
  const [viewMonth, setViewMonth] = useState<number>(initialMonth);

  // Sync view when pooja or selection changes
  useEffect(() => {
    setViewYear(initialYear);
    setViewMonth(initialMonth);
  }, [initialYear, initialMonth, selectedPooja.id]);

  const currentViewYM = viewYear * 12 + viewMonth;
  const canPrev = currentViewYM > minYearMonth;
  const canNext = currentViewYM < maxYearMonth;

  const handlePrevMonth = useCallback(() => {
    if (!canPrev) return;
    if (viewMonth === 1) {
      setViewYear((prev) => prev - 1);
      setViewMonth(12);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  }, [canPrev, viewMonth]);

  const handleNextMonth = useCallback(() => {
    if (!canNext) return;
    if (viewMonth === 12) {
      setViewYear((prev) => prev + 1);
      setViewMonth(1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  }, [canNext, viewMonth]);

  // Calculate calendar grid cells for viewYear and viewMonth (Timezone-safe pure UTC math)
  const calendarDays = useMemo(() => {
    const daysInCurrentMonth = new Date(Date.UTC(viewYear, viewMonth, 0)).getUTCDate();
    const firstDayOfWeek = new Date(Date.UTC(viewYear, viewMonth - 1, 1)).getUTCDay();
    const daysInPrevMonth = new Date(Date.UTC(viewYear, viewMonth - 1, 0)).getUTCDate();

    interface CalendarCell {
      key: string;
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      dateRow?: PoojaDate;
      isBookable: boolean;
      isSelected: boolean;
      isPast: boolean;
    }

    const cells: CalendarCell[] = [];

    // Leading padding days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevM = viewMonth === 1 ? 12 : viewMonth - 1;
      const prevY = viewMonth === 1 ? viewYear - 1 : viewYear;
      const dateStr = `${prevY}-${String(prevM).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

      cells.push({
        key: `prev-${dateStr}`,
        dateStr,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isBookable: false,
        isSelected: false,
        isPast: dateStr < todayStr,
      });
    }

    // Days in current month
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dateRow = dateMap.get(dateStr);
      const isPast = dateStr < todayStr;
      const isBookable = Boolean(dateRow && !isPast && bookable(dateRow));
      const isSelected = Boolean(selection && selection.dateRow && selection.dateRow.event_date === dateStr);

      cells.push({
        key: `curr-${dateStr}`,
        dayNumber: d,
        dateStr,
        isCurrentMonth: true,
        dateRow,
        isBookable,
        isSelected,
        isPast,
      });
    }

    // Trailing padding days from next month to complete the row
    const remainder = cells.length % 7;
    const trailingCount = remainder === 0 ? 0 : 7 - remainder;

    for (let i = 1; i <= trailingCount; i++) {
      const nextM = viewMonth === 12 ? 1 : viewMonth + 1;
      const nextY = viewMonth === 12 ? viewYear + 1 : viewYear;
      const dateStr = `${nextY}-${String(nextM).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

      cells.push({
        key: `next-${dateStr}`,
        dateStr,
        dayNumber: i,
        isCurrentMonth: false,
        isBookable: false,
        isSelected: false,
        isPast: false,
      });
    }

    return cells;
  }, [viewYear, viewMonth, dateMap, todayStr, bookable, selection]);

  const availableInViewMonthCount = useMemo(() => {
    return calendarDays.filter((c) => c.isCurrentMonth && c.isBookable).length;
  }, [calendarDays]);

  const monthLabel = isKn ? MONTHS_KN[viewMonth - 1] : MONTHS_EN[viewMonth - 1];

  return (
    <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-xl p-4 sm:p-7 shadow-xs max-w-2xl mx-auto my-6 transition-all">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E5DDD0]">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={!canPrev}
          aria-label={isKn ? "ಹಿಂದಿನ ತಿಂಗಳು" : "Previous month"}
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-[#D9CDBF] bg-[#FCFBF8] text-[#1A1412] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C1D24] ${
            canPrev
              ? "hover:bg-[#F3EDE2] hover:border-[#7C1D24] hover:text-[#7C1D24] cursor-pointer"
              : "opacity-35 cursor-not-allowed text-stone-400"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1A1412]">
            {monthLabel} <span className="font-normal text-[#5B5045]">{viewYear}</span>
          </h3>
          <p className="text-xs text-[#7C1D24] font-medium mt-0.5">
            {availableInViewMonthCount > 0
              ? isKn
                ? `${availableInViewMonthCount} ದಿನಾಂಕಗಳು ಲಭ್ಯವಿದೆ`
                : `${availableInViewMonthCount} date${availableInViewMonthCount === 1 ? "" : "s"} open this month`
              : isKn
              ? "ಈ ತಿಂಗಳು ಲಭ್ಯವಿಲ್ಲ"
              : "No open dates this month"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          disabled={!canNext}
          aria-label={isKn ? "ಮುಂದಿನ ತಿಂಗಳು" : "Next month"}
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-[#D9CDBF] bg-[#FCFBF8] text-[#1A1412] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C1D24] ${
            canNext
              ? "hover:bg-[#F3EDE2] hover:border-[#7C1D24] hover:text-[#7C1D24] cursor-pointer"
              : "opacity-35 cursor-not-allowed text-stone-400"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday Columns Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
        {(isKn ? DOW_SHORT_KN : DOW_SHORT_EN).map((day, idx) => {
          const isWeekend = idx === 0 || idx === 6;
          return (
            <div
              key={idx}
              className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider py-1.5 ${
                isWeekend ? "text-[#7C1D24]" : "text-[#7A6E63]"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Calendar 7-Column Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2" role="grid" aria-label={`${monthLabel} ${viewYear}`}>
        {calendarDays.map((cell) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={cell.key}
                aria-hidden="true"
                className="min-h-[52px] sm:min-h-[68px] p-1 flex flex-col items-center justify-start rounded-lg opacity-25 select-none pointer-events-none"
              >
                <span className="text-xs sm:text-sm font-serif text-[#A39688]">
                  {cell.dayNumber}
                </span>
              </div>
            );
          }

          const { dateRow, isBookable, isSelected, isPast, dayNumber, dateStr } = cell;
          const [y, m, d] = dateStr.split("-").map(Number);
          const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
          const dayName = isKn ? DOW_FULL_KN[dow] : DOW_FULL_EN[dow];

          let accessibleLabel = `${dayName}, ${dayNumber} ${monthLabel} ${viewYear}`;
          if (isSelected) accessibleLabel += `, ${isKn ? "ಆಯ್ಕೆಯಾಗಿದೆ" : "Selected"}`;
          else if (isBookable) {
            if (selectedPooja.capacity === 1) accessibleLabel += `, ${isKn ? "1 ಕುಟುಂಬ" : "1 family available"}`;
            else if (dateRow?.remaining != null) accessibleLabel += `, ${dateRow.remaining} ${isKn ? "ಸ್ಥಳಗಳು ಬಾಕಿ" : "slots available"}`;
            else accessibleLabel += `, ${isKn ? "ಲಭ್ಯವಿದೆ" : "Available"}`;
          } else if (dateRow && !isBookable) {
            accessibleLabel += `, ${isKn ? "ಭರ್ತಿಯಾಗಿದೆ" : "Booked out"}`;
          } else {
            accessibleLabel += `, ${isKn ? "ಲಭ್ಯವಿಲ್ಲ" : "Not available"}`;
          }

          if (isBookable && dateRow) {
            return (
              <button
                key={cell.key}
                type="button"
                role="gridcell"
                aria-selected={isSelected}
                aria-label={accessibleLabel}
                onClick={() => onSelectDate(dateRow, selectedPooja)}
                className={`group relative min-h-[52px] sm:min-h-[68px] p-1 sm:p-1.5 flex flex-col items-center justify-between rounded-lg border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C1D24] focus-visible:ring-offset-2 ${
                  isSelected
                    ? "bg-[#7C1D24] border-[#7C1D24] text-white shadow-md transform scale-[1.02] z-10"
                    : "bg-[#FCFBF8] border-[#D9CDBF] text-[#1A1412] hover:border-[#7C1D24] hover:bg-[#FFF9F3] hover:shadow-xs"
                }`}
              >
                <span
                  className={`font-serif text-base sm:text-lg font-bold leading-tight ${
                    isSelected ? "text-white" : "text-[#1A1412] group-hover:text-[#7C1D24]"
                  }`}
                >
                  {dayNumber}
                </span>

                <span
                  className={`text-[8.5px] sm:text-[10px] tracking-normal font-sans font-semibold rounded px-1 sm:px-1.5 py-0.5 leading-none transition-colors ${
                    isSelected
                      ? "bg-white/20 text-[#FFF8EB]"
                      : "bg-[#7C1D24]/10 text-[#7C1D24] group-hover:bg-[#7C1D24] group-hover:text-white"
                  }`}
                >
                  {selectedPooja.capacity === 1
                    ? isKn ? "1 ಕುಟುಂಬ" : "1 family"
                    : dateRow.remaining != null
                    ? isKn ? `${dateRow.remaining} ಬಾಕಿ` : `${dateRow.remaining} left`
                    : isKn ? "ಲಭ್ಯ" : "Open"}
                </span>

                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-[#7C1D24] rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                    ✓
                  </span>
                )}
              </button>
            );
          }

          if (dateRow && !isBookable) {
            const isCancelled = dateRow.status === "cancelled";
            const badgeText = isCancelled
              ? isKn ? "ರದ್ದು" : "Cancel"
              : isKn ? "ಭರ್ತಿ" : "Full";

            return (
              <div
                key={cell.key}
                role="gridcell"
                aria-disabled="true"
                aria-label={accessibleLabel}
                className="min-h-[52px] sm:min-h-[68px] p-1 sm:p-1.5 flex flex-col items-center justify-between rounded-lg border border-dashed border-stone-300/70 bg-[#F4F1EA]/60 select-none opacity-50 cursor-not-allowed"
              >
                <span className="font-serif text-sm sm:text-base font-medium text-stone-400 leading-tight">
                  {dayNumber}
                </span>
                <span className="text-[8px] sm:text-[9.5px] font-sans font-medium text-stone-500 uppercase">
                  {badgeText}
                </span>
              </div>
            );
          }

          return (
            <div
              key={cell.key}
              role="gridcell"
              aria-disabled="true"
              aria-label={accessibleLabel}
              className="min-h-[52px] sm:min-h-[68px] p-1 sm:p-1.5 flex flex-col items-center justify-center rounded-lg border border-transparent select-none opacity-40 cursor-default"
            >
              <span className={`font-serif text-sm sm:text-base leading-tight ${isPast ? "text-stone-300 line-through" : "text-stone-400"}`}>
                {dayNumber}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend & Instructions Footer */}
      <div className="mt-6 pt-4 border-t border-[#E5DDD0] flex items-center justify-between gap-4 flex-wrap text-xs text-[#5B5045]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#FCFBF8] border border-[#7C1D24] text-[#7C1D24] text-[8px] flex items-center justify-center font-bold">
              •
            </span>
            <span>{isKn ? "ಲಭ್ಯವಿರುವ ದಿನಾಂಕ" : "Available"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#7C1D24] text-white text-[8px] flex items-center justify-center font-bold">
              ✓
            </span>
            <span>{isKn ? "ಆಯ್ಕೆಯಾಗಿದೆ" : "Selected"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#F4F1EA] border border-dashed border-stone-300 opacity-60"></span>
            <span>{isKn ? "ಭರ್ತಿ / ಲಭ್ಯವಿಲ್ಲ" : "Full / Unavailable"}</span>
          </div>
        </div>

        <span className="text-[11px] text-[#7A6E63] italic">
          {t("Tap any open date to proceed", "ಮುಂದುವರಿಯಲು ದಿನಾಂಕವನ್ನು ಸ್ಪರ್ಶಿಸಿ")}
        </span>
      </div>
    </div>
  );
};
