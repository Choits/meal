/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";
import HomeScreen from "./components/HomeScreen";
import WeeklyMenuScreen from "./components/WeeklyMenuScreen";
import NutritionCalculatorScreen from "./components/NutritionCalculatorScreen";
import ProfileScreen from "./components/ProfileScreen";

import {
  getTodayKST,
  getDefaultSelectedDate,
  getWeekDates,
  formatDateKey,
  generateMockMealsForWeek,
  generateMockMenuItems,
} from "./utils";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");

  // Calibrate Today in KST (Timezone: Asia/Seoul)
  const [todayKST] = useState<Date>(() => getTodayKST());
  const todayDateKey = formatDateKey(todayKST);

  // Default selected date: today if weekday, else next Monday
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getDefaultSelectedDate(todayKST)
  );

  // State to check if today is Saturday/Sunday (which prompts "Next Lunch" tags)
  const isKstWeekend = todayKST.getDay() === 0 || todayKST.getDay() === 6;

  // Retrieve weekdays list of Mon-Fri for the active week of chosen date
  const weekDates = getWeekDates(selectedDate);

  // Generate dynamic mock meals matching current selected week
  const [meals, setMeals] = useState(() => generateMockMealsForWeek(selectedDate));

  // Regenerate meals when selected date moves to another week
  useEffect(() => {
    setMeals(generateMockMealsForWeek(selectedDate));
  }, [selectedDate]);

  // Retrieve meals for today or the selected date specifically
  const targetDateKey = formatDateKey(selectedDate);
  const selectedDateMeals = meals.filter((meal) => meal.dateKey === targetDateKey);

  // Nutrition Calculator Mock menu lists
  const [initialMenuItems] = useState(() => generateMockMenuItems());

  // Global Toast Alert mechanisms
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  const handleNotificationClick = () => {
    setToastAlert("새로운 급식 소식이 없습니다. 급식실은 정상 안전 운영 중입니다!");
    setTimeout(() => setToastAlert(null), 3000);
  };

  // Render active tab panel
  const renderTabContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <HomeScreen
            selectedDate={selectedDate}
            todayMeals={selectedDateMeals}
            onTabChange={setCurrentTab}
            isKstWeekend={isKstWeekend}
          />
        );
      case "weekly":
        return (
          <WeeklyMenuScreen
            weekDates={weekDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            allMeals={meals}
            todayDateKey={todayDateKey}
          />
        );
      case "nutrition":
        return <NutritionCalculatorScreen initialMenuItems={initialMenuItems} />;
      case "profile":
        return <ProfileScreen />;
      default:
        return (
          <HomeScreen
            selectedDate={selectedDate}
            todayMeals={selectedDateMeals}
            onTabChange={setCurrentTab}
            isKstWeekend={isKstWeekend}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream-bg text-text-dark flex flex-col font-gmarket antialiased select-none pb-24 md:pb-6">
      {/* 1. Global Header (Identical Brand styling on Mobile, Tablet & Desktop) */}
      <AppHeader
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onNotificationClick={handleNotificationClick}
      />

      {/* 2. Main Content Canvas with sufficient bottom padding for bottom selector compatibility */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-20 px-2 sm:px-4 pb-20 md:pb-8">
        <div className="animate-fade-in">{renderTabContent()}</div>
      </main>

      {/* 3. Mobile Navigation fixed to bottom (Active on screens < 768px (md)) */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Global alert toast notification */}
      {toastAlert && (
        <div className="fixed bottom-24 right-6 bg-text-dark text-card-white text-xs font-bold px-5 py-3.5 rounded-xl shadow-xl z-50 animate-fade-in-up border border-card-white/10">
          {toastAlert}
        </div>
      )}

      {/* Standard Deployment Configuration TODO definitions */}
      {/* TODO: Add actual Gmarket Sans font files to /public/fonts before deployment. */}
      {/* TODO: Use dateKey to request meal data from the NEIS API. */}
      {/* TODO: Replace dynamic mock data with real NEIS meal data. */}
      {/* TODO: Handle weekends and school holidays from NEIS calendar data. */}
      {/* TODO: Prepare GitHub and Vercel deployment. */}
    </div>
  );
}
