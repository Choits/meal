/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle } from "lucide-react";

interface AllergyChipsProps {
  allergens: string[];
}

export function AllergyChips({ allergens }: AllergyChipsProps) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {allergens.map((allergen, idx) => (
        <span
          key={`${allergen}-${idx}`}
          className="bg-warm-peach text-text-dark font-medium text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-deep-olive/10"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-olive-green" />
          {allergen}
        </span>
      ))}
    </div>
  );
}

export default AllergyChips;
