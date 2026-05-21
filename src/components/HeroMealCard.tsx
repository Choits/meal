/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
import { formatKoreanDate } from "../utils";

interface HeroMealCardProps {
  selectedDate: Date;
  isKstWeekend: boolean;
}

export function HeroMealCard({ selectedDate, isKstWeekend }: HeroMealCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    try {
      return localStorage.getItem("loved_cheese_tonkatsu") === "true";
    } catch {
      return false;
    }
  });

  const toggleLike = () => {
    setIsLiked((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("loved_cheese_tonkatsu", String(next));
      } catch {}
      return next;
    });
  };

  const imageURL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYJBDYKxnlH56prpKq7kkMsmq6Rsj30OvmoWmEXnYOPTBlRMkAAZgg_77lYZ4VHdx6v4JAjGyHolsLbH4O9MQsUC7za9OfanCm4d8m0PW_4RCs6mJmrSOPNo1_m1nMxd_Fp3juvS84yZm9TURWlVDiaTdYwgtuajLbVE_NzC3hQBAg3AaKzO9XSZWRhMrq58PmGPZsQPax-yE8MryOimAXyuZPiz14qKk5TtiQmSvYWV29r7qQDTk2hNKbI5HWt6yJribRW9higrxf";

  return (
    <section className="bg-card-white rounded-3xl shadow-[0_4px_20px_rgba(79,111,0,0.05)] overflow-hidden flex flex-col md:flex-row md:items-stretch group border border-soft-gray/30">
      {/* Image Area - Minimum height 150px on mobile */}
      <div className="h-48 sm:h-56 md:h-auto md:w-1/2 bg-soft-gray relative overflow-hidden flex-shrink-0">
        <img
          src={imageURL}
          alt="바삭하고 푸짐한 황금빛 치즈돈까스 정식"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // Gradient fallback if image fails to load
            (e.target as HTMLElement).style.display = "none";
          }}
        />

        {/* CSS gradient fallback underneath */}
        <div className="absolute inset-0 bg-gradient-to-tr from-deep-olive/20 to-sage-green/40 -z-10" />

        <div className="absolute top-4 left-4 bg-deep-olive text-sage-green px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 shadow-sm backdrop-blur-md bg-opacity-95">
          <Star className="w-3.5 h-3.5 fill-current" />
          오늘의 추천 급식
        </div>

        <button
          onClick={toggleLike}
          aria-label="찜하기"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card-white/90 hover:bg-card-white backdrop-blur-md flex items-center justify-center text-red-500 hover:scale-110 active:scale-95 transition-all shadow-sm focus:outline-none"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-text-dark/40"
            }`}
          />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="font-semibold text-text-dark/60 text-sm">
              {formatKoreanDate(selectedDate)}
              {isKstWeekend && (
                <span className="ml-2 bg-olive-green/10 text-olive-green text-xs px-2 py-0.5 rounded-md font-bold">
                  다음 급식일
                </span>
              )}
            </span>
            <span className="text-xs font-bold text-deep-olive bg-sage-green/40 px-3 py-1.5 rounded-lg">
              845 kcal
            </span>
          </div>
          <h2 className="text-2xl font-bold text-text-dark tracking-tight">
            치즈돈까스 정식
          </h2>
          <p className="text-sm text-text-dark/70 leading-relaxed max-w-md">
            바삭하고 노릇노릇한 식판 느낌 트레이에 돈까스, 밥, 샐러드, 특제 소스, 상큼한 레몬 조각이 곁들여진 수제 돈까스. 고소한 모짜렐라 치즈가 가득 들어있어 한 입 베어 물면 치즈가 듬뿍 늘어납니다.
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs px-2.5 py-1 bg-soft-gray rounded-md font-medium text-text-dark/60">
            인기식단
          </span>
          <span className="text-xs px-2.5 py-1 bg-soft-gray rounded-md font-medium text-text-dark/60">
            수제치즈
          </span>
          <span className="text-xs px-2.5 py-1 bg-soft-gray rounded-md font-medium text-text-dark/60">
            국산인증
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroMealCard;
