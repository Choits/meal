/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Check, ClipboardList, RefreshCw, Save } from "lucide-react";
import { MenuItem } from "../types";
import { calculateNutrition, getMealsByCategory } from "../utils";
import SelectableMenuItem from "./SelectableMenuItem";

interface NutritionCalculatorScreenProps {
  initialMenuItems: MenuItem[];
}

export function NutritionCalculatorScreen({ initialMenuItems }: NutritionCalculatorScreenProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Toggle item selected state
  const handleToggleItem = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  // Reset entire selection
  const handleReset = () => {
    setMenuItems((prev) => prev.map((item) => ({ ...item, selected: false })));
  };

  // Sum nutrition stats
  const selectedItems = menuItems.filter((item) => item.selected);
  const totals = calculateNutrition(selectedItems);

  // Filter lists based on chosen category
  const filteredItems = getMealsByCategory(menuItems, selectedCategory);

  // Mock saving calculation
  const handleSaveResult = () => {
    if (selectedItems.length === 0) {
      setSaveToast("선택된 메뉴가 없습니다! 메뉴를 탭 하여 추가해 주세요.");
      setTimeout(() => setSaveToast(null), 3000);
      return;
    }

    const itemsText = selectedItems.map((item) => item.name).join(", ");
    setSaveToast(`총 845 kcal 및 영양성분(${itemsText}) 계산 결과가 학생 수첩에 저장되었습니다!`);
    setTimeout(() => setSaveToast(null), 4000);
  };

  const categories = ["전체", "밥류", "국/찌개", "반찬", "디저트"];

  // Dynamically calculate percentages for the progress bars relative to reference daily balances
  // Reference goals: 2000 kcal, Protein 60g, Carbs 320g, Fat 65g
  const calPercent = Math.min((totals.calories / 1300) * 100, 100);
  const protPercent = Math.min((totals.protein / 55) * 100, 100);
  const carbPercent = Math.min((totals.carbs / 180) * 100, 100);
  const fatPercent = Math.min((totals.fat / 45) * 100, 100);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-4 md:px-6 py-6 font-gmarket">
      {/* Title */}
      <div className="flex justify-between items-center mt-2 flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-olive-green tracking-wide">
            스마트 저울
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-dark">
            영양계산
          </h2>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-olive-green/20 text-xs font-bold text-olive-green hover:bg-sage-green/20 transition-all cursor-pointer focus:outline-none"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          선택 초기화
        </button>
      </div>

      {/* Responsive layout: Stacked on mobile, side-by-side columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Summary Card (Sticky configuration for comfortable vertical readouts on desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <section className="bg-card-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(79,111,0,0.05)] border border-soft-gray/30 flex flex-col gap-5">
            <div>
              <h3 className="text-xl font-bold text-text-dark">오늘의 선택 영양</h3>
              <p className="text-xs text-text-dark/60 mt-1 font-semibold">
                선택한 메뉴의 총 영양성분입니다.
              </p>
            </div>

            {/* Huge numeric readout */}
            <div className="flex items-baseline gap-1 mt-1 bg-cream-bg/40 p-4.5 rounded-2xl border border-soft-gray/30 justify-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-deep-olive tracking-tight transition-all duration-300">
                {totals.calories}
              </span>
              <span className="text-base font-bold text-text-dark/60">kcal</span>
            </div>

            {/* Protein, Carbs, Fat details stack wrapper */}
            <div className="flex flex-col gap-4 mt-2">
              {/* Protein indicator */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-bold text-sm">
                  <span className="text-text-dark/80">단백질</span>
                  <span className="text-deep-olive">{totals.protein}g</span>
                </div>
                <div className="w-full bg-soft-gray h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${protPercent}%` }}
                    className="bg-deep-olive h-full rounded-full transition-all duration-300 ease-out"
                  />
                </div>
              </div>

              {/* Carbs indicator */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-bold text-sm">
                  <span className="text-text-dark/80">탄수화물</span>
                  <span className="text-olive-green">{totals.carbs}g</span>
                </div>
                <div className="w-full bg-soft-gray h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${carbPercent}%` }}
                    className="bg-olive-green h-full rounded-full transition-all duration-300 ease-out"
                  />
                </div>
              </div>

              {/* Fat indicator */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-bold text-sm">
                  <span className="text-text-dark/80">지방</span>
                  <span className="text-text-dark/60">{totals.fat}g</span>
                </div>
                <div className="w-full bg-soft-gray h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${fatPercent}%` }}
                    className="bg-text-dark/40 h-full rounded-full transition-all duration-300 ease-out"
                  />
                </div>
              </div>
            </div>

            {/* Bottom calculation status line */}
            <div className="mt-2 text-xs text-text-dark/50 flex items-center gap-1 bg-soft-gray/35 p-3.5 rounded-xl font-semibold justify-center">
              <ClipboardList className="w-4 h-4 text-text-dark/40" />
              선택된 메뉴 개수: <span className="text-deep-olive font-bold text-sm pl-0.5">{selectedItems.length}</span>개
            </div>

            {/* Desktop-only Save Button inside summary block */}
            <button
              onClick={handleSaveResult}
              className="hidden lg:flex w-full bg-deep-olive hover:bg-olive-green text-card-white font-bold text-base py-4 rounded-xl shadow-md active:scale-98 transition-all items-center justify-center gap-2 cursor-pointer focus:outline-none"
            >
              <Save className="w-5 h-5" />
              Save Result 계산 결과 저장하기
            </button>
          </section>
        </div>

        {/* Right Side: Filters + Selectable Menus checklist */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Horizontal category filters */}
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
            {categories.map((cat) => {
              const isActive = cat === selectedCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer focus:outline-none border ${
                    isActive
                      ? "bg-deep-olive text-card-white border-deep-olive shadow-sm"
                      : "bg-card-white text-text-dark border-soft-gray hover:border-olive-green"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Menus Grid container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <SelectableMenuItem
                key={item.id}
                item={item}
                onToggle={handleToggleItem}
              />
            ))}
          </div>

          {/* Fallback description on empty listings */}
          {filteredItems.length === 0 && (
            <div className="bg-card-white rounded-3xl p-12 text-center border border-soft-gray/30 text-text-dark/40 flex flex-col items-center justify-center">
              <p className="font-bold">선택하신 카테고리의 정보가 없습니다.</p>
            </div>
          )}

          {/* Mobile bottom padding blocker */}
          <div className="h-20 lg:hidden" />
        </div>
      </div>

      {/* Floating Save Button on Mobile/Tablet */}
      <div className="fixed bottom-20 left-0 w-full px-6 z-40 lg:hidden">
        <button
          onClick={handleSaveResult}
          className="w-full bg-deep-olive hover:bg-olive-green text-white font-bold text-base py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
        >
          <Save className="w-5 h-5" />
          Save Result 계산 결과 저장하기
        </button>
      </div>

      {/* Styled feedback toast alerts */}
      {saveToast && (
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 bg-text-dark text-card-white text-sm font-semibold px-6 py-4.5 rounded-2xl shadow-xl z-50 text-center flex items-center gap-2 max-w-sm border border-card-white/10 animate-fade-in-up">
          <Check className="w-5 h-5 text-sage-green flex-shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}
    </div>
  );
}

export default NutritionCalculatorScreen;
