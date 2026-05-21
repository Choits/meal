/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, Info } from "lucide-react";
import { MealData } from "../types";
import { getWeekOfMonth, formatDateKey } from "../utils";
import WeekDateSelector from "./WeekDateSelector";
import MealCard from "./MealCard";

interface WeeklyMenuScreenProps {
  weekDates: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  allMeals: MealData[];
  todayDateKey: string;
}

export function WeeklyMenuScreen({
  weekDates,
  selectedDate,
  onSelectDate,
  allMeals,
  todayDateKey,
}: WeeklyMenuScreenProps) {
  const selectedDateKey = formatDateKey(selectedDate);
  const selectedDateMeals = allMeals.filter((m) => m.dateKey === selectedDateKey);

  const lunchMeal = selectedDateMeals.find((m) => m.mealType === "lunch");
  const dinnerMeal = selectedDateMeals.find((m) => m.mealType === "dinner");

  // Dynamic label: "10월 3주차" style representation of active week date
  const weekLabel = getWeekOfMonth(selectedDate);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-4 md:px-6 py-6 font-gmarket">
      {/* Title block */}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-bold text-olive-green tracking-wide">
          주간 식단
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-text-dark">
          {weekLabel}
        </h2>
      </div>

      {/* Date Selectors (Fully responsive horizontal picker layout) */}
      <div className="w-full">
        <WeekDateSelector
          weekDates={weekDates}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          todayDateKey={todayDateKey}
        />
      </div>

      {/* Meal details list. Responsive design: vertical stack on mobile, 2 columns on tablet and desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
        {/* Lunch section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-text-dark flex items-center gap-1 px-1">
            <span className="w-1.5 h-4 bg-deep-olive rounded-full" />
            중식 메뉴 식단
          </h3>
          {lunchMeal ? (
            <MealCard meal={lunchMeal} />
          ) : (
            <div className="bg-card-white rounded-3xl p-8 text-center border border-soft-gray/30 text-text-dark/50 flex flex-col items-center justify-center min-h-[220px]">
              <Info className="w-8 h-8 text-text-dark/30 mb-2" />
              <p className="font-semibold text-sm">해당 날짜의 중식 정보가 없습니다.</p>
            </div>
          )}
        </div>

        {/* Dinner section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-text-dark flex items-center gap-1 px-1">
            <span className="w-1.5 h-4 bg-olive-green rounded-full" />
            석식 메뉴 식단
          </h3>
          {dinnerMeal ? (
            <MealCard meal={dinnerMeal} />
          ) : (
            <div className="bg-card-white rounded-3xl p-8 text-center border border-soft-gray/30 text-text-dark/50 flex flex-col items-center justify-center min-h-[220px]">
              <Info className="w-8 h-8 text-text-dark/30 mb-2" />
              <p className="font-semibold text-sm">해당 날짜의 석식 정보가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeeklyMenuScreen;
