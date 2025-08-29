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
            {/* =============== 관리대상조직Lv1 수정 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                관리대상조직Lv1 수정
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    조직명 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.orgNameLv1 ?? "경영관리부문"}
                    onChange={(e) => onFormDataChange("orgNameLv1", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="경영관리부문">경영관리부문</option>
                    <option value="ETF투자부문">ETF투자부문</option>
                    <option value="자산운용부문">자산운용부문</option>
                    <option value="자산관리부문">자산관리부문</option>
                    <option value="글로벌투자부문">글로벌투자부문</option>
                    <option value="준법감시실">준법감시실</option>
                    <option value="IT부문">IT부문</option>
                    <option value="인사부문">인사부문</option>
                    <option value="재무부문">재무부문</option>
                    <option value="법무부문">법무부문</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>조직코드</label>
                  <input 
                    type="text" 
                    placeholder="저장 클릭시 자동생성" 
                    readOnly 
                    className={roFieldCls} 
                  />
                </div>
              </div>
            </section>

            {/* =============== 소관부서/본부Lv2 수정 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                소관부서/본부Lv2 수정
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    조직명 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.orgNameLv2 ?? "경영지원실"}
                    onChange={(e) => onFormDataChange("orgNameLv2", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="경영지원실">경영지원실</option>
                    <option value="ETF운용팀">ETF운용팀</option>
                    <option value="ETF전략팀">ETF전략팀</option>
                    <option value="자산운용팀">자산운용팀</option>
                    <option value="리스크관리팀">리스크관리팀</option>
                    <option value="자산관리팀">자산관리팀</option>
                    <option value="글로벌투자팀">글로벌투자팀</option>
                    <option value="소비자보호팀">소비자보호팀</option>
                    <option value="시스템개발팀">시스템개발팀</option>
                    <option value="인프라팀">인프라팀</option>
                    <option value="인사팀">인사팀</option>
                    <option value="재무팀">재무팀</option>
                    <option value="법무팀">법무팀</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>조직코드</label>
                  <input 
                    type="text" 
                    placeholder="저장 클릭시 자동생성" 
                    readOnly 
                    className={roFieldCls} 
                  />
                </div>
          </div>
            </section>

            {/* =============== 소관팀Lv3 수정 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                소관팀Lv3 수정
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    조직명 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.orgNameLv3 ?? "경영지원1팀"}
                    onChange={(e) => onFormDataChange("orgNameLv3", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="경영지원1팀">경영지원1팀</option>
                    <option value="경영지원2팀">경영지원2팀</option>
                    <option value="ETF운용1팀">ETF운용1팀</option>
                    <option value="ETF운용2팀">ETF운용2팀</option>
                    <option value="ETF전략1팀">ETF전략1팀</option>
                    <option value="자산운용1팀">자산운용1팀</option>
                    <option value="리스크관리1팀">리스크관리1팀</option>
                    <option value="자산관리1팀">자산관리1팀</option>
                    <option value="글로벌투자1팀">글로벌투자1팀</option>
                    <option value="소비자보호1팀">소비자보호1팀</option>
                    <option value="시스템개발1팀">시스템개발1팀</option>
                    <option value="인프라1팀">인프라1팀</option>
                    <option value="인사1팀">인사1팀</option>
                    <option value="재무1팀">재무1팀</option>
                    <option value="법무1팀">법무1팀</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>조직코드</label>
                  <input 
                    type="text" 
                    placeholder="저장 클릭시 자동생성" 
                    readOnly 
                    className={roFieldCls} 
                  />
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
