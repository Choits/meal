/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Edit2, ShieldAlert, Plus, Check, Info, LogOut } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import SettingRow from "./SettingRow";

export function ProfileScreen() {
  const [profileName, setProfileName] = useState<string>("김학생");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("김학생");

  // Notifications toggle controls
  const [allergyNotice, setAllergyNotice] = useState<boolean>(true);
  const [dailyNotice, setDailyNotice] = useState<boolean>(true);

  // Allergens settings list
  const [allergens, setAllergens] = useState<string[]>(["우유", "땅콩"]);
  const [newAllergen, setNewAllergen] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddAllergen = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newAllergen.trim();
    if (!cleaned) return;
    if (allergens.includes(cleaned)) {
      triggerToast(`'${cleaned}' 물질은 이미 등록되어 있습니다.`);
      return;
    }
    setAllergens((prev) => [...prev, cleaned]);
    setNewAllergen("");
    setShowAddModal(false);
    triggerToast(`알레르기 필터에 '${cleaned}'(이)가 추가되었습니다.`);
  };

  const handleRemoveAllergen = (item: string) => {
    setAllergens((prev) => prev.filter((allergy) => allergy !== item));
    triggerToast(`알레르기 필터에서 '${item}'(이)가 제거되었습니다.`);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    setProfileName(tempName);
    setIsEditingName(false);
    triggerToast(`프로필 이름이 '${tempName}'(으)로 수정되었습니다.`);
  };

  const handleAction = (label: string) => {
    triggerToast(`'${label}' 메뉴는 교원 연수 데모 환경에서 시뮬레이션 중입니다.`);
  };

  const avatarURL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAe9ZbEaP_KV0_2tTItQlA5ys2fDCo2S9hoxGnXbXc938pBY762TdLSAPpg5gLaFbottTZtl-00RQk-_2SN2y8p2WZTKpZj9733IT7iDPFtS_wIiAtF0kPfbB5hMW4egEMlvSzhBwfJ3ZL5tva2zMZ-o9YRSsQhHPPH6PzJGNUii3-0JmdVq62C178r1OMFHPhkh7peN9lODdHBLGFYisb_wCZjzms7GeBf_9eB8owAHL2dSW8chm1CUqcWA__tnrYyX1NpPkcwrTpg";

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-4 md:px-6 py-6 font-gmarket">
      {/* Page Title */}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-bold text-olive-green tracking-wide">
          학생 카드
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-text-dark">
          프로필
        </h2>
      </div>

      {/* Grid: 1 column on mobile, 2 columns on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Profile Card column */}
        <div className="flex flex-col gap-6">
          <section className="bg-gradient-to-br from-card-white to-sage-green/45 p-6 sm:p-7 rounded-[24px] ambient-shadow flex items-center justify-between border border-sage-green/10">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full bg-soft-gray overflow-hidden border-2 border-card-white shadow-sm bg-cover bg-center"
                style={{ backgroundImage: `url(${avatarURL})` }}
              />
              <div className="flex flex-col gap-0.5">
                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-1">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="border border-olive-green rounded px-2 py-0.5 text-sm font-bold w-24 focus:outline-none"
                      maxLength={10}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-deep-olive text-card-white px-2 py-0.5 rounded text-xs font-bold"
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTempName(profileName);
                        setIsEditingName(false);
                      }}
                      className="text-text-dark/50 text-xs px-1"
                    >
                      취소
                    </button>
                  </form>
                ) : (
                  <h3 className="text-xl sm:text-2xl font-bold text-text-dark">
                    {profileName}
                  </h3>
                )}
                <p className="text-xs text-text-dark/60 font-semibold">
                  씨마스고등학교 2학년 3반 15번
                </p>
              </div>
            </div>

            {!isEditingName && (
              <button
                onClick={() => setIsEditingName(true)}
                aria-label="이름 수정"
                className="w-10 h-10 rounded-full bg-card-white flex items-center justify-center ambient-shadow-sm text-deep-olive hover:bg-sage-green/20 hover:scale-105 active:scale-95 transition-all focus:outline-none"
              >
                <Edit2 className="w-4 h-4 cursor-pointer" />
              </button>
            )}
          </section>

          {/* Core Info helper guidelines */}
          <div className="bg-card-white border border-soft-gray/30 p-5 rounded-[24px]">
            <h4 className="font-bold text-sm text-text-dark flex items-center gap-2 mb-2 leading-none">
              <ShieldAlert className="w-4.5 h-4.5 text-deep-olive" />
              알레르기 안심 가이드
            </h4>
            <p className="text-xs text-text-dark/70 leading-relaxed font-semibold">
              씨마스고등학교 급식 앱에 등록된 개인 맞춤형 알레르기 성분이 포함된 식단이 표시되면, 메뉴 밑에 특별 경고 칩이 활성화됩니다.
            </p>
          </div>
        </div>

        {/* Configurations column */}
        <div className="flex flex-col gap-6">
          {/* Settings cards details */}
          <section className="space-y-4">
            {/* Preferred Alarms settings block */}
            <div className="bg-card-white rounded-[24px] p-6 sm:p-7 ambient-shadow border border-soft-gray/30 flex flex-col gap-6">
              {/* Allergy Warning Switch row */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold text-text-dark">
                    알레르기 경고 알림
                  </span>
                  <ToggleSwitch
                    id="allergy_notice_toggle"
                    checked={allergyNotice}
                    onChange={setAllergyNotice}
                  />
                </div>
                <p className="text-xs sm:text-sm text-text-dark/60 font-semibold leading-relaxed">
                  식단에 등록된 알레르기 유발 물질 포함 시 알림
                </p>

                {/* Interactive registered Allergens tags picker */}
                <div className="flex flex-wrap gap-2 mt-3 items-center">
                  {allergens.map((allergy) => (
                    <span
                      key={allergy}
                      onClick={() => handleRemoveAllergen(allergy)}
                      className="px-3 py-1.5 rounded-full bg-sage-green/45 text-deep-olive font-bold text-xs select-none cursor-pointer hover:bg-red-100 hover:text-red-700 hover:line-through transition-colors flex items-center gap-1"
                      title="클릭하여 삭제"
                    >
                      {allergy}
                      <span className="text-[10px] pl-0.5 opacity-60">×</span>
                    </span>
                  ))}
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-3 py-1.5 rounded-full bg-soft-gray border border-olive-green/20 border-dashed text-text-dark/60 font-bold text-xs flex items-center gap-1 hover:bg-sage-green/20 transition-colors focus:outline-none"
                  >
                    <Plus className="w-3 h-3" /> 추가
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-soft-gray" />

              {/* Breakfast summary notifier toggle */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold text-text-dark">
                    일일 식단 알림
                  </span>
                  <ToggleSwitch
                    id="daily_notice_toggle"
                    checked={dailyNotice}
                    onChange={setDailyNotice}
                  />
                </div>
                <p className="text-xs sm:text-sm text-text-dark/60 font-semibold leading-relaxed">
                  매일 아침 8시에 오늘의 메뉴 알림
                </p>
              </div>
            </div>

            {/* Other support rows */}
            <div className="bg-card-white rounded-[24px] border border-soft-gray/30 ambient-shadow overflow-hidden flex flex-col">
              <SettingRow
                label="고객센터 / 문의하기"
                onClick={() => handleAction("고객센터 / 문의하기")}
              />
              <div className="h-px w-[calc(100%-32px)] mx-auto bg-soft-gray/50" />
              <SettingRow
                label="이용약관"
                onClick={() => handleAction("이용약관")}
              />
              <div className="h-px w-[calc(100%-32px)] mx-auto bg-soft-gray/50" />
              <SettingRow
                label="로그아웃"
                onClick={() => handleAction("로그아웃")}
                isDestructive={true}
                rightElement={<LogOut className="w-5 h-5 text-red-600" />}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Adding Allergy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-dark/40 backdrop-blur-xs">
          <form
            onSubmit={handleAddAllergen}
            className="bg-card-white rounded-3xl p-6 w-full max-w-sm border border-soft-gray flex flex-col gap-4 shadow-2xl animate-fade-in"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-bold text-text-dark">알레르기 필터 등록</h4>
              <p className="text-xs text-text-dark/60 font-semibold">
                필터링할 알레르기를 등록하세요 (예: 계란, 조개류, 메밀 등).
              </p>
            </div>
            <input
              type="text"
              required
              placeholder="예: 계란, 밀가루, 복숭아"
              value={newAllergen}
              onChange={(e) => setNewAllergen(e.target.value)}
              className="border border-soft-gray focus:border-deep-olive rounded-xl p-3 text-sm focus:outline-none placeholder:text-text-dark/40 font-semibold"
              maxLength={15}
              autoFocus
            />
            <div className="flex gap-2.5 mt-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl border border-soft-gray text-xs font-bold text-text-dark/60 hover:bg-soft-gray/30"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-deep-olive hover:bg-olive-green text-card-white text-xs font-bold"
              >
                필터에 추가
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Styled feedback toast alerts */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-text-dark text-card-white text-sm font-semibold px-6 py-4.5 rounded-2xl shadow-xl z-50 text-center flex items-center gap-2 max-w-sm border border-card-white/10 animate-fade-in-up">
          <Check className="w-5 h-5 text-sage-green flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile screen signature footer */}
      <footer className="pt-8 pb-4 text-center space-y-1">
        <p className="text-xs font-bold text-text-dark/50">© 2024 씨마스고등학교 급식</p>
        <p className="text-xs text-text-dark/40 font-medium">
          건강하고 맛있는 학교 식단을 지원합니다.
        </p>
      </footer>
    </div>
  );
}

export default ProfileScreen;
