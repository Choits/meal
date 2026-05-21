/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { MenuItem } from "../types";

export interface SelectableMenuItemProps {
  item: MenuItem;
  onToggle: (id: string) => void;
}

export const SelectableMenuItem: React.FC<SelectableMenuItemProps> = ({ item, onToggle }) => {
  const isSelected = item.selected;

  return (
    <div
      onClick={() => onToggle(item.id)}
      className={`bg-card-white rounded-2xl p-5 cursor-pointer select-none transition-all duration-150 relative overflow-hidden border-2 flex flex-col justify-between ${
        isSelected
          ? "border-deep-olive shadow-[0_4px_15px_rgba(79,111,0,0.06)] scale-[0.99]"
          : "border-transparent hover:border-olive-green/45 hover:shadow-sm"
      }`}
    >
      {/* Selection check icon */}
      <div
        className={`absolute top-4 right-4 text-deep-olive transition-opacity duration-200 ${
          isSelected ? "opacity-100" : "opacity-0"
        }`}
      >
        <CheckCircle className="w-6 h-6 fill-sage-green" />
      </div>

      <div className="flex flex-col gap-1.5 pr-8">
        <h4 className="font-bold text-lg text-text-dark">{item.name}</h4>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-deep-olive">{item.calories} kcal</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {/* Render allergen alert if any */}
        {item.allergens && item.allergens.length > 0 ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-warm-peach text-xs font-bold text-text-dark/80 border border-deep-olive/5">
            <AlertCircle className="w-3.5 h-3.5 text-deep-olive" />
            {item.allergens.join(", ")} 함유
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-lg bg-soft-gray font-bold text-xs text-text-dark/60">
            {item.description.split(" ")[0] || item.category}
          </span>
        )}
      </div>
    </div>
  );
}

export default SelectableMenuItem;
