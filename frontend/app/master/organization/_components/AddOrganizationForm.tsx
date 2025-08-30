"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Plus, Maximize2, Minimize2, X } from 'lucide-react';

interface AddOrganizationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Record<string, any>;
  onFormDataChange: (field: string, value: any) => void;
  onAdd: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isEdit?: boolean;
}

export default function AddOrganizationForm({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  disabled = false,
  isEdit = false
}: AddOrganizationFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 유틸: 공통 인풋 클래스
  const fieldCls =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 text-base";
  const roFieldCls =
    "w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed text-base";
  const labelCls = "block text-sm font-semibold text-gray-800 mb-2";

  const handleAdd = () => {
    onAdd();
    if (!isLoading && !disabled) {
      onOpenChange(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className={`bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh]' 
            : 'max-w-4xl max-h-[85vh] w-[90vw] h-[85vh]'
        } flex flex-col`}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">
            {isEdit ? '조직 Master 수정' : '조직 Master 수정등록'}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpand}
              className="h-8 w-8 p-0 text-white hover:bg-blue-700"
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* =============== 직책 정보 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                직책 정보
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    직책코드 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.jobCode ?? ""}
                    onChange={(e) => onFormDataChange("jobCode", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">선택하세요</option>
                    <option value="CE">CE - 대표이사</option>
                    <option value="BD">BD - 이사회 의장</option>
                    <option value="CO">CO - 준법감시인</option>
                    <option value="AU">AU - 감사실장</option>
                    <option value="MK">MK - 마케팅총괄부사장</option>
                    <option value="FI">FI - 재무총괄부사장</option>
                    <option value="IT">IT - IT총괄부사장</option>
                    <option value="HR">HR - 인사총괄부사장</option>
                    <option value="SA">SA - 영업총괄부사장</option>
                    <option value="RS">RS - 리스크총괄부사장</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    직책 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.jobTitle ?? ""}
                    onChange={(e) => onFormDataChange("jobTitle", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">선택하세요</option>
                    <option value="대표이사">대표이사</option>
                    <option value="이사회 의장">이사회 의장</option>
                    <option value="준법감시인">준법감시인</option>
                    <option value="감사실장">감사실장</option>
                    <option value="마케팅총괄부사장">마케팅총괄부사장</option>
                    <option value="재무총괄부사장">재무총괄부사장</option>
                    <option value="IT총괄부사장">IT총괄부사장</option>
                    <option value="인사총괄부사장">인사총괄부사장</option>
                    <option value="영업총괄부사장">영업총괄부사장</option>
                    <option value="리스크총괄부사장">리스크총괄부사장</option>
                  </select>
                </div>
              </div>
            </section>

            {/* =============== 조직 정보 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                조직 정보
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    조직구분 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.orgDivision ?? ""}
                    onChange={(e) => onFormDataChange("orgDivision", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">선택하세요</option>
                    <option value="대표이사">대표이사</option>
                    <option value="이사회 의장">이사회 의장</option>
                    <option value="경영지원">경영지원</option>
                    <option value="감사실">감사실</option>
                    <option value="금융영업">금융영업</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    관리대상조직 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.managedOrg ?? ""}
                    onChange={(e) => onFormDataChange("managedOrg", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">선택하세요</option>
                    <option value="대표이사">대표이사</option>
                    <option value="이사회 의장">이사회 의장</option>
                    <option value="준법감시인">준법감시인</option>
                    <option value="감사실">감사실</option>
                    <option value="마케팅총괄부문">마케팅총괄부문</option>
                    <option value="재무총괄부문">재무총괄부문</option>
                    <option value="IT총괄부문">IT총괄부문</option>
                    <option value="인사총괄부문">인사총괄부문</option>
                    <option value="영업총괄부문">영업총괄부문</option>
                    <option value="리스크총괄부문">리스크총괄부문</option>
                  </select>
                </div>
              </div>
            </section>

            {/* =============== 소관 정보 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                소관 정보
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>소관부서</label>
                  <select
                    value={formData.responsibleDept ?? ""}
                    onChange={(e) => onFormDataChange("responsibleDept", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">선택하세요</option>
                    <option value="전사">전사</option>
                    <option value="준법감시실">준법감시실</option>
                    <option value="기관마케팅본부">기관마케팅본부</option>
                    <option value="디지털마케팅실">디지털마케팅실</option>
                    <option value="상품전략본부">상품전략본부</option>
                    <option value="재무본부">재무본부</option>
                    <option value="IT본부">IT본부</option>
                    <option value="인사본부">인사본부</option>
                    <option value="영업본부">영업본부</option>
                    <option value="리스크본부">리스크본부</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>소관팀</label>
                  <select
                    value={formData.responsibleTeam ?? ""}
                    onChange={(e) => onFormDataChange("responsibleTeam", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">선택하세요</option>
                    <option value="전사">전사</option>
                    <option value="법무팀">법무팀</option>
                    <option value="법인마케팅팀">법인마케팅팀</option>
                    <option value="기관마케팅팀">기관마케팅팀</option>
                    <option value="WM연금마케팅팀">WM연금마케팅팀</option>
                    <option value="WM연금사업팀">WM연금사업팀</option>
                    <option value="카톡마케팅팀">카톡마케팅팀</option>
                    <option value="마케팅솔루션팀">마케팅솔루션팀</option>
                    <option value="ETF마케팅팀">ETF마케팅팀</option>
                    <option value="상품팀">상품팀</option>
                    <option value="영업지원팀">영업지원팀</option>
                    <option value="재무팀">재무팀</option>
                    <option value="회계팀">회계팀</option>
                    <option value="시스템개발팀">시스템개발팀</option>
                    <option value="인프라팀">인프라팀</option>
                    <option value="인사팀">인사팀</option>
                    <option value="교육팀">교육팀</option>
                    <option value="기관영업팀">기관영업팀</option>
                    <option value="개인영업팀">개인영업팀</option>
                    <option value="리스크관리팀">리스크관리팀</option>
                    <option value="규정준수팀">규정준수팀</option>
                  </select>
                </div>
              </div>
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-center pt-4 border-t border-gray-200">
              <Button
                onClick={handleAdd}
                disabled={isLoading || disabled}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    {isEdit ? '수정 중...' : '저장 중...'}
                  </>
                ) : (
                  isEdit ? '수정' : '저장'
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="px-8 py-3"
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
