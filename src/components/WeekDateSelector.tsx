/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { formatDateKey } from "../utils";

interface WeekDateSelectorProps {
  weekDates: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  todayDateKey: string;
}

export function WeekDateSelector({
  weekDates,
  selectedDate,
  onSelectDate,
  todayDateKey,
}: WeekDateSelectorProps) {
  const dayLabels = ["월", "화", "수", "목", "금"];
  const selectedDateKey = formatDateKey(selectedDate);

  return (
    <div className="bg-card-white rounded-2xl p-4 ambient-shadow flex justify-between items-center w-full">
      {weekDates.map((date, idx) => {
        const dateKey = formatDateKey(date);
        const isSelected = dateKey === selectedDateKey;
        const isToday = dateKey === todayDateKey;
        const dayNum = date.getDate();
        const dayLabel = dayLabels[idx] || "일";

        return (
          <button
            key={dateKey}
            onClick={() => onSelectDate(date)}
            className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl w-[18%] transition-all duration-200 focus:outline-none relative group ${
              isSelected
                ? "bg-deep-olive text-card-white shadow-md scale-105"
                : "text-text-dark/80 hover:bg-soft-gray/50 active:scale-95"
            }`}
          >
            <span className={`text-xs font-semibold ${isSelected ? "text-sage-green" : "text-text-dark/60"}`}>
              {dayLabel}
            </span>
            <span className="text-lg font-bold mt-1">
              {dayNum}
            </span>
            {isToday && !isSelected && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-olive-green" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default WeekDateSelector;
