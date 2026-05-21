/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ChevronRight } from "lucide-react";

interface SettingRowProps {
  label: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  isDestructive?: boolean;
}

export function SettingRow({ label, onClick, rightElement, isDestructive = false }: SettingRowProps) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`flex items-center justify-between p-4 w-full text-left transition-all active:bg-soft-gray/50 hover:bg-soft-gray/20 focus:outline-none ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <span className={`font-medium ${isDestructive ? "text-red-600 font-bold" : "text-text-dark"}`}>
        {label}
      </span>
      {rightElement ? (
        rightElement
      ) : (
        <ChevronRight className={`w-5 h-5 ${isDestructive ? "text-red-600" : "text-olive-green"}`} />
      )}
    </button>
  );
}

export default SettingRow;
