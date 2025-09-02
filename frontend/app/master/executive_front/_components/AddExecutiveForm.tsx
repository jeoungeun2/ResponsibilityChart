"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Maximize2, Minimize2, X, Search, ChevronDown } from 'lucide-react';
import { StartDateFilter, EndDateFilter } from '@/components/ui/DateFilter';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SaveButton from '@/app/master/department/_components/SaveButton';

interface AddExecutiveFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Record<string, any>;
  onFormDataChange: (field: string, value: any) => void;
  onAdd: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isEdit?: boolean;
}

export default function AddExecutiveForm({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  disabled = false,
  isEdit = false
}: AddExecutiveFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 유틸: 공통 인풋 클래스
  const labelCls = "block text-base font-medium text-gray-600 mb-1";

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
                임원정보등록
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
            {/* =============== 기본정보 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                기본정보
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    성명 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="성명을 입력하세요"
                    value={formData.name || ""}
                    onChange={(e) => onFormDataChange("name", e.target.value)}
                    className="w-full"
                  />
                </div>



                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    직위 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between h-10"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.jobTitle || "선택하세요"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "대표이사")}
                        className="cursor-pointer"
                      >
                        대표이사
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "상무")}
                        className="cursor-pointer"
                      >
                        상무
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("jobTitle", "실장")}
                        className="cursor-pointer"
                      >
                        실장
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    사번 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="사번을 입력하세요"
                    value={formData.employeeId || ""}
                    onChange={(e) => onFormDataChange("employeeId", e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </section>

            {/* =============== 연락처 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                연락처
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="전화번호를 입력하세요"
                    value={formData.phoneNumber || ""}
                    onChange={(e) => onFormDataChange("phoneNumber", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email || ""}
                    onChange={(e) => onFormDataChange("email", e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </section>

            {/* =============== 임기 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                임기
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    임기시작일 <span className="text-red-500">*</span>
                  </label>
                  <StartDateFilter
                    startDate={formData.termStartDate || ""}
                    onStartDateChange={(date) => onFormDataChange("termStartDate", date)}
                    placeholder="연도-월-일"
                    className="w-full"
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    임기종료일 <span className="text-red-500">*</span>
                  </label>
                  <EndDateFilter
                    endDate={formData.termEndDate || ""}
                    onEndDateChange={(date) => onFormDataChange("termEndDate", date)}
                    placeholder="연도-월-일"
                    className="w-full"
                  />
                </div>
              </div>
            </section>

            {/* =============== 겸직 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                겸직
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    사외겸직여부 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between h-10"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.hasExternalConcurrentPosition || "선택하세요"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("hasExternalConcurrentPosition", "있음")}
                        className="cursor-pointer"
                      >
                        있음
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("hasExternalConcurrentPosition", "없음")}
                        className="cursor-pointer"
                      >
                        없음
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    겸직업종
                  </label>
                  <Input
                    type="text"
                    placeholder="겸직업종을 입력하세요"
                    value={formData.concurrentIndustry || ""}
                    onChange={(e) => onFormDataChange("concurrentIndustry", e.target.value)}
                    className="w-full"
                    disabled={formData.hasExternalConcurrentPosition === "없음"}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    겸직회사
                  </label>
                  <Input
                    type="text"
                    placeholder="겸직회사를 입력하세요"
                    value={formData.concurrentCompany || ""}
                    onChange={(e) => onFormDataChange("concurrentCompany", e.target.value)}
                    className="w-full"
                    disabled={formData.hasExternalConcurrentPosition === "없음"}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    겸직직위
                  </label>
                  <Input
                    type="text"
                    placeholder="겸직직위를 입력하세요"
                    value={formData.concurrentJobTitle || ""}
                    onChange={(e) => onFormDataChange("concurrentJobTitle", e.target.value)}
                    className="w-full"
                    disabled={formData.hasExternalConcurrentPosition === "없음"}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    겸직직책
                  </label>
                  <Input
                    type="text"
                    placeholder="겸직직책을 입력하세요"
                    value={formData.concurrentPosition || ""}
                    onChange={(e) => onFormDataChange("concurrentPosition", e.target.value)}
                    className="w-full"
                    disabled={formData.hasExternalConcurrentPosition === "없음"}
                  />
                </div>
              </div>
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <SaveButton 
                onClick={handleAdd}
                disabled={isLoading || disabled}
              >
                등록
              </SaveButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
