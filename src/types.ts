/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MealData {
  id: string;
  schoolName: "씨마스고등학교";
  date: string; // e.g., "2026-05-21"
  dateKey: string; // e.g., "20260521"
  dayOfWeek: string; // "월", "화", "수", "목", "금"
  mealType: "lunch" | "dinner";
  title: string; // "중식" | "석식"
  dishes: string[];
  totalCalories: number;
  nutrition: {
    protein: number; // g
    carbs: number; // g
    fat: number; // g
  };
  proteinAchievement: number; // e.g., 85 (%)
  allergens: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: "밥류" | "국/찌개" | "반찬" | "디저트";
  description: string;
  calories: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  allergens: string[];
  selected?: boolean;
}
