"use client";

import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Maximize2, Minimize2, X, Search, ChevronDown } from 'lucide-react';
import { StartDateFilter, EndDateFilter } from '@/components/ui/DateFilter';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AddButton from '@/components/ui/add-button';
import DeleteButton from '@/components/ui/delete-button';
import SaveButton from '../../department/_components/SaveButton';
import CancelButton from './CancelButton';

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
  
  // 소관부서와 소관팀 배열 상태 - formData에서 초기값 설정
  const [responsibleDepts, setResponsibleDepts] = useState<string[]>(
    formData.responsibleDept ? [formData.responsibleDept] : [""]
  );
  const [responsibleTeams, setResponsibleTeams] = useState<string[]>(
    formData.responsibleTeam ? [formData.responsibleTeam] : [""]
  );
  
  // formData가 변경될 때 responsible 배열들 업데이트
  useEffect(() => {
    if (formData.responsibleDept) {
      setResponsibleDepts([formData.responsibleDept]);
    } else {
      setResponsibleDepts([""]);
    }
    
    if (formData.responsibleTeam) {
      setResponsibleTeams([formData.responsibleTeam]);
    } else {
      setResponsibleTeams([""]);
    }
  }, [formData.responsibleDept, formData.responsibleTeam]);
  
  // 유틸: 공통 인풋 클래스
  const labelCls = "block text-base font-medium text-gray-600 mb-1";

  // 소관부서 관리 함수들
  const addResponsibleDept = () => setResponsibleDepts(prev => [...prev, ""]);
  const removeResponsibleDept = (index: number) => 
    setResponsibleDepts(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  const updateResponsibleDept = (index: number, value: string) =>
    setResponsibleDepts(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

  // 소관팀 관리 함수들
  const addResponsibleTeam = () => setResponsibleTeams(prev => [...prev, ""]);
  const removeResponsibleTeam = (index: number) => 
    setResponsibleTeams(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  const updateResponsibleTeam = (index: number, value: string) =>
    setResponsibleTeams(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

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

  // 직책코드에 따른 직책 라벨 반환 함수
  const getJobTitleLabel = (jobCode: string) => {
    const jobTitleMap: Record<string, string> = {
      'CE': '대표이사',
      'BD': '이사회 의장',
      'CO': '준법감시인',
      'AU': '감사실장',
      'MK': '마케팅총괄부사장',
      'FI': '재무총괄부사장',
      'IT': 'IT총괄부사장',
      'HR': '인사총괄부사장',
      'SA': '영업총괄부사장',
      'RS': '리스크총괄부사장'
    };
    return jobTitleMap[jobCode] || '';
  };

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
                {isEdit ? '직책 및 조직 수정등록' : '직책 및 조직 신규등록'}
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
            {/* =============== 직책 정보 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                직책 정보
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    직책코드 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.jobCode ? `${formData.jobCode} - ${getJobTitleLabel(formData.jobCode)}` : "선택하세요"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "")}
                        className="cursor-pointer"
                      >
                        선택하세요
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "CE")}
                        className="cursor-pointer"
                      >
                        CE - 대표이사
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "BD")}
                        className="cursor-pointer"
                      >
                        BD - 이사회 의장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "CO")}
                        className="cursor-pointer"
                      >
                        CO - 준법감시인
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "AU")}
                        className="cursor-pointer"
                      >
                        AU - 감사실장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "MK")}
                        className="cursor-pointer"
                      >
                        MK - 마케팅총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "FI")}
                        className="cursor-pointer"
                      >
                        FI - 재무총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "IT")}
                        className="cursor-pointer"
                      >
                        IT - IT총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "HR")}
                        className="cursor-pointer"
                      >
                        HR - 인사총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "SA")}
                        className="cursor-pointer"
                      >
                        SA - 영업총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobCode", "RS")}
                        className="cursor-pointer"
                      >
                        RS - 리스크총괄부사장
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    직책 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.jobTitle || "선택하세요"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "")}
                        className="cursor-pointer"
                      >
                        선택하세요
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "대표이사")}
                        className="cursor-pointer"
                      >
                        대표이사
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "이사회 의장")}
                        className="cursor-pointer"
                      >
                        이사회 의장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "준법감시인")}
                        className="cursor-pointer"
                      >
                        준법감시인
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "감사실장")}
                        className="cursor-pointer"
                      >
                        감사실장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "마케팅총괄부사장")}
                        className="cursor-pointer"
                      >
                        마케팅총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "재무총괄부사장")}
                        className="cursor-pointer"
                      >
                        재무총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "IT총괄부사장")}
                        className="cursor-pointer"
                      >
                        IT총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "인사총괄부사장")}
                        className="cursor-pointer"
                      >
                        인사총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "영업총괄부사장")}
                        className="cursor-pointer"
                      >
                        영업총괄부사장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "리스크총괄부사장")}
                        className="cursor-pointer"
                      >
                        리스크총괄부사장
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </section>

            {/* =============== 조직 정보 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                조직 정보
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    조직구분 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.orgDivision || "선택하세요"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("orgDivision", "")}
                        className="cursor-pointer"
                      >
                        선택하세요
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("orgDivision", "대표이사")}
                        className="cursor-pointer"
                      >
                        대표이사
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("orgDivision", "이사회 의장")}
                        className="cursor-pointer"
                      >
                        이사회 의장
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("orgDivision", "경영지원")}
                        className="cursor-pointer"
                      >
                        경영지원
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("orgDivision", "감사실")}
                        className="cursor-pointer"
                      >
                        감사실
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("orgDivision", "금융영업")}
                        className="cursor-pointer"
                      >
                        금융영업
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    관리대상조직 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="관리대상조직을 입력하세요"
                      value={formData.managedOrg ?? ""}
                      onChange={(e) => onFormDataChange("managedOrg", e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* 소관부서 */}
                <div className="col-span-12 md:col-span-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className={labelCls}>소관부서</label>
                    <AddButton onClick={addResponsibleDept} />
                  </div>
                  
                  <div className="space-y-2">
                    {responsibleDepts.map((dept, idx) => (
                      <div key={`org-dept-${idx}`} className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Input
                            type="text"
                            placeholder="소관부서를 입력하세요"
                            value={dept}
                            onChange={(e) => updateResponsibleDept(idx, e.target.value)}
                            className="pr-10"
                          />
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <DeleteButton onClick={() => removeResponsibleDept(idx)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 소관팀 */}
                <div className="col-span-12 md:col-span-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className={labelCls}>소관팀</label>
                    <AddButton onClick={addResponsibleTeam} />
                  </div>
                  
                  <div className="space-y-2">
                    {responsibleTeams.map((team, idx) => (
                      <div key={`org-team-${idx}`} className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Input
                            type="text"
                            placeholder="소관팀을 입력하세요"
                            value={team}
                            onChange={(e) => updateResponsibleTeam(idx, e.target.value)}
                            className="pr-10"
                          />
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <DeleteButton onClick={() => removeResponsibleTeam(idx)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* =============== 책무 및 책무상세 =============== */}
           
            {/* =============== 대상기간 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                대상기간
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    적용시작일자 <span className="text-red-500">*</span>
                  </label>
                  <StartDateFilter
                    startDate={formData.startDate ?? ""}
                    onStartDateChange={(date) => onFormDataChange("startDate", date)}
                    placeholder="연도-월-일"
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    적용종료일자 <span className="text-red-500">*</span>
                  </label>
                  <EndDateFilter
                    endDate={formData.endDate ?? ""}
                    onEndDateChange={(date) => onFormDataChange("endDate", date)}
                    placeholder="연도-월-일"
                  />
                </div>
              </div>
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <SaveButton onClick={handleAdd} disabled={isLoading || disabled} />
              <CancelButton onClick={() => onOpenChange(false)} disabled={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
