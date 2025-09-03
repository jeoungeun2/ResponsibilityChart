"use client";

import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Maximize2, Minimize2, X } from 'lucide-react';
import AddButton from '@/components/ui/add-button';
import DeleteButton from '@/components/ui/delete-button';

import EvidenceUploadSection from './EvidenceUploadSection';


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
  
  // 각 책무세부내용별 관련법령 및 내규 상태
  const [detailRelatedLaws, setDetailRelatedLaws] = useState<
    Array<Array<{ law: string; article: string }>>
  >([[{ law: "", article: "" }]]);
  const [detailInternalRegulations, setDetailInternalRegulations] = useState<
    Array<Array<{ regulation: string; article: string }>>
  >([[{ regulation: "", article: "" }]]);
  const [detailManagementObligations, setDetailManagementObligations] = useState<
    Array<Array<string>>
  >([[""]]);
  
  // 각 책무세부내용별 위험도평가 상태
  const [detailRiskLevels, setDetailRiskLevels] = useState<Array<string>>([""]);

  // 사용여부 상태
  const [usageStatus, setUsageStatus] = useState<string>("Y");
  
  // 이사회승인증빙 업로드 상태
  const [boardResolutionFiles, setBoardResolutionFiles] = useState<File[]>([]);

  const labelCls = "block text-base font-medium text-gray-600 mb-1";

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (mode === 'edit' && formData) {
      // 책무세부내용 로드
      if (formData.dutyDetails && Array.isArray(formData.dutyDetails)) {
        setDutyDetails(formData.dutyDetails);
      }
      
      // 관련법령 로드
      if (formData.relatedLaws && Array.isArray(formData.relatedLaws)) {
        setDetailRelatedLaws(formData.relatedLaws);
      }
      
      // 내규 로드
      if (formData.internalRegulations && Array.isArray(formData.internalRegulations)) {
        setDetailInternalRegulations(formData.internalRegulations);
      }
      
      // 관리의무 로드
      if (formData.managementObligations && Array.isArray(formData.managementObligations)) {
        setDetailManagementObligations(formData.managementObligations);
      }
      
      // 위험도평가 로드
      if (formData.riskLevels && Array.isArray(formData.riskLevels)) {
        setDetailRiskLevels(formData.riskLevels);
      }
      
      // 사용여부 로드
      if (formData.usageStatus) {
        setUsageStatus(formData.usageStatus);
      }
    }
  }, [mode, formData]);

  // 책무 세부
  const addDutyDetail = () => {
    setDutyDetails((prev) => [...prev, ""]);
    setDetailRelatedLaws((prev) => [...prev, [{ law: "", article: "" }]]);
    setDetailInternalRegulations((prev) => [...prev, [{ regulation: "", article: "" }]]);
    setDetailManagementObligations((prev) => [...prev, [""]]);
    setDetailRiskLevels((prev) => [...prev, ""]);
  };
  
  const removeDutyDetail = (index: number) => {
    if (dutyDetails.length > 1) {
      setDutyDetails((prev) => prev.filter((_, i) => i !== index));
      setDetailRelatedLaws((prev) => prev.filter((_, i) => i !== index));
      setDetailInternalRegulations((prev) => prev.filter((_, i) => i !== index));
      setDetailManagementObligations((prev) => prev.filter((_, i) => i !== index));
      setDetailRiskLevels((prev) => prev.filter((_, i) => i !== index));
    } else {
      // If only one item, clear the content instead of removing
      updateDutyDetail(index, "");
    }
  };
  
  const updateDutyDetail = (index: number, value: string) =>
    setDutyDetails((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

  // 위험도평가 업데이트 함수
  const updateRiskLevel = (index: number, value: string) => {
    setDetailRiskLevels((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // 이사회승인증빙 파일 업로드 핸들러
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setBoardResolutionFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // 이사회승인증빙 파일 삭제 핸들러
  const handleFileRemove = (index: number) => {
    setBoardResolutionFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 각 책무세부내용별 관련법령 관리
  const getRelatedLawsForDetail = (detailIndex: number) => {
    return detailRelatedLaws[detailIndex] || [{ law: "", article: "" }];
  };

  const addRelatedLawForDetail = (detailIndex: number) => {
    setDetailRelatedLaws((prev) => {
      const next = [...prev];
      if (!next[detailIndex]) {
        next[detailIndex] = [];
      }
      next[detailIndex] = [...next[detailIndex], { law: "", article: "" }];
      return next;
    });
  };

  const removeRelatedLawForDetail = (detailIndex: number, lawIndex: number) => {
    setDetailRelatedLaws((prev) => {
      const next = [...prev];
      if (next[detailIndex] && next[detailIndex].length > 1) {
        next[detailIndex] = next[detailIndex].filter((_, i) => i !== lawIndex);
      }
      return next;
    });
  };

  const updateRelatedLawForDetail = (detailIndex: number, lawIndex: number, field: "law" | "article", value: string) => {
    setDetailRelatedLaws((prev) => {
      const next = [...prev];
      if (!next[detailIndex]) {
        next[detailIndex] = [{ law: "", article: "" }];
      }
      next[detailIndex] = [...next[detailIndex]];
      next[detailIndex][lawIndex] = { ...next[detailIndex][lawIndex], [field]: value };
      return next;
    });
  };

  // 각 책무세부내용별 내규 관리
  const getInternalRegulationsForDetail = (detailIndex: number) => {
    return detailInternalRegulations[detailIndex] || [{ regulation: "", article: "" }];
  };

  const addInternalRegulationForDetail = (detailIndex: number) => {
    setDetailInternalRegulations((prev) => {
      const next = [...prev];
      if (!next[detailIndex]) {
        next[detailIndex] = [];
      }
      next[detailIndex] = [...next[detailIndex], { regulation: "", article: "" }];
      return next;
    });
  };

  const removeInternalRegulationForDetail = (detailIndex: number, regIndex: number) => {
    setDetailInternalRegulations((prev) => {
      const next = [...prev];
      if (next[detailIndex] && next[detailIndex].length > 1) {
        next[detailIndex] = next[detailIndex].filter((_, i) => i !== regIndex);
      }
      return next;
    });
  };

  const updateInternalRegulationForDetail = (detailIndex: number, regIndex: number, field: "regulation" | "article", value: string) => {
    setDetailInternalRegulations((prev) => {
      const next = [...prev];
      if (!next[detailIndex]) {
        next[detailIndex] = [{ regulation: "", article: "" }];
      }
      next[detailIndex] = [...next[detailIndex]];
      next[detailIndex][regIndex] = { ...next[detailIndex][regIndex], [field]: value };
      return next;
    });
  };

  // 각 책무세부내용별 관리의무 관리
  const getManagementObligationsForDetail = (detailIndex: number) => {
    return detailManagementObligations[detailIndex] || [""];
  };

  const addManagementObligationForDetail = (detailIndex: number) => {
    setDetailManagementObligations((prev) => {
      const next = [...prev];
      if (!next[detailIndex]) {
        next[detailIndex] = [];
      }
      next[detailIndex] = [...next[detailIndex], ""];
      return next;
    });
  };

  const removeManagementObligationForDetail = (detailIndex: number, obligationIndex: number) => {
    setDetailManagementObligations((prev) => {
      const next = [...prev];
      if (next[detailIndex] && next[detailIndex].length > 1) {
        next[detailIndex] = next[detailIndex].filter((_, i) => i !== obligationIndex);
      }
      return next;
    });
  };

  const updateManagementObligationForDetail = (detailIndex: number, obligationIndex: number, value: string) => {
    setDetailManagementObligations((prev) => {
      const next = [...prev];
      if (!next[detailIndex]) {
        next[detailIndex] = [""];
      }
      next[detailIndex] = [...next[detailIndex]];
      next[detailIndex][obligationIndex] = value;
      return next;
    });
  };

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
                  <Input type="text" placeholder="*등록 클릭 시 자동생성" readOnly className="bg-muted cursor-not-allowed" />
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

              <div className="space-y-6">
                {dutyDetails.map((detail, idx) => (
                  <div
                    key={`detail-${idx}`}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    {/* 책무세부내용 입력 */}
                    <div className="grid grid-cols-12 gap-4 items-start mb-4">
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
                            placeholder="*등록 클릭 시 자동생성"
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

                    {/* 관련 법령 및 내규 Mapping */}
                    <div className="border-t border-gray-300 pt-4">
                      {/* 위험도평가 섹션 */}
                      <div className="mb-6">
                        <h4 className="text-base font-medium text-gray-700 mb-3">
                          위험도평가
                        </h4>
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 lg:col-span-6">
                            <label className={labelCls}>
                              위험도평가 <span className="text-red-500">*</span>
                            </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                                  className="w-full justify-between h-10 px-3 border-gray-200 hover:bg-gray-50"
                                >
                                  {detailRiskLevels[idx] || "위험도를 선택하세요"}
                                  <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-full">
                                <DropdownMenuItem onClick={() => updateRiskLevel(idx, "고위험")}>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-red-100 text-red-700 border-red-200 mr-2">
                                    고위험
                                  </span>
                                  고위험
                      </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateRiskLevel(idx, "중위험")}>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-orange-100 text-orange-700 border-orange-200 mr-2">
                                    중위험
                        </span>
                                  중위험
                      </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateRiskLevel(idx, "저위험")}>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200 mr-2">
                                    저위험
                        </span>
                                  저위험
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
                      </div>

                      <h4 className="text-base font-medium text-gray-700 mb-3">
                관련 법령 및 내규 Mapping
                      </h4>

                      <div className="grid grid-cols-12 gap-4">
                {/* 왼쪽 열: 관련 법령 */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-end justify-between mb-2">
                            <h5 className="text-sm font-medium text-gray-600">관련 법령</h5>
                    <AddButton
                              onClick={() => addRelatedLawForDetail(idx)}
                      iconOnly={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                            {getRelatedLawsForDetail(idx).map((law, lawIdx) => (
                              <div key={`law-${idx}-${lawIdx}`} className="space-y-2">
                        <div className="flex items-center">
                          <Input
                            type="text"
                            placeholder="법령명을 입력하세요"
                            value={law.law}
                                    onChange={(e) => updateRelatedLawForDetail(idx, lawIdx, "law", e.target.value)}
                            className="flex-1"
                          />
                          <DeleteButton
                                    onClick={() => removeRelatedLawForDetail(idx, lawIdx)}
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
                            <h5 className="text-sm font-medium text-gray-600">내규</h5>
                    <AddButton
                              onClick={() => addInternalRegulationForDetail(idx)}
                      iconOnly={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                            {getInternalRegulationsForDetail(idx).map((reg, regIdx) => (
                              <div key={`reg-${idx}-${regIdx}`} className="space-y-2">
                                <div className="flex items-center">
                          <Input
                            type="text"
                            placeholder="내규명을 입력하세요"
                                    value={reg.regulation}
                                    onChange={(e) => updateInternalRegulationForDetail(idx, regIdx, "regulation", e.target.value)}
                            className="flex-1"
                          />
                          <DeleteButton
                                    onClick={() => removeInternalRegulationForDetail(idx, regIdx)}
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

                      {/* 관리의무 섹션 */}
                      <div className="border-t border-gray-300 pt-4 mt-4">
                        <div className="flex items-end justify-between mb-2">
                          <h5 className="text-sm font-medium text-gray-600">관리의무</h5>
                          <AddButton
                            onClick={() => addManagementObligationForDetail(idx)}
                            iconOnly={true}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          {getManagementObligationsForDetail(idx).map((obligation, obligationIdx) => (
                            <div key={`obligation-${idx}-${obligationIdx}`} className="space-y-2">
                              <div className="grid grid-cols-12 gap-4 items-start">
                                <div className="col-span-12 lg:col-span-8">
                                  <label className="block text-sm font-medium text-gray-600 mb-1">
                                    관리의무 {obligationIdx + 1}
                                  </label>
                                  <Input
                                    type="text"
                                    placeholder="관리의무를 입력하세요"
                                    value={obligation}
                                    onChange={(e) => updateManagementObligationForDetail(idx, obligationIdx, e.target.value)}
                                  />
                                </div>
                                <div className="col-span-12 lg:col-span-4">
                                  <label className="block text-sm font-medium text-gray-600 mb-1">
                                    관리의무코드
                                  </label>
                                  <div className="flex items-center w-full">
                                    <Input
                                      type="text"
                                      placeholder="*등록 클릭 시 자동생성"
                                      readOnly
                                      className="bg-muted cursor-not-allowed flex-1"
                                    />
                                    <DeleteButton
                                      onClick={() => removeManagementObligationForDetail(idx, obligationIdx)}
                                      size="md"
                                      className="ml-1"
                                      ariaLabel="관리의무 삭제"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>



            {/* =============== 이사회 승인 증빙 업로드 / 책무수정유형 =============== */}
            {mode === 'edit' ? (
              <section className="p-4 border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  책무수정유형
                </h3>

                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="simple-edit"
                          name="editType"
                          value="simple"
                          checked={formData.editType === "simple"}
                          onChange={(e) => onFormDataChange("editType", e.target.value)}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor="simple-edit" className="text-sm font-medium text-gray-700">
                          단순수정
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="board-resolution-edit"
                          name="editType"
                          value="boardResolution"
                          checked={formData.editType === "boardResolution"}
                          onChange={(e) => onFormDataChange("editType", e.target.value)}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor="board-resolution-edit" className="text-sm font-medium text-gray-700">
                          이사회결의 수정
                        </label>
                      </div>
                    </div>
                  </div>

                  {formData.editType === "boardResolution" && (
                    <div className="col-span-12 md:col-span-6">
                      <label className={labelCls}>
                        이사회결의일자 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="date"
                        value={formData.boardApprovalDate || ""}
                        onChange={(e) => onFormDataChange("boardApprovalDate", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                {/* 이사회승인증빙 업로드 섹션 */}
                {formData.editType === "boardResolution" && (
                  <div className="mt-6">
                    <h4 className="text-base font-medium text-gray-700 mb-3">
                      이사회승인증빙 업로드
                    </h4>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="mt-4">
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              파일을 선택하거나 드래그하여 업로드
                            </span>
                            <span className="mt-1 block text-sm text-gray-500">
                              PDF, DOC, DOCX, JPG, PNG 파일만 업로드 가능
                            </span>
                          </label>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="sr-only"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 업로드된 파일 목록 */}
                    {boardResolutionFiles.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">업로드된 파일</h5>
                        <div className="space-y-2">
                          {boardResolutionFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm text-gray-700">{file.name}</span>
                                <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                              </div>
                              <button
                                onClick={() => handleFileRemove(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            ) : (
              <EvidenceUploadSection />
            )}

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              {mode === 'add' ? (
                <Button 
                  onClick={handleAdd}
                disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                >
                  등록
                </Button>
              ) : (
                <Button 
                  onClick={() => console.log('등록')}
                disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                >
                  등록
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
