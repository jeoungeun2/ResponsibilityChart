"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Maximize2, Minimize2, X, Search, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SaveButton from '@/app/master/department/_components/SaveButton';
import ApprovalRequestButton from '@/app/master/department/_components/ApprovalRequestButton';
import ApproveButton from '@/app/master/department/_components/ApproveButton';
import RejectButton from '@/app/master/department/_components/RejectButton';

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
  const labelCls = "block text-base font-medium text-gray-600 mb-1";

  const handleAdd = () => {
    // actionTypes 배열을 객체로 변환
    const actionTypesArray = formData.actionTypes || [];
    const actionTypesObject = {
      standardCheck: actionTypesArray.includes("기준마련 여부 점검"),
      executionCheck: actionTypesArray.includes("기준의 효과적 집행·운영 여부 점검"),
      complianceCheck: actionTypesArray.includes("임직원 준수 여부 점검"),
      managementAction: actionTypesArray.includes("관리사항 및 미흡사항 조치"),
      implementationCheck: actionTypesArray.includes("조치 이행 여부 점검"),
      educationSupport: actionTypesArray.includes("교육 및 훈련지원"),
      investigationReport: actionTypesArray.includes("조사 및 제재조치 결과보고")
    };
    
    // 변환된 데이터로 onAdd 호출
    const processedFormData = {
      ...formData,
      actionTypes: actionTypesObject
    };
    
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div 
        className={`border border-warm-grey-600/50 shadow-2xl transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh]' 
            : 'max-w-3xl max-h-[85vh] w-[80vw] h-[85vh]'
        } flex flex-col`}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center flex-shrink-0">
          {/* 헤더 내용 */}
          <div className="flex justify-between items-center w-full relative z-50 border-b border-white/20 py-1 px-2 relative bg-white/10 backdrop-blur-md">
            <div className="flex items-center">
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40"
              >
                {isExpanded ? (
                  <Minimize2 className="h-5 w-5 text-white font-semibold" />
                ) : (
                  <Maximize2 className="h-5 w-5 text-white font-semibold" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40"
              >
                <X className="h-5 w-5 text-white font-semibold" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* =============== 제목 =============== */}
          <div className="py-4 bg-[#f7f7f8] border-b border-gray-200">
            <div className="px-6 border-l-4 border-[#EC6437]">
              <h2 className="text-xl font-bold text-[#EC6437]">
                {isEdit ? '관리조치 수정등록' : '관리조치 신규등록'}
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
            {/* =============== 책무 및 책무상세 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                책무 및 책무상세
              </h3>

              <div className="grid grid-cols-12 gap-4">
                {/* 첫 번째 행: 책무명, 책무코드 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무명 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="텍스트를 입력하세요"
                      value={formData.dutyName ?? ""}
                      onChange={(e) => onFormDataChange("dutyName", e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>책무코드</label>
                  <Input 
                    type="text" 
                    value="조회 시 자동표시"
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed" 
                  />
                </div>

                {/* 두 번째 행: 책무세부, 책무세부코드 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무세부 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="텍스트를 입력하세요"
                      value={formData.dutyDetail ?? ""}
                      onChange={(e) => onFormDataChange("dutyDetail", e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>책무세부코드</label>
                  <Input 
                    type="text" 
                    value="조회 시 자동표시"
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed" 
                  />
                </div>
              </div>
            </section>

            {/* =============== 조직 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                조직
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>관리대상조직</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.managedOrganization || "전체"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("managedOrganization", "전체")}
                        className="cursor-pointer"
                      >
                        전체
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("managedOrganization", "경영기획팀")}
                        className="cursor-pointer"
                      >
                        경영기획팀
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("managedOrganization", "인사팀")}
                        className="cursor-pointer"
                      >
                        인사팀
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("managedOrganization", "재무팀")}
                        className="cursor-pointer"
                      >
                        재무팀
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("managedOrganization", "영업팀")}
                        className="cursor-pointer"
                      >
                        영업팀
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("managedOrganization", "개발팀")}
                        className="cursor-pointer"
                      >
                        개발팀
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>소관부서/본부</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.responsibleDepartment || "전체"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("responsibleDepartment", "전체")}
                        className="cursor-pointer"
                      >
                        전체
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("responsibleDepartment", "경영지원본부")}
                        className="cursor-pointer"
                      >
                        경영지원본부
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("responsibleDepartment", "영업본부")}
                        className="cursor-pointer"
                      >
                        영업본부
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("responsibleDepartment", "개발본부")}
                        className="cursor-pointer"
                      >
                        개발본부
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>소관팀</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.responsibleTeam || "전체"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("responsibleTeam", "전체")}
                        className="cursor-pointer"
                      >
                        전체
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("responsibleTeam", "경영기획팀")}
                        className="cursor-pointer"
                      >
                        경영기획팀
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("responsibleTeam", "인사팀")}
                        className="cursor-pointer"
                      >
                        인사팀
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("responsibleTeam", "재무팀")}
                        className="cursor-pointer"
                      >
                        재무팀
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </section>

            {/* =============== 관리조치 및 관리조치 세부활동 등록 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                관리조치 및 관리조치 세부활동 등록
              </h3>

              <div className="grid grid-cols-12 gap-4">
                {/* 첫 번째 행: 관리조치 (전체 너비) */}
                <div className="col-span-12">
                  <label className={labelCls}>
                    관리조치 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="내용을 입력하세요"
                    value={formData.managementAction ?? ""}
                    onChange={(e) => onFormDataChange("managementAction", e.target.value)}
                  />
                </div>

                {/* 두 번째 행: 관리조치 유형, 관리조치코드 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>관리조치 유형</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.actionTypes && formData.actionTypes.length > 0 
                            ? `${formData.actionTypes.length}개 선택됨`
                            : "선택하세요"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full min-w-[300px]">
                      {[
                        "기준마련 여부 점검",
                        "기준의 효과적 집행·운영 여부 점검",
                        "임직원 준수 여부 점검",
                        "관리사항 및 미흡사항 조치",
                        "조치 이행 여부 점검",
                        "교육 및 훈련지원",
                        "조사 및 제재조치 결과보고"
                      ].map((actionType) => (
                        <DropdownMenuItem
                          key={actionType}
                          onClick={() => {
                            const currentTypes = formData.actionTypes || [];
                            const isSelected = currentTypes.includes(actionType);
                            
                            if (isSelected) {
                              // 이미 선택된 경우 제거
                              const newTypes = currentTypes.filter(type => type !== actionType);
                              onFormDataChange("actionTypes", newTypes);
                            } else {
                              // 선택되지 않은 경우 추가
                              const newTypes = [...currentTypes, actionType];
                              onFormDataChange("actionTypes", newTypes);
                            }
                          }}
                          className="cursor-pointer flex items-center justify-between"
                        >
                          <span>{actionType}</span>
                          {formData.actionTypes && formData.actionTypes.includes(actionType) && (
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* 선택된 항목들 표시 */}
                  {formData.actionTypes && formData.actionTypes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.actionTypes.map((type: string) => (
                        <span
                          key={type}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {type}
                          <button
                            type="button"
                            onClick={() => {
                              const newTypes = formData.actionTypes.filter((t: string) => t !== type);
                              onFormDataChange("actionTypes", newTypes);
                            }}
                            className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-200 focus:text-blue-500"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>관리조치코드</label>
                  <Input 
                    type="text" 
                    value="*승인 시 자동생성"
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed" 
                  />
                </div>

                {/* 세 번째 행: 관리조치세부활동 (전체 너비) */}
                <div className="col-span-12">
                  <label className={labelCls}>
                    관리조치세부활동 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="내용을 입력하세요"
                    value={formData.detailedAction ?? ""}
                    onChange={(e) => onFormDataChange("detailedAction", e.target.value)}
                  />
                </div>

                {/* 네 번째 행: 점검주기, 증빙 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>점검주기</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.checkCycle || "전체"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "전체")}
                        className="cursor-pointer"
                      >
                        전체
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "일간")}
                        className="cursor-pointer"
                      >
                        일간
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "주간")}
                        className="cursor-pointer"
                      >
                        주간
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "월간")}
                        className="cursor-pointer"
                      >
                        월간
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "분기")}
                        className="cursor-pointer"
                      >
                        분기
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "반기")}
                        className="cursor-pointer"
                      >
                        반기
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "연간")}
                        className="cursor-pointer"
                      >
                        연간
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>증빙</label>
                  <Input
                    type="text"
                    placeholder="증빙 내용을 입력하세요"
                    value={formData.evidence ?? ""}
                    onChange={(e) => onFormDataChange("evidence", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <SaveButton 
                onClick={handleAdd}
                disabled={isLoading || disabled}
              />
              <ApprovalRequestButton 
                onClick={handleAdd}
                disabled={isLoading || disabled}
              />
              <ApproveButton 
                onClick={handleAdd}
                disabled={isLoading}
              />
              <RejectButton 
                onClick={handleAdd}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
