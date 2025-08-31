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

interface AddDepartmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Record<string, any>;
  onFormDataChange: (field: string, value: any) => void;
  onAdd: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isEdit?: boolean;
}

export default function AddDepartmentForm({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  disabled = false,
  isEdit = false
}: AddDepartmentFormProps) {
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
                {isEdit ? '부서별 관리조치 수정등록' : '부서별 관리조치 신규등록'}
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
            {/* =============== 부문구분 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                부문구분
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    부문구분 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.division || "선택하세요"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("division", "ETF투자부문")}
                        className="cursor-pointer"
                      >
                        ETF투자부문
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("division", "감사실")}
                        className="cursor-pointer"
                      >
                        감사실
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("division", "경영관리부문")}
                        className="cursor-pointer"
                      >
                        경영관리부문
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("division", "공통")}
                        className="cursor-pointer"
                      >
                        공통
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>부문코드</label>
                  <Input 
                    type="text" 
                    value="조회 시 자동표시"
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed" 
                  />
                </div>
              </div>
            </section>

            {/* =============== 책무 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                책무
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="책무를 입력하세요"
                      value={formData.responsibility || ""}
                      onChange={(e) => onFormDataChange("responsibility", e.target.value)}
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
              </div>
            </section>

            {/* =============== 책무 세부 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                책무 세부
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무 세부내용 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="책무 세부내용을 입력하세요"
                      value={formData.detailContent || ""}
                      onChange={(e) => onFormDataChange("detailContent", e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>책무 세부코드</label>
                  <Input 
                    type="text" 
                    value="조회 시 자동표시"
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed" 
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
