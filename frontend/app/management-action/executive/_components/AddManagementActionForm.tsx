"use client";

import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Maximize2, Minimize2, X, Search, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';



// 헬퍼 함수들
const getDutyNames = () => {
  return [
    "지정책임",
    "내부통제", 
    "리스크관리",
    "감사",
    "법규준수"
  ];
};

const getDutyCode = (dutyName: string) => {
  const codeMapping: Record<string, string> = {
    "지정책임": "CE-지정책임-001",
    "내부통제": "CE-내부통제-001", 
    "리스크관리": "CE-리스크관리-001",
    "감사": "CE-감사-001",
    "법규준수": "CE-법규준수-001"
  };
  
  return codeMapping[dutyName] || "";
};

const getDutyDetailsByDutyName = (dutyName: string) => {
  // 책무명에 따른 책무세부 리스트 매핑
  const dutyDetailMapping: Record<string, string[]> = {
    "지정책임": ["지정책임자 선임", "지정책임자 교육", "지정책임자 평가"],
    "내부통제": ["내부통제기준 제정", "내부통제기준 운영", "내부통제기준 점검"],
    "리스크관리": ["리스크 식별", "리스크 평가", "리스크 대응"],
    "감사": ["내부감사 실시", "감사결과 보고", "감사결과 후속조치"],
    "법규준수": ["법규 교육", "법규 점검", "법규 위반 시정"]
  };
  
  return dutyDetailMapping[dutyName] || [];
};

const getManagementObligations = () => {
  return [
    "내부통제기준의 제·개정 및 운영",
    "리스크관리기준의 제·개정 및 운영", 
    "감사기준의 제·개정 및 운영",
    "법규준수기준의 제·개정 및 운영",
    "지정책임자 관리기준의 제·개정 및 운영"
  ];
};

const getManagementObligationCode = (obligation: string) => {
  const codeMapping: Record<string, string> = {
    "내부통제기준의 제·개정 및 운영": "MO-001",
    "리스크관리기준의 제·개정 및 운영": "MO-002",
    "감사기준의 제·개정 및 운영": "MO-003", 
    "법규준수기준의 제·개정 및 운영": "MO-004",
    "지정책임자 관리기준의 제·개정 및 운영": "MO-005"
  };
  
  return codeMapping[obligation] || "";
};

