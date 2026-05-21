/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sun, Moon } from "lucide-react";
import { MealData } from "../types";
import { cleanDishName } from "../utils";
import AllergyChips from "./AllergyChips";

interface MealCardProps {
  meal: MealData;
}

export function MealCard({ meal }: MealCardProps) {
  const isLunch = meal.mealType === "lunch";

  // Clean raw NEIS menu dishes
  const cleanedDishes = meal.dishes
    .map((dish) => cleanDishName(dish))
    .filter((dish) => dish.length > 0);

  return (
    <article className="bg-card-white rounded-3xl p-6 ambient-shadow border border-soft-gray/30 hover:border-olive-green/20 transition-all flex flex-col gap-4 relative overflow-hidden group">
      {/* Dynamic abstract ambient backdrop bubbles */}
      <div
        className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 transition-colors duration-500 ${
          isLunch ? "bg-olive-green" : "bg-deep-olive"
        } group-hover:opacity-20`}
      />

      <header className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              isLunch ? "bg-sage-green text-deep-olive" : "bg-soft-gray text-text-dark"
            }`}
          >
            {isLunch ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </div>
          <h3 className="text-xl font-bold text-text-dark">{meal.title}</h3>
        </div>
        <span className="text-sm font-bold text-olive-green bg-sage-green/30 px-3 py-1.5 rounded-full">
          {meal.totalCalories} kcal
        </span>
      </header>

      <div className="h-px w-full bg-soft-gray" />

      <div className="relative z-10 flex-1">
        <p className="text-base text-text-dark leading-relaxed font-medium">
          {cleanedDishes.join(", ")}
        </p>
      </div>

      {/* Allergens visualization module */}
      <div className="relative z-10">
        <AllergyChips allergens={meal.allergens} />
      </div>

      {/* Dynamic protein requirement progress indicator */}
      <div className="mt-2 bg-cream-bg p-4 rounded-2xl flex flex-col gap-2 relative z-10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-dark/70 font-medium">단백질 달성률</span>
          <span className="font-bold text-deep-olive">{meal.proteinAchievement}%</span>
        </div>
        <div className="w-full h-2.5 bg-soft-gray rounded-full overflow-hidden">
          <div
            style={{ width: `${meal.proteinAchievement}%` }}
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              isLunch ? "bg-deep-olive" : "bg-olive-green/75"
            }`}
          />
        </div>
      </div>
    </article>
  );
}

export default MealCard;
