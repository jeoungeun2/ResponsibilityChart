"use client";

import { useState } from 'react';
import { X, Download, Maximize2, Minimize2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SaveButton from '@/app/master/department/_components/SaveButton';
import ApprovalRequestButton from '@/app/master/department/_components/ApprovalRequestButton';

interface ControlActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    responsibilityType: string;
    responsibilityDetailCode: string;
    responsibility: string;
    responsibilityDetailContent: string;
    managementDuty: string;
    managementActionCode: string;
    managementAction: string;
    managementActionType: string;
    controlActivityCode: string;
    controlActivityName: string;
    controlActivity: string;
    controlActivityCycle: string;
    responsibleDepartment: string;
    responsibleTeam: string;
    responsiblePerson: string;
    evidence: string;
  } | null;
}

export default function ControlActivityModal({ isOpen, onClose, data }: ControlActivityModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [remarks, setRemarks] = useState('');


  if (!isOpen || !data) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    console.log('저장:', { evidenceFile, remarks });
    // 저장 로직 구현
  };

  const handleRequestApproval = () => {
    console.log('승인요청:', { evidenceFile, remarks });
    // 승인요청 로직 구현
  };

  const handleNoTarget = () => {
    console.log('대상없음:', { evidenceFile, remarks });
    // 대상없음 로직 구현
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
                관리조치 이행
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
            {/* 1. 책무구분 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">책무구분</h3>
              <div className="border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무구분</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">지정책임자</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무세부코드</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">CE-지정책임-A1-A</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">책무구조도의 마련·관리 업무와 관련된 책무</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무세부내용</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제등의 최종 책임자로서 총괄적인 관리조치 운영 책임</div>
                </div>
              </div>
            </section>

            {/* 2. 관리의무 및 관리조치 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">관리의무 및 관리조치</h3>
              <div className="border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">관리의무</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제등 정책·기본방침 및 전략의 집행·운영</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">관리조치코드</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">CE-지정책임-A1-A-001</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">관리조치</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제기준등의 제·개폐 사항을 검토하고 경영관리팀을 통해 이사회에 보고</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">관리조치유형</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">기준마련 여부 점검, 기준의 효과적 집행·운영 여부 점검</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">이행점검항목</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제기준 제·개폐 절차 준수 여부, 이사회 보고 절차 준수 여부</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">증빙</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제기준 제·개폐 관련 회의록, 이사회 보고서</div>
                </div>
              </div>
            </section>

            {/* 3. 증빙업로드 및 비고 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                관리조치 이행증빙 업로드
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">증빙업로드</label>
                  <div className="relative">
                    {evidenceFile ? (
                      // 파일이 선택된 경우: 파일명과 제거 버튼 표시
                      <div className="flex items-center justify-between p-3 border border-gray-300">
                        <div className="flex items-center space-x-2">
                          <Upload className="h-4 w-4 text-black" />
                          <span className="text-sm text-gray-700 truncate">{evidenceFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEvidenceFile(null)}
                          className="h-6 w-6 p-0 text-gray-500 hover:text-red-500 flex items-center justify-center"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      // 파일이 선택되지 않은 경우: 클릭 가능한 파일 선택 안내 영역
                      <div 
                        className="flex items-center justify-center p-6 border border-dashed border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('evidence-file-upload')?.click()}
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-black mb-2" />
                          <p className="text-sm font-semibold text-gray-600">
                            파일을 <span className="text-[#EC6437]">선택하거나 여기로 드래그</span>하세요
                          </p>
                          <p className="text-sm font-medium text-gray-500 mt-1">
                            (PDF, DOC, XLS, 이미지 파일 등)
                          </p>
                        </div>
                      </div>
                    )}
                    {/* 숨겨진 파일 입력 필드 */}
                    <input
                      id="evidence-file-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">비고</label>
                  <Textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                    className="block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="추가 메모를 입력하세요..."
                  />
                </div>
              </div>
            </section>

                         {/* 액션 버튼 */}
             <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
               <Button
                 variant="outline"
                 onClick={handleNoTarget}
                 className="py-1.5 w-21 text-sm font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 hover:text-gray-900 cursor-pointer"
               >
                 대상없음
               </Button>
               <SaveButton onClick={handleSave} />
               <ApprovalRequestButton onClick={handleRequestApproval} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