const getManagementActionTypes = () => {
  return [
    "기준마련여부 점검",
    "효과적집행운영여부 점검",
    "임직원 준수여부 점검",
    "관리사항 및 미흡사항 조치",
    "조치이행여부 점검",
    "교육 및 훈련 지원",
    "조서 및 제재조치결과 보고"
  ];
};

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
  const [isDutyNameModalOpen, setIsDutyNameModalOpen] = useState(false);
  
  // 책무명이 변경될 때 책무세부 초기화
  useEffect(() => {
    if (formData.dutyName) {
      const availableDetails = getDutyDetailsByDutyName(formData.dutyName);
      if (formData.dutyDetail && !availableDetails.includes(formData.dutyDetail)) {
        onFormDataChange("dutyDetail", "");
      }
    }
  }, [formData.dutyName, formData.dutyDetail]);

  // 점검주기가 변경될 때 선택된 월 초기화
  useEffect(() => {
    if (formData.checkCycle && !["분기", "반기", "연간"].includes(formData.checkCycle)) {
      onFormDataChange("selectedMonths", []);
    }
  }, [formData.checkCycle]);
  
  // 유틸: 공통 인풋 클래스
  const labelCls = "block text-base font-medium text-gray-600 mb-1";

  // 관리조치 유형 선택 관련 함수들
  const handleActionTypeToggle = (actionType: string) => {
    const currentTypes = formData.actionTypes || [];
    const isSelected = currentTypes.includes(actionType);
    
    if (isSelected) {
      // 이미 선택된 경우 제거
      onFormDataChange("actionTypes", currentTypes.filter((type: string) => type !== actionType));
    } else {
      // 선택되지 않은 경우 추가
      onFormDataChange("actionTypes", [...currentTypes, actionType]);
    }
  };

  const isActionTypeSelected = (actionType: string) => {
    return (formData.actionTypes || []).includes(actionType);
  };

  // 월 선택 관련 함수들
  const handleMonthToggle = (month: number) => {
    const currentMonths = formData.selectedMonths || [];
    const isSelected = currentMonths.includes(month);
    const checkCycle = formData.checkCycle;
    
    let newMonths;
    if (isSelected) {
      // 이미 선택된 경우 제거
      newMonths = currentMonths.filter((m: number) => m !== month);
    } else {
      // 선택되지 않은 경우 추가 (제한 확인)
      if (checkCycle === "분기" && currentMonths.length >= 4) {
        return; // 분기는 최대 4개
      } else if (checkCycle === "반기" && currentMonths.length >= 2) {
        return; // 반기는 최대 2개
      } else if (checkCycle === "연간" && currentMonths.length >= 1) {
        return; // 연간은 최대 1개
      }
      newMonths = [...currentMonths, month];
    }
    
    onFormDataChange("selectedMonths", newMonths);
  };

  const isMonthSelected = (month: number) => {
    return (formData.selectedMonths || []).includes(month);
  };

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
                      placeholder="책무명을 선택하세요"
                      value={formData.dutyName ?? ""}
                      readOnly
                      className="pr-10 bg-white cursor-pointer"
                      onClick={() => setIsDutyNameModalOpen(true)}
                    />
                    <Search 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                      onClick={() => setIsDutyNameModalOpen(true)}
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>책무코드</label>
                  <Input 
                    type="text" 
                    value={isEdit ? (getDutyCode(formData.dutyName) || "조회 시 자동표시") : "조회 시 자동표시"}
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed" 
                  />
                </div>

                {/* 두 번째 행: 책무세부, 책무세부코드 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무세부 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between h-10 px-3 border-gray-200 hover:bg-gray-50"
                      >
                        {formData.dutyDetail || (isEdit ? "책무세부내용" : "책무세부를 선택하세요")}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {/* 책무명에 따른 책무세부 리스트 */}
                      {getDutyDetailsByDutyName(formData.dutyName).map((detail) => (
                        <DropdownMenuItem
                          key={detail}
                          onClick={() => onFormDataChange("dutyDetail", detail)}
                        >
                          {detail}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>책무세부코드</label>
                  <Input 
                    type="text" 
                    value={isEdit ? (formData.dutyDetailCode || "조회 시 자동표시") : "조회 시 자동표시"}
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                {/* 세 번째 행: 관리의무, 관리의무코드 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    관리의무 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between h-10 px-3 border-gray-200 hover:bg-gray-50"
                      >
                        {formData.managementObligation || (isEdit ? "관리의무" : "관리의무를 선택하세요")}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {/* 관리의무 리스트 */}
                      {getManagementObligations().map((obligation) => (
                        <DropdownMenuItem
                          key={obligation}
                          onClick={() => onFormDataChange("managementObligation", obligation)}
                        >
                          {obligation}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>관리의무코드</label>
                  <Input 
                    type="text" 
                    value={getManagementObligationCode(formData.managementObligation) || "조회 시 자동표시"}
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </section>



            {/* =============== 관리조치 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                관리조치
              </h3>

              <div className="grid grid-cols-12 gap-4">
                {/* 첫 번째 행: 관리조치, 관리조치코드 */}
                <div className="col-span-12 md:col-span-6">
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

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>관리조치코드</label>
                  <Input 
                    type="text" 
                    value={isEdit ? (formData.managementActionCode || "*등록 시 자동생성") : "*등록 시 자동생성"}
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed" 
                  />
                </div>

                {/* 두 번째 행: 관리조치 유형 */}
                <div className="col-span-12">
                  <label className={labelCls}>관리조치 유형</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {/* 왼쪽 열: 4개 */}
                    <div className="space-y-1">
                      {getManagementActionTypes().slice(0, 4).map((actionType) => (
                        <div
                          key={actionType}
                          onClick={() => handleActionTypeToggle(actionType)}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                              isActionTypeSelected(actionType)
                                ? "border-orange-500 bg-orange-500"
                                : "border-gray-300 bg-white"
                            }`}>
                              {isActionTypeSelected(actionType) && (
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-900 font-medium text-sm">{actionType}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* 오른쪽 열: 3개 */}
                    <div className="space-y-1">
                      {getManagementActionTypes().slice(4, 7).map((actionType) => (
                        <div
                          key={actionType}
                          onClick={() => handleActionTypeToggle(actionType)}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                              isActionTypeSelected(actionType)
                                ? "border-orange-500 bg-orange-500"
                                : "border-gray-300 bg-white"
                            }`}>
                              {isActionTypeSelected(actionType) && (
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-900 font-medium text-sm">{actionType}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>



                {/* 세 번째 행: 점검주기, 증빙 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>점검주기</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.checkCycle || (isEdit ? "점검주기" : "점검주기를 선택하세요")}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
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
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "발생시")}
                        className="cursor-pointer"
                      >
                        발생시
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("checkCycle", "수시")}
                        className="cursor-pointer"
                      >
                        수시
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* 월 선택 섹션 */}
                  {(formData.checkCycle === "분기" || formData.checkCycle === "반기" || formData.checkCycle === "연간") && (
                    <div className="mt-3">
                      <label className="text-sm font-medium text-gray-600 mb-2 block">
                        점검월 선택
                        {formData.checkCycle === "분기" && " (4개월 선택)"}
                        {formData.checkCycle === "반기" && " (2개월 선택)"}
                        {formData.checkCycle === "연간" && " (1개월 선택)"}
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <div
                            key={month}
                            onClick={() => handleMonthToggle(month)}
                            className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                          >
                            <div className="flex-shrink-0">
                              <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                                isMonthSelected(month)
                                  ? "border-orange-500 bg-orange-500"
                                  : "border-gray-300 bg-white"
                              }`}>
                                {isMonthSelected(month) && (
                                  <div className="w-1 h-1 bg-white rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <span className="text-xs text-gray-700">{month}월</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

                {/* 네 번째 행: 이행점검항목 */}
                <div className="col-span-12">
                  <label className={labelCls}>이행점검항목</label>
                  <Textarea
                    placeholder="이행점검항목을 입력하세요 (여러 줄 입력 가능)"
                    value={formData.inspectionItems ?? ""}
                    onChange={(e) => onFormDataChange("inspectionItems", e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <Button 
                onClick={handleAdd}
                disabled={isLoading || disabled}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
              >
                등록
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 책무명 선택 모달 */}
      {isDutyNameModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">책무명 선택</h3>
                <button
                  onClick={() => setIsDutyNameModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                {getDutyNames().map((dutyName) => (
                  <div
                    key={dutyName}
                    onClick={() => {
                      onFormDataChange("dutyName", dutyName);
                      setIsDutyNameModalOpen(false);
                    }}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{dutyName}</div>
                    <div className="text-sm text-gray-500 mt-1">{getDutyCode(dutyName)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
