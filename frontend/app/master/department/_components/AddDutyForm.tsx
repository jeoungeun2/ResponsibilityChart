"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Maximize2, Minimize2, X } from 'lucide-react';
import AddButton from '@/components/ui/add-button';
import DeleteButton from '@/components/ui/delete-button';
import SaveButton from './SaveButton';
import ApprovalRequestButton from './ApprovalRequestButton';
import ApproveButton from './ApproveButton';
import RejectButton from './RejectButton';
import EvidenceUploadSection from './EvidenceUploadSection';
import ResponsibilityUsageCheck from './ResponsibilityUsageCheck';

interface AddDutyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Record<string, any>;
  onFormDataChange: (field: string, value: any) => void;
  onAdd: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  mode?: 'add' | 'edit';
}

export default function AddDutyForm({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  disabled = false,
  mode = 'add'
}: AddDutyFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 가변 필드 상태
  const [dutyDetails, setDutyDetails] = useState<string[]>([
    "내부통제기준마련, 업무절차 수립 등에 대한 관리감독",
  ]);
  const [relatedLaws, setRelatedLaws] = useState<
    Array<{ law: string; article: string }>
  >([{ law: "", article: "" }]);
  const [internalRegulations, setInternalRegulations] = useState<
    Array<{ regulation: string; article: string }>
  >([{ regulation: "", article: "" }]);

  // 사용여부 상태
  const [usageStatus, setUsageStatus] = useState<string>("Y");

  const labelCls = "block text-base font-medium text-gray-600 mb-1";

  // 책무 세부
  const addDutyDetail = () => setDutyDetails((prev) => [...prev, ""]);
  const removeDutyDetail = (index: number) =>
    setDutyDetails((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  const updateDutyDetail = (index: number, value: string) =>
    setDutyDetails((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

  // 법령
  const addRelatedLaw = () => setRelatedLaws((p) => [...p, { law: "", article: "" }]);
  const removeRelatedLaw = (index: number) =>
    setRelatedLaws((p) => (p.length > 1 ? p.filter((_, i) => i !== index) : p));
  const updateRelatedLaw = (index: number, field: "law" | "article", value: string) =>
    setRelatedLaws((p) => {
      const next = [...p];
      next[index] = { ...next[index], [field]: value };
      return next;
    });

  // 내규
  const addInternalRegulation = () =>
    setInternalRegulations((p) => [...p, { regulation: "", article: "" }]);
  const removeInternalRegulation = (index: number) =>
    setInternalRegulations((p) => (p.length > 1 ? p.filter((_, i) => i !== index) : p));
  const updateInternalRegulation = (
    index: number,
    field: "regulation" | "article",
    value: string
  ) =>
    setInternalRegulations((p) => {
      const next = [...p];
      next[index] = { ...next[index], [field]: value };
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 ">
   
      <div 
        className={`border border-warm-grey-600/50    shadow-2xl transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh] ' 
            : ' max-w-3xl max-h-[85vh] w-[80vw] h-[85vh]'
        } flex flex-col`}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center  flex-shrink-0">
      
          
          {/* 헤더 내용 */}
          <div className="flex justify-between  items-center w-full relative z-50 border-b border-white/20 py-1 px-2 relative bg-white/10 backdrop-blur-md ">
            <div className="flex items-center">
            </div>
            <div className="flex items-center gap-2 ">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40 "
              >
                {isExpanded ? (
                  <Minimize2 className="h-5 w-5  text-white font-semibold" />
                ) : (
                  <Maximize2 className="h-5 w-5  text-white font-semibold" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40 "
              >
                <X className="h-5 w-5 text-white font-semibold" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto bg-white ">

  {/* =============== 제목 =============== */}
            <div className=" py-4 bg-[#f7f7f8] border-b border-gray-200">
              <div className="px-6 border-l-4 border-[#EC6437]">
              <h2 className="text-xl font-bold text-[#EC6437]">
                {mode === 'edit' ? '책무 수정' : '책무 신규 등록'}
              </h2>
              </div>
            </div>
            


          <div className="space-y-2 bg-white px-2">
          
            {/* =============== 책무 등록/수정 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {mode === 'edit' ? '책무 수정' : '책무 등록'}
              </h3>

              <div className="grid grid-cols-12 gap-4">
                {/* 책무구분 */}
                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>
                    책무구분 <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.dutyClassification ?? "지정책임"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("dutyClassification", "지정책임")}
                        className="cursor-pointer"
                      >
                        지정책임
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("dutyClassification", "경영관리")}
                        className="cursor-pointer"
                      >
                        경영관리
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("dutyClassification", "금융")}
                        className="cursor-pointer"
                      >
                        금융
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* 책무명 */}
                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>
                    책무명 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="준법감시업무와 관련된 내부통제등의 점검 및 운영에 대한 책임"
                    value={formData.dutyName || ""}
                    onChange={(e) => onFormDataChange("dutyName", e.target.value)}
                  />
                </div>

                {/* 책무코드 */}
                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>책무코드</label>
                  <Input type="text" placeholder="*승인 클릭 시 자동생성" readOnly className="bg-muted cursor-not-allowed" />
                </div>
              </div>
            </section>

            {/* =============== 책무 세부내용 등록/수정 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {mode === 'edit' ? '책무 세부내용 수정' : '책무 세부내용 등록'}
                </h3>
                <AddButton
                  onClick={addDutyDetail}
                >
                 
                </AddButton>
              </div>

              <div className="space-y-2">
                {dutyDetails.map((detail, idx) => (
                  <div
                    key={`detail-${idx}`}
                    className="grid grid-cols-12 gap-4 items-start rounded-xl"
                  >
                    <div className="col-span-12 lg:col-span-8">
                      <label className={labelCls}>책무세부 {idx + 1}</label>
                      <Input
                        type="text"
                        placeholder="책무 세부내용을 입력하세요"
                        value={detail}
                        onChange={(e) => updateDutyDetail(idx, e.target.value)}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className={labelCls}>책무세부코드</label>
                      <div className="flex items-center w-full">
                        <Input
                          type="text"
                          placeholder="*승인 클릭 시 자동생성"
                          readOnly
                          className="bg-muted cursor-not-allowed flex-1"
                        />
                        <DeleteButton
                          onClick={() => {
                            if (dutyDetails.length > 1) {
                              removeDutyDetail(idx);
                            } else {
                              // If only one item, clear the content instead of removing
                              updateDutyDetail(idx, "");
                            }
                          }}
                          size="md"
                          className="ml-1"
                          ariaLabel="세부 삭제"
                        />
                      </div>
                    </div>
                  </div>
                ))}


              </div>
            </section>

            {/* =============== 조직 Mapping =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                조직 Mapping
              </h3>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <label className={labelCls}>관리대상조직</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {formData.managedOrganization ?? "전체"}
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
                        onClick={() => onFormDataChange("managedOrganization", "본사")}
                        className="cursor-pointer"
                      >
                        본사
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onFormDataChange("managedOrganization", "지점")}
                        className="cursor-pointer"
                      >
                        지점
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
                          {formData.responsibleDepartment ?? "전체"}
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
                          {formData.responsibleTeam ?? "전체"}
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

            {/* =============== 관련 법령 및 내규 Mapping =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                관련 법령 및 내규 Mapping
              </h3>

              <div className="grid grid-cols-12 gap-6">
                {/* 왼쪽 열: 관련 법령 */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-end justify-between mb-2">
                    <h4 className="text-base font-medium text-gray-700">관련 법령</h4>
                    <AddButton
                      onClick={addRelatedLaw}
                      iconOnly={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {relatedLaws.map((law, idx) => (
                      <div key={`law-${idx}`} className="space-y-3">
                        <div className="flex items-center">
                          <Input
                            type="text"
                            placeholder="법령명을 입력하세요"
                            value={law.law}
                            onChange={(e) => updateRelatedLaw(idx, "law", e.target.value)}
                            className="flex-1"
                          />
                          <DeleteButton
                            onClick={() => removeRelatedLaw(idx)}
                            size="md"
                            className="ml-1"
                            ariaLabel="법령 삭제"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 오른쪽 열: 내규 */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-end justify-between mb-2">
                    <h4 className="text-base font-medium text-gray-700">내규</h4>
                    <AddButton
                      onClick={addInternalRegulation}
                      iconOnly={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {internalRegulations.map((r, idx) => (
                      <div key={`reg-${idx}`} className="space-y-3">
                        <div className="flex ">
                          <Input
                            type="text"
                            placeholder="내규명을 입력하세요"
                            value={r.regulation}
                            onChange={(e) => updateInternalRegulation(idx, "regulation", e.target.value)}
                            className="flex-1"
                          />
                          <DeleteButton
                            onClick={() => removeInternalRegulation(idx)}
                            size="md"
                            className="ml-1"
                            ariaLabel="내규 삭제"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* =============== 이사회 승인 증빙 업로드 / 책무 사용여부 체크 =============== */}
            {mode === 'edit' ? (
              <ResponsibilityUsageCheck
                usageStatus={usageStatus}
                onUsageStatusChange={setUsageStatus}
              />
            ) : (
              <EvidenceUploadSection />
            )}

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <SaveButton 
                onClick={() => console.log('저장')}
                disabled={isLoading}
              />
              <ApprovalRequestButton 
                onClick={() => console.log('승인요청')}
                disabled={isLoading || disabled}
              />
              <ApproveButton 
                onClick={() => console.log('승인')}
                disabled={isLoading}
              />
              <RejectButton 
                onClick={() => console.log('반려')}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
