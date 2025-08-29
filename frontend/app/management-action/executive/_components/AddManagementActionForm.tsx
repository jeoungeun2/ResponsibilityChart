"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Plus, Maximize2, Minimize2, X, Search } from 'lucide-react';

interface AddManagementActionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Record<string, any>;
  onFormDataChange: (field: string, value: any) => void;
  onAdd: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isEdit?: boolean;
}

export default function AddManagementActionForm({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  disabled = false,
  isEdit = false
}: AddManagementActionFormProps) {
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
            : 'max-w-6xl max-h-[85vh] w-[90vw] h-[85vh]'
        } flex flex-col`}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">
            {isEdit ? '관리조치 수정' : '관리조치 신규 등록'}
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
            {/* =============== 책무 및 책무상세 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                책무 및 책무상세
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무명 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.dutyName ?? ""}
                      onChange={(e) => onFormDataChange("dutyName", e.target.value)}
                      placeholder="텍스트를 입력하세요"
                      className={fieldCls}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>책무코드</label>
                  <input 
                    type="text" 
                    value="조회 시 자동표시"
                    readOnly 
                    className={roFieldCls} 
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무세부 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.dutyDetail ?? ""}
                      onChange={(e) => onFormDataChange("dutyDetail", e.target.value)}
                      placeholder="텍스트를 입력하세요"
                      className={fieldCls}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>책무세부코드</label>
                  <input 
                    type="text" 
                    value="조회 시 자동표시"
                    readOnly 
                    className={roFieldCls} 
                  />
                </div>
              </div>
            </section>

            {/* =============== 조직 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                조직
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>관리대상조직</label>
                  <select
                    value={formData.managedOrganization ?? "전체"}
                    onChange={(e) => onFormDataChange("managedOrganization", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="전체">전체</option>
                    <option value="경영기획팀">경영기획팀</option>
                    <option value="인사팀">인사팀</option>
                    <option value="재무팀">재무팀</option>
                    <option value="영업팀">영업팀</option>
                    <option value="개발팀">개발팀</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>소관부서/본부</label>
                  <select
                    value={formData.responsibleDepartment ?? "전체"}
                    onChange={(e) => onFormDataChange("responsibleDepartment", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="전체">전체</option>
                    <option value="경영지원본부">경영지원본부</option>
                    <option value="영업본부">영업본부</option>
                    <option value="개발본부">개발본부</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>소관팀</label>
                  <select
                    value={formData.responsibleTeam ?? "전체"}
                    onChange={(e) => onFormDataChange("responsibleTeam", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="전체">전체</option>
                    <option value="경영기획팀">경영기획팀</option>
                    <option value="인사팀">인사팀</option>
                    <option value="재무팀">재무팀</option>
                  </select>
                </div>
              </div>
            </section>

            {/* =============== 관리조치 및 관리조치 세부활동 등록 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                관리조치 및 관리조치 세부활동 등록
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    관리조치 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.managementAction ?? ""}
                    onChange={(e) => onFormDataChange("managementAction", e.target.value)}
                    placeholder="내용을 입력하세요"
                    className={fieldCls}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>관리조치 유형</label>
                  <select
                    value={formData.actionType ?? "전체"}
                    onChange={(e) => onFormDataChange("actionType", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="전체">전체</option>
                    <option value="기준마련 여부 점검">기준마련 여부 점검</option>
                    <option value="기준의 효과적 집행·운영 여부 점검">기준의 효과적 집행·운영 여부 점검</option>
                    <option value="임직원 준수 여부 점검">임직원 준수 여부 점검</option>
                    <option value="관리사항 및 미흡사항 조치">관리사항 및 미흡사항 조치</option>
                    <option value="조치 이행 여부 점검">조치 이행 여부 점검</option>
                    <option value="교육 및 훈련지원">교육 및 훈련지원</option>
                    <option value="조사 및 제재조치 결과보고">조사 및 제재조치 결과보고</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>관리조치코드</label>
                  <input 
                    type="text" 
                    value="*승인 시 자동생성"
                    readOnly 
                    className={roFieldCls} 
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    관리조치세부활동 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.detailedAction ?? ""}
                    onChange={(e) => onFormDataChange("detailedAction", e.target.value)}
                    placeholder="내용을 입력하세요"
                    className={fieldCls}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>점검주기</label>
                  <select
                    value={formData.checkCycle ?? "전체"}
                    onChange={(e) => onFormDataChange("checkCycle", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="전체">전체</option>
                    <option value="일간">일간</option>
                    <option value="주간">주간</option>
                    <option value="월간">월간</option>
                    <option value="분기">분기</option>
                    <option value="반기">반기</option>
                    <option value="연간">연간</option>
                  </select>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>증빙</label>
                  <input
                    type="text"
                    value={formData.evidence ?? ""}
                    onChange={(e) => onFormDataChange("evidence", e.target.value)}
                    placeholder="증빙 내용을 입력하세요"
                    className={fieldCls}
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
                onClick={handleAdd}
                disabled={isLoading || disabled}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 border-2 border-red-400 border-dashed"
              >
                승인요청
              </Button>
              <Button
                variant="outline"
                onClick={handleAdd}
                disabled={isLoading || disabled}
                className="px-8 py-3"
              >
                승인
              </Button>
              <Button
                variant="outline"
                onClick={handleAdd}
                disabled={isLoading || disabled}
                className="px-8 py-3"
              >
                반려
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
