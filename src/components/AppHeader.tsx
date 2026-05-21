/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Utensils, Bell } from "lucide-react";

interface AppHeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onNotificationClick: () => void;
}

export function AppHeader({ currentTab, onTabChange, onNotificationClick }: AppHeaderProps) {
  const tabs = [
    { id: "home", label: "홈" },
    { id: "weekly", label: "식단표" },
    { id: "nutrition", label: "영양계산" },
    { id: "profile", label: "프로필" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-card-white shadow-sm border-b border-soft-gray/40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Left Side: School Branding (Identical on both Mobile & Desktop) */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-sage-green/45 flex items-center justify-center text-deep-olive">
            <Utensils className="w-5 h-5" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-deep-olive tracking-tight select-none">
            씨마스고등학교 급식
          </h1>
        </div>

        {/* Center/Right Side: Desktop Navigation Links (Responsive) */}
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = tab.id === currentTab;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all focus:outline-none ${
                  isActive
                    ? "bg-deep-olive text-card-white shadow-sm scale-102"
                    : "text-text-dark/70 hover:bg-soft-gray/50 hover:text-text-dark"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNotificationClick}
            aria-label="알림 열기"
            className="w-10 h-10 rounded-full bg-soft-gray/40 hover:bg-soft-gray/70 flex items-center justify-center text-text-dark/80 relative transition-colors focus:outline-none"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-deep-olive rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
