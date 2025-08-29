"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Plus, Maximize2, Minimize2, X } from 'lucide-react';

interface AddDutyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Record<string, any>;
  onFormDataChange: (field: string, value: any) => void;
  onAdd: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function AddDutyForm({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  disabled = false
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

  // 유틸: 공통 인풋 클래스
  const fieldCls =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 text-base";
  const roFieldCls =
    "w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed text-base";
  const labelCls = "block text-sm font-semibold text-gray-800 mb-2";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className={`bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh]' 
            : 'max-w-6xl max-h-[85vh] w-[90vw] h-[85vh]'
        } flex flex-col`}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">새 책무 추가</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpand}
              className="h-8 w-8 p-0"
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
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* =============== 책무 등록 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
                책무 등록
              </h3>

              <div className="grid grid-cols-12 gap-6">
                {/* 책무구분 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무구분 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.dutyClassification ?? "지정책임"}
                    onChange={(e) => onFormDataChange("dutyClassification", e.target.value)}
                    className={fieldCls}
                  >
                    <option value="지정책임">지정책임</option>
                    <option value="경영관리">경영관리</option>
                    <option value="금융">금융</option>
                  </select>
                </div>

                {/* 책무명 */}
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    책무명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={
                      formData.dutyName ??
                      "준법감시업무와 관련된 내부통제등의 점검 및 운영에 대한 책임"
                    }
                    onChange={(e) => onFormDataChange("dutyName", e.target.value)}
                    className={fieldCls}
                  />
                </div>

                {/* 책무코드 */}
                <div className="col-span-12">
                  <label className={labelCls}>책무코드</label>
                  <input type="text" placeholder="*승인 클릭 시 자동생성" readOnly className={roFieldCls} />
                </div>
              </div>
            </section>

            {/* =============== 책무 세부내용 등록 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 pb-3 border-b-2 border-blue-600 w-full">
                  책무 세부내용 등록
                </h3>
              </div>

              <div className="space-y-4">
                {dutyDetails.map((detail, idx) => (
                  <div
                    key={`detail-${idx}`}
                    className="grid grid-cols-12 gap-4 items-start rounded-xl"
                  >
                    <div className="col-span-12 lg:col-span-7">
                      <label className={labelCls}>책무세부 {idx + 1}</label>
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => updateDutyDetail(idx, e.target.value)}
                        className={fieldCls}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <label className={labelCls}>책무세부코드</label>
                      <input
                        type="text"
                        placeholder="*승인 클릭 시 자동생성"
                        readOnly
                        className={roFieldCls}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-1 flex lg:justify-end">
                      {dutyDetails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDutyDetail(idx)}
                          className="h-[46px] px-4 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50"
                          aria-label="세부 삭제"
                        >
                          −
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addDutyDetail}
                    className="px-5 h-[46px] bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                  >
                    책무 세부 추가
                  </button>
                </div>
              </div>
            </section>

            {/* =============== 조직 Mapping =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
                조직 Mapping
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
                    <option value="본사">본사</option>
                    <option value="지점">지점</option>
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
                    <option value="인사팀">인사팀</option>
                    <option value="재무팀">재무팀</option>
                  </select>
                </div>
              </div>
            </section>

            {/* =============== 관련 법령 및 내규 Mapping =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
                관련 법령 및 내규 Mapping
              </h3>

              {/* 관련 법령 */}
              <div className="mb-8">
                <h4 className="text-base font-semibold text-gray-900 mb-3">관련 법령</h4>
                <div className="space-y-4">
                  {relatedLaws.map((law, idx) => (
                    <div key={`law-${idx}`} className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-12 md:col-span-5">
                        <label className={labelCls}>법령명</label>
                        <input
                          type="text"
                          value={law.law}
                          onChange={(e) => updateRelatedLaw(idx, "law", e.target.value)}
                          className={fieldCls}
                        />
                      </div>
                      <div className="col-span-12 md:col-span-5">
                        <label className={labelCls}>조항</label>
                        <input
                          type="text"
                          value={law.article}
                          onChange={(e) => updateRelatedLaw(idx, "article", e.target.value)}
                          className={fieldCls}
                        />
                      </div>
                      <div className="col-span-12 md:col-span-2 flex md:justify-end">
                        {relatedLaws.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRelatedLaw(idx)}
                            className="h-[46px] px-4 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50"
                            aria-label="법령 삭제"
                          >
                            −
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={addRelatedLaw}
                      className="h-[46px] px-4 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 내규 */}
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-3">내규</h4>
                <div className="space-y-4">
                  {internalRegulations.map((r, idx) => (
                    <div key={`reg-${idx}`} className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-12 md:col-span-5">
                        <label className={labelCls}>내규명</label>
                        <input
                          type="text"
                          value={r.regulation}
                          onChange={(e) => updateInternalRegulation(idx, "regulation", e.target.value)}
                          className={fieldCls}
                        />
                      </div>
                      <div className="col-span-12 md:col-span-5">
                        <label className={labelCls}>조항</label>
                        <input
                          type="text"
                          value={r.article}
                          onChange={(e) => updateInternalRegulation(idx, "article", e.target.value)}
                          className={fieldCls}
                        />
                      </div>
                      <div className="col-span-12 md:col-span-2 flex md:justify-end">
                        {internalRegulations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInternalRegulation(idx)}
                            className="h-[46px] px-4 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50"
                            aria-label="내규 삭제"
                          >
                            −
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={addInternalRegulation}
                      className="h-[46px] px-4 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* =============== 이사회 승인 증빙 업로드 =============== */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
                이사회 승인 증빙 업로드
              </h3>
              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-12 md:col-span-9">
                  <label className={labelCls}>증빙 파일</label>
                  <input type="text" placeholder="파일을 업로드하세요" className={fieldCls} />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <label className="sr-only">파일찾기</label>
                  <button
                    type="button"
                    className="w-full h-[46px] bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                  >
                    파일찾기
                  </button>
                </div>
              </div>
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                취소
              </Button>
              <Button
                onClick={handleAdd}
                disabled={isLoading || disabled}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    추가 중...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    추가
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
