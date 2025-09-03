"use client";

import { useState } from 'react';
import { X, Download, Maximize2, Minimize2 } from 'lucide-react';
import SaveButton from '@/app/master/department/_components/SaveButton';
import ApprovalRequestButton from '@/app/master/department/_components/ApprovalRequestButton';
import ApproveButton from '@/app/master/department/_components/ApproveButton';
import RejectButton from '@/app/master/department/_components/RejectButton';

interface ImprovementImplementationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    managementActionCode: string;
    managementAction: string;
    responsibleDepartment: string;
    responsibleTeam: string;
    assignee: string;
    reviewer: string;
    responsibleExecutive: string;
    deficiency: string;
    improvementPlan: string;
    improvementPlanRegistrationDate: string;
    improvementImplementationResult: string;
    implementationResultDate: string;
    approvalStatus: string;
  } | null;
  mode: 'register' | 'approve'; // 'register': 등록용, 'approve': 승인용
}

export default function ImprovementImplementationModal({ isOpen, onClose, data, mode }: ImprovementImplementationModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    improvementPlan: '',
    improvementPlanRegistrationDate: '',
    improvementImplementationResult: '',
    implementationResultDate: '',
    remarks: ''
  });

  if (!isOpen || !data) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('저장:', formData);
    onClose();
  };

  const handleApprovalRequest = () => {
    console.log('승인요청:', formData);
    onClose();
  };

  const handleApprove = () => {
    console.log('승인:', formData);
    onClose();
  };

  const handleReject = () => {
    console.log('반려:', formData);
    onClose();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getModalTitle = () => {
    return mode === 'register' ? '미흡사항개선이행등록' : '미흡사항개선이행결재';
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
          <div className="flex justify-between items-center w-full relative z-50 border-b border-white/20 py-1 px-2 relative bg-white/10 backdrop-blur-md">
            <div className="flex items-center">
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleExpand}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40 flex items-center justify-center"
              >
                {isExpanded ? (
                  <Minimize2 className="h-5 w-5 text-white font-semibold" />
                ) : (
                  <Maximize2 className="h-5 w-5 text-white font-semibold" />
                )}
              </button>
              <button
                onClick={onClose}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40 flex items-center justify-center"
              >
                <X className="h-5 w-5 text-white font-semibold" />
              </button>
            </div>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* 제목 */}
          <div className="py-4 bg-[#f7f7f8] border-b border-gray-200">
            <div className="px-6 border-l-4 border-[#EC6437]">
              <h2 className="text-xl font-bold text-[#EC6437]">
                {getModalTitle()}
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
            {/* 1. 관리의무 및 조치 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">관리의무 및 조치</h3>
              <div className="border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">관리조치코드</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">{data.managementActionCode}</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">관리조치</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">{data.managementAction}</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">소관부서</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">{data.responsibleDepartment}</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">소관팀</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">{data.responsibleTeam}</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">담당자</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">{data.assignee}</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">리뷰어</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">{data.reviewer}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">담당임원</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">{data.responsibleExecutive}</div>
                </div>
              </div>
            </section>

            {/* 2. 미흡사항 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">미흡사항</h3>
              <div className="border border-gray-200 overflow-hidden">
                <div className="flex">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">미흡사항</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">{data.deficiency}</div>
                </div>
              </div>
            </section>

            {/* 3. 개선계획 등록 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">개선계획 등록</h3>
              <div className="border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">개선계획</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                    {mode === 'register' ? (
                      <textarea
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none" 
                        rows={4}
                        placeholder="개선계획을 입력하세요"
                        value={formData.improvementPlan}
                        onChange={(e) => handleInputChange('improvementPlan', e.target.value)}
                      ></textarea>
                    ) : (
                      data?.improvementPlan || '-'
                    )}
                  </div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">개선계획등록일</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                    {mode === 'register' ? (
                      <input
                        type="date"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        value={formData.improvementPlanRegistrationDate}
                        onChange={(e) => handleInputChange('improvementPlanRegistrationDate', e.target.value)}
                      />
                    ) : (
                      data?.improvementPlanRegistrationDate || '-'
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">첨부파일</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                    {mode === 'register' ? (
                      <input
                        type="file"
                        className="text-sm"
                        onChange={(e) => console.log('개선계획 파일 선택:', e.target.files)}
                      />
                    ) : (
                      '첨부파일이 등록되었습니다.'
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 4. 개선이행결과 등록 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">개선이행결과 등록</h3>
              <div className="border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">개선계획이행결과</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                    {mode === 'register' ? (
                      <textarea
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none" 
                        rows={4}
                        placeholder="개선계획이행결과를 입력하세요"
                        value={formData.improvementImplementationResult}
                        onChange={(e) => handleInputChange('improvementImplementationResult', e.target.value)}
                      ></textarea>
                    ) : (
                      data?.improvementImplementationResult || '-'
                    )}
                  </div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">이행결과작성일</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                    {mode === 'register' ? (
                      <input
                        type="date"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        value={formData.implementationResultDate}
                        onChange={(e) => handleInputChange('implementationResultDate', e.target.value)}
                      />
                    ) : (
                      data?.implementationResultDate || '-'
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">첨부파일</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                    {mode === 'register' ? (
                      <input
                        type="file"
                        className="text-sm"
                        onChange={(e) => console.log('개선이행결과 파일 선택:', e.target.files)}
                      />
                    ) : (
                      '첨부파일이 등록되었습니다.'
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 5. 이행결과결재의견 섹션 (승인용에서만 표시) */}
            {mode === 'approve' && (
              <section className="p-4 border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">이행결과결재의견</h3>
                <div className="border border-gray-200 overflow-hidden">
                  <div className="flex">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">결재의견</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                      <textarea
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none" 
                        rows={3}
                        placeholder="이행결과에 대한 결재의견을 입력하세요"
                        value={formData.remarks}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 액션 버튼 */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              {mode === 'register' ? (
                <>
                  <SaveButton 
                    onClick={handleSave}
                    disabled={false}
                  />
                  <ApprovalRequestButton 
                    onClick={handleApprovalRequest}
                    disabled={false}
                  />
                </>
              ) : (
                <>
                  <RejectButton 
                    onClick={handleReject}
                    disabled={false}
                  />
                  <ApproveButton 
                    onClick={handleApprove}
                    disabled={false}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
