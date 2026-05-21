/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info, Award, ArrowRight } from "lucide-react";
import { MealData } from "../types";
import { formatKoreanDate } from "../utils";
import HeroMealCard from "./HeroMealCard";
import MealCard from "./MealCard";

interface HomeScreenProps {
  selectedDate: Date;
  todayMeals: MealData[];
  onTabChange: (tab: string) => void;
  isKstWeekend: boolean;
}

export function HomeScreen({ selectedDate, todayMeals, onTabChange, isKstWeekend }: HomeScreenProps) {
  const lunchMeal = todayMeals.find((m) => m.mealType === "lunch");
  const dinnerMeal = todayMeals.find((m) => m.mealType === "dinner");

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-4 md:px-6 py-6 font-gmarket">
      {/* Header Label */}
      <div className="flex justify-between items-center mt-2 animate-fade-in">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-olive-green tracking-wide uppercase">
            씨마스 급식 메인
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-dark mt-1">
            {formatKoreanDate(selectedDate)}
          </h2>
        </div>
        {isKstWeekend && (
          <div className="bg-deep-olive text-sage-green px-3 py-1.5 rounded-full text-xs font-bold shadow-sm animate-pulse">
            주말 다음 급식 예정일
          </div>
        )}
      </div>

      {/* Hero Meal Card (Top banner image with cheese tonkatsu) */}
      <HeroMealCard selectedDate={selectedDate} isKstWeekend={isKstWeekend} />

      {/* Content layout (Mobile: single column, Tablet: 2 columns, Desktop: customized dashboard grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lunch module column */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold text-text-dark flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-deep-olive rounded-full" />
              오늘의 중식 식단
            </h3>
          </div>
          {lunchMeal ? (
            <MealCard meal={lunchMeal} />
          ) : (
            <div className="bg-card-white rounded-3xl p-8 text-center border border-soft-gray/30 text-text-dark/50 flex flex-col items-center justify-center min-h-[224px]">
              <Info className="w-8 h-8 text-text-dark/30 mb-2" />
              <p className="font-medium text-sm">해당 날짜의 급식 정보가 아직 없습니다.</p>
            </div>
          )}
        </div>

        {/* Dinner module column */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold text-text-dark flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-olive-green rounded-full" />
              오늘의 석식 식단
            </h3>
          </div>
          {dinnerMeal ? (
            <MealCard meal={dinnerMeal} />
          ) : (
            <div className="bg-card-white rounded-3xl p-8 text-center border border-soft-gray/30 text-text-dark/50 flex flex-col items-center justify-center min-h-[224px]">
              <Info className="w-8 h-8 text-text-dark/30 mb-2" />
              <p className="font-medium text-sm">해당 날짜의 급식 정보가 아직 없습니다.</p>
            </div>
          )}
        </div>

        {/* Nutritional Highlight and quick link module (Desktop 3rd column, Tablet wraps to 2 columns) */}
        <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-6">
          {/* Quick Calculator Card info panel */}
          <div className="bg-gradient-to-br from-deep-olive to-olive-green text-card-white rounded-3xl p-6 shadow-md flex flex-col justify-between min-h-[200px] border border-deep-olive/15 group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 bg-sage-green/20 self-start px-2.5 py-1 rounded-lg text-sage-green text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                성장기 맞춤 영양
              </div>
              <h4 className="text-xl font-bold mt-1">스마트 영양 계산기</h4>
              <p className="text-xs text-sage-green/90 leading-relaxed font-medium">
                내가 먹고 싶은 메뉴만 콕 찝어 칼로리 및 단탄지 영양 밸런스를 즉시 계산하고 건강을 지키세요!
              </p>
            </div>
            <button
              onClick={() => onTabChange("nutrition")}
              className="mt-6 font-bold bg-sage-green hover:bg-card-white hover:text-deep-olive text-deep-olive py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition-all self-stretch shadow-sm active:scale-98"
            >
              식단 영양 계산해보기 <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick School notice allergen info panel */}
          <div className="bg-card-white border border-soft-gray/30 rounded-3xl p-5 flex flex-col gap-3.5">
            <h4 className="text-sm font-bold text-text-dark/70 flex items-center gap-1.5 leading-none">
              <span className="w-2 h-2 rounded-full bg-deep-olive" />
              알레르기 안전 도움말
            </h4>
            <div className="text-xs text-text-dark/80 leading-relaxed font-semibold flex flex-col gap-2.5 bg-cream-bg/40 p-4 rounded-2xl">
              <p>
                씨마스고등학교 급식실은 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토 등 19가지 기본 알레르기 유발 물질을 안전하게 관리하고 있습니다.
              </p>
              <p className="font-bold text-deep-olive">
                ※ 알레르기 증상이 있는 학생들은 식사 전 식단표 칩을 반드시 확인해 주세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
