/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Calendar, Calculator, User } from "lucide-react";

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: "home", label: "홈", icon: Home },
    { id: "weekly", label: "식단표", icon: Calendar },
    { id: "nutrition", label: "영양계산", icon: Calculator },
    { id: "profile", label: "프로필", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-card-white/90 backdrop-blur-md border-t border-soft-gray/50 py-2 pb-safe px-4 flex justify-around items-center md:hidden shadow-[0_-4px_20px_rgba(79,111,0,0.04)]">
      {navItems.map((item) => {
        const isActive = item.id === currentTab;
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-4.5 rounded-full transition-all focus:outline-none ${
              isActive
                ? "bg-sage-green text-deep-olive font-bold scale-102"
                : "text-text-dark/60 hover:text-text-dark active:scale-90"
            }`}
          >
            <IconComponent className="w-5.5 h-5.5" />
            <span className="text-[10px] font-bold mt-1 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
