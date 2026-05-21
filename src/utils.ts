/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MealData, MenuItem } from "./types";

/**
 * Gets the current date in KST (Korean Standard Time, Asia/Seoul) formatted as a proper Date.
 */
export function getTodayKST(): Date {
  const now = new Date();
  // Construct a KST aligned Date object
  const kstString = now.toLocaleString("en-US", { timeZone: "Asia/Seoul" });
  return new Date(kstString);
}

/**
 * Formats a Date object to "M월 D일 요일" (e.g., "10월 24일 목요일").
 */
export function formatKoreanDate(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];
  return `${m}월 ${d}일 ${dayName}요일`;
}

/**
 * Formats a Date object as "YYYYMMDD" string (dateKey).
 */
export function formatDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

/**
 * Returns a list of Date objects for Monday to Friday of the week containing the given date.
 */
export function getWeekDates(date: Date): Date[] {
  const currentDay = date.getDay(); // 0 (Sun) to 6 (Sat)
  // Distance to Monday (Mon = 1)
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(date);
  monday.setDate(date.getDate() + distanceToMonday);

  const dates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

/**
 * Computes the correct representation for "M월 N주차" (e.g., "10월 3주차") for the week of the given Date.
 */
export function getWeekOfMonth(date: Date): string {
  const month = date.getMonth() + 1;
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDay.getDay(); // 0 represents Sunday, 1 Monday...

  const day = date.getDate();
  // Standard arithmetic for week of the month
  const weekNumber = Math.ceil((day + firstDayOfWeek) / 7);
  return `${month}월 ${weekNumber}주차`;
}

/**
 * Returns either today if it's a weekday, or the next Monday if it is Saturday or Sunday.
 */
export function getDefaultSelectedDate(today: Date): Date {
  const day = today.getDay();
  if (day === 0) {
    // Sunday -> return Monday
    const nextMon = new Date(today);
    nextMon.setDate(today.getDate() + 1);
    return nextMon;
  } else if (day === 6) {
    // Saturday -> return Monday
    const nextMon = new Date(today);
    nextMon.setDate(today.getDate() + 2);
    return nextMon;
  }
  return today;
}

/**
 * Cleans the NEIS dish string by removing extraneous symbols, HTML, and allergen trailing codes.
 */
export function cleanDishName(dish: string): string {
  // TODO: Use dateKey to request meal data from the NEIS API.
  let cleaned = dish;

  // 1. Remove HTML br tags and carriage returns
  cleaned = cleaned.replace(/<br\s*\/?>/gi, " ");
  // 2. Remove standard bullet markers, asterisks, midpoints, or spaces
  cleaned = cleaned.replace(/[•\-\*·ㆍ]/g, "");

  // 3. Remove allergen lists in brackets e.g. (1.2.3.4.) or (13.) or (5.6.9.10)
  cleaned = cleaned.replace(/\([\d\s\.]+\)/g, "");

  // 4. Remove trailing or stranded number allergen codes e.g. "마파두부덮밥5.6.9.10" -> "마파두부덮밥"
  // This targets any sequence of digits interspersed with dots at word boundaries.
  cleaned = cleaned.replace(/\b\d+(?:\.\d+)*\.?\b/g, "");

  // Remove any remaining bracket fragments or dots
  cleaned = cleaned.replace(/[\*\.\(\)]/g, "");

  // 5. Clean up excessive inline spaces
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
}

/**
 * Sums up nutritional stats for a set of selected MenuItems.
 */
export function calculateNutrition(selectedItems: MenuItem[]) {
  return selectedItems.reduce(
    (acc, curr) => {
      acc.calories += curr.calories;
      acc.protein += curr.protein;
      acc.carbs += curr.carbs;
      acc.fat += curr.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

/**
 * Filter meals list by dateKey.
 */
export function getMealByDate(meals: MealData[], dateKey: string): MealData[] {
  return meals.filter((meal) => meal.dateKey === dateKey);
}

/**
 * Filter menu items selector based on category.
 */
export function getMealsByCategory(menu: MenuItem[], category: string): MenuItem[] {
  if (category === "전체") return menu;
  return menu.filter((item) => item.category === category);
}

/**
 * Generates dynamic dynamic mock school meals data centering around a selected active week.
 * This guarantees that Monday-Friday meals are always rendered for the user's current week!
 */
export function generateMockMealsForWeek(baseDate: Date): MealData[] {
  // TODO: Replace dynamic mock data with real NEIS meal data.
  // TODO: Handle weekends and school holidays from NEIS calendar data.
  const weekDates = getWeekDates(baseDate);
  const dayOfWeekStrings = ["월", "화", "수", "목", "금"];

  // Pre-configured menus for 월, 화, 수, 목, 금
  const menusByDay = [
    {
      lunch: {
        dishes: ["친환경기장밥*", "꽃게탕 (5.6.8.9.18.)", "안동찜닭 (5.6.8.13.15.)", "실곤약야채무침 (1.5.6.13.)", "배추김치 (9.13.)"],
        totalCalories: 810,
        protein: 34,
        carbs: 112,
        fat: 20,
        proteinAchievement: 80,
        allergens: ["대두", "밀", "게", "닭고기", "쇠고기"]
      },
      dinner: {
        dishes: ["참치야채비빔밥5.6.13.", "팽이버섯된장국5.6.", "만두탕수1.5.6.10.", "깍두기9.13.", "과일주스"],
        totalCalories: 710,
        protein: 24,
        carbs: 105,
        fat: 18,
        proteinAchievement: 55,
        allergens: ["난류", "대두", "밀", "돼지고기"]
      }
    },
    {
      lunch: {
        dishes: ["마파두부덮밥 (5.6.10.12.13.18.)", "맑은우동국국 (1.5.6.9.13.)", "백만송이버섯볶음", "탕수육1.5.6.10.", "깍두기9.13."],
        totalCalories: 830,
        protein: 30,
        carbs: 118,
        fat: 24,
        proteinAchievement: 75,
        allergens: ["난류", "대두", "밀", "돼지고기"]
      },
      dinner: {
        dishes: ["카레라이스2.5.6.10.13.16.", "가쓰오장국1.5.6.9.13.", "파닭치킨1.5.6.13.", "단무지무침", "배추김치9.13."],
        totalCalories: 745,
        protein: 28,
        carbs: 108,
        fat: 22,
        proteinAchievement: 65,
        allergens: ["난류", "우유", "대두", "밀", "닭고기"]
      }
    },
    {
      lunch: {
        dishes: ["친환경혼합잡곡밥5.", "쇠고기육개장 (5.6.13.16.)", "고등어무조림 (5.6.7.13.)", "학교앞떡볶이*1.5.6.13.", "김말이튀김1.5.6.", "깍두기9.13."],
        totalCalories: 860,
        protein: 35,
        carbs: 120,
        fat: 22,
        proteinAchievement: 90,
        allergens: ["대두", "밀", "쇠고기", "고등어"]
      },
      dinner: {
        dishes: ["김치우동정식1.5.6.9.13.", "미니주먹밥13.", "타코야끼1.5.6.13.17.", "배추김치9.13.", "액상요구르트2."],
        totalCalories: 730,
        protein: 22,
        carbs: 110,
        fat: 15,
        proteinAchievement: 50,
        allergens: ["난류", "우유", "대두", "밀", "오징어"]
      }
    },
    {
      // Thursday - MATCHES THURSDAY EXACTLY (cheese pork cutlet theme / lunch or dinner configuration)
      lunch: {
        dishes: ["친환경현미밥*", "쇠고기미역국5.6.16.", "매콤돈육강정5.6.10.13.", "숙주미나리무침", "배추김치9.13."],
        totalCalories: 845,
        protein: 32,
        carbs: 110,
        fat: 25,
        proteinAchievement: 85,
        allergens: ["대두", "밀", "쇠고기", "돼지고기"]
      },
      dinner: {
        dishes: ["참치마요덮밥1.5.13.", "유부장국5.6.9.13.", "매콤떡볶이1.5.6.13.", "깍두기9.13.", "요구르트2."],
        totalCalories: 720,
        protein: 26,
        carbs: 102,
        fat: 20,
        proteinAchievement: 60,
        allergens: ["난류", "우유", "대두", "밀"]
      }
    },
    {
      lunch: {
        dishes: ["스팸김치볶음밥 (1.2.5.6.10.13.)", "가쓰오장국5.6.9.13.", "고구마치즈돈까스1.2.5.6.10.", "양배추샐러드 (1.2.5.12.)", "배추김치9.13.", "바나나우유2."],
        totalCalories: 820,
        protein: 29,
        carbs: 115,
        fat: 23,
        proteinAchievement: 80,
        allergens: ["난류", "우유", "대두", "밀", "돼지고기"]
      },
      dinner: {
        dishes: ["돼지고기짜장밥 (2.5.6.10.)", "얼큰짬뽕국5.6.9.10.13.17.18.", "왕새우튀김 (1.5.6.9.)", "깍두기9.13.", "초코망고푸딩"],
        totalCalories: 750,
        protein: 27,
        carbs: 112,
        fat: 21,
        proteinAchievement: 70,
        allergens: ["난류", "대두", "밀", "새우", "돼지고기"]
      }
    }
  ];

  const meals: MealData[] = [];

  for (let i = 0; i < 5; i++) {
    const kstDate = weekDates[i];
    const dateStr = kstDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const dateKey = formatDateKey(kstDate);
    const dayName = dayOfWeekStrings[i];
    const data = menusByDay[i];

    // Lunch
    meals.push({
      id: `${dateKey}_lunch`,
      schoolName: "씨마스고등학교",
      date: dateStr,
      dateKey,
      dayOfWeek: dayName,
      mealType: "lunch",
      title: "중식",
      dishes: data.lunch.dishes,
      totalCalories: data.lunch.totalCalories,
      nutrition: {
        protein: data.lunch.protein,
        carbs: data.lunch.carbs,
        fat: data.lunch.fat
      },
      proteinAchievement: data.lunch.proteinAchievement,
      allergens: data.lunch.allergens
    });

    // Dinner
    meals.push({
      id: `${dateKey}_dinner`,
      schoolName: "씨마스고등학교",
      date: dateStr,
      dateKey,
      dayOfWeek: dayName,
      mealType: "dinner",
      title: "석식",
      dishes: data.dinner.dishes,
      totalCalories: data.dinner.totalCalories,
      nutrition: {
        protein: data.dinner.protein,
        carbs: data.dinner.carbs,
        fat: data.dinner.fat
      },
      proteinAchievement: data.dinner.proteinAchievement,
      allergens: data.dinner.allergens
    });
  }

  return meals;
}

/**
 * Returns the default selector items for Thursday (to match Cheese Pork Cutlet Selection screen nutrition calculations)
 * as mock list items.
 */
export function generateMockMenuItems(): MenuItem[] {
  return [
    {
      id: "menu_1",
      name: "현미밥",
      category: "밥류",
      description: "탄수화물 60g 국산 유기농 현미밥",
      calories: 300,
      protein: 6,
      carbs: 60,
      fat: 1,
      allergens: [],
      selected: true
    },
    {
      id: "menu_2",
      name: "돼지고기 김치찌개",
      category: "국/찌개",
      description: "돼지고기 함유 칼칼한 찌개",
      calories: 250,
      protein: 15,
      carbs: 12,
      fat: 14,
      allergens: ["돼지고기"]
    },
    {
      id: "menu_3",
      name: "시금치 나물",
      category: "반찬",
      description: "식이섬유 3g 고소한 시금치 나물무침",
      calories: 45,
      protein: 2,
      carbs: 5,
      fat: 1,
      allergens: []
    },
    {
      id: "menu_4",
      name: "고등어 구이",
      category: "반찬",
      description: "바삭하고 담백하게 구운 고등어",
      calories: 250,
      protein: 20,
      carbs: 1,
      fat: 16,
      allergens: ["고등어"]
    },
    {
      id: "menu_5",
      name: "딸기 요거트",
      category: "디저트",
      description: "상큼한 유산균 가득 딸기 요거트 디저트",
      calories: 85,
      protein: 3,
      carbs: 13,
      fat: 2,
      allergens: ["우유"]
    }
  ];
}
