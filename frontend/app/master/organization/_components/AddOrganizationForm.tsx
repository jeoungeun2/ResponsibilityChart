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
  
  // 소관부서와 소관팀을 세트로 관리하는 상태
  const [responsibleDeptTeams, setResponsibleDeptTeams] = useState<Array<{
    dept: string;
    teams: string[];
  }>>(
    formData.responsibleDept && formData.responsibleTeam 
      ? [{ dept: formData.responsibleDept, teams: [formData.responsibleTeam] }]
      : [{ dept: "", teams: [""] }]
  );
  
  // formData가 변경될 때 responsible 배열들 업데이트
  useEffect(() => {
    if (formData.responsibleDept && formData.responsibleTeam) {
      setResponsibleDeptTeams([{ dept: formData.responsibleDept, teams: [formData.responsibleTeam] }]);
    } else {
      setResponsibleDeptTeams([{ dept: "", teams: [""] }]);
    }
  }, [formData.responsibleDept, formData.responsibleTeam]);
  
  // 유틸: 공통 인풋 클래스
  const labelCls = "block text-base font-medium text-gray-600 mb-1";

  // 소관부서-팀 세트 관리 함수들
  const addResponsibleDeptTeam = () => 
    setResponsibleDeptTeams(prev => [...prev, { dept: "", teams: [""] }]);
  
  const removeResponsibleDeptTeam = (index: number) => 
    setResponsibleDeptTeams(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  
  const updateResponsibleDept = (index: number, value: string) =>
    setResponsibleDeptTeams(prev => {
      const next = [...prev];
      next[index] = { ...next[index], dept: value };
      return next;
    });

  const addResponsibleTeam = (deptIndex: number) =>
    setResponsibleDeptTeams(prev => {
      const next = [...prev];
      next[deptIndex] = {
        ...next[deptIndex],
        teams: [...next[deptIndex].teams, ""]
      };
      return next;
    });

  const removeResponsibleTeam = (deptIndex: number, teamIndex: number) =>
    setResponsibleDeptTeams(prev => {
      const next = [...prev];
      if (next[deptIndex].teams.length > 1) {
        next[deptIndex] = {
          ...next[deptIndex],
          teams: next[deptIndex].teams.filter((_, i) => i !== teamIndex)
        };
      }
      return next;
    });

  const updateResponsibleTeam = (deptIndex: number, teamIndex: number, value: string) =>
    setResponsibleDeptTeams(prev => {
      const next = [...prev];
      next[deptIndex] = {
        ...next[deptIndex],
        teams: next[deptIndex].teams.map((team, i) => i === teamIndex ? value : team)
      };
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

  // 직책에 따른 직책코드 자동 생성 함수
  const generateJobCode = (jobTitle: string) => {
    const jobCodeMap: Record<string, string> = {
      '대표이사': 'CE',
      '이사회 의장': 'BD',
      '준법감시인': 'CO',
      '감사실장': 'AU',
      '마케팅총괄부사장': 'MK',
      '재무총괄부사장': 'FI',
      'IT총괄부사장': 'IT',
      '인사총괄부사장': 'HR',
      '영업총괄부사장': 'SA',
      '리스크총괄부사장': 'RS'
    };
    return jobCodeMap[jobTitle] || '';
  };

  // 직책 입력 시 직책코드 자동 생성
  const handleJobTitleChange = (value: string) => {
    onFormDataChange("jobTitle", value);
    const generatedCode = generateJobCode(value);
    if (generatedCode) {
      onFormDataChange("jobCode", generatedCode);
    }
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
                    직책 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="직책을 입력하세요"
                    value={formData.jobTitle || ""}
                    onChange={(e) => handleJobTitleChange(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    직책코드 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="직책코드가 자동으로 생성됩니다"
                    value={formData.jobCode || ""}
                    readOnly
                    className="w-full bg-gray-50 text-gray-600"
                  />
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

                {/* 소관부서 및 소관팀 */}
                <div className="col-span-12">
                  <div className="flex items-center justify-between mb-4">
                    <label className={labelCls}>소관부서 및 소관팀</label>
                    <AddButton onClick={addResponsibleDeptTeam} />
                  </div>
                  
                  <div className="space-y-4">
                    {responsibleDeptTeams.map((deptTeam, deptIdx) => (
                      <div key={`dept-team-${deptIdx}`} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-700">소관부서 {deptIdx + 1}</h4>
                          <DeleteButton onClick={() => removeResponsibleDeptTeam(deptIdx)} />
                        </div>
                        
                        {/* 소관부서와 소관팀을 좌우로 배치 */}
                        <div className="grid grid-cols-12 gap-4">
                          {/* 소관부서 - 왼쪽 */}
                          <div className="col-span-12 md:col-span-6">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              소관부서
                            </label>
                            <div className="relative">
                              <Input
                                type="text"
                                placeholder="소관부서를 입력하세요"
                                value={deptTeam.dept}
                                onChange={(e) => updateResponsibleDept(deptIdx, e.target.value)}
                                className="pr-10"
                              />
                              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          
                          {/* 소관팀들 - 오른쪽 */}
                          <div className="col-span-12 md:col-span-6">
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-medium text-gray-600">소관팀</label>
                              <AddButton onClick={() => addResponsibleTeam(deptIdx)} />
                            </div>
                            
                            <div className="space-y-2">
                              {deptTeam.teams.map((team, teamIdx) => (
                                <div key={`team-${deptIdx}-${teamIdx}`} className="flex items-center gap-2">
                                  <div className="relative flex-1">
                                    <Input
                                      type="text"
                                      placeholder="소관팀을 입력하세요"
                                      value={team}
                                      onChange={(e) => updateResponsibleTeam(deptIdx, teamIdx, e.target.value)}
                                      className="pr-10"
                                    />
                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  </div>
                                  <DeleteButton onClick={() => removeResponsibleTeam(deptIdx, teamIdx)} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
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
