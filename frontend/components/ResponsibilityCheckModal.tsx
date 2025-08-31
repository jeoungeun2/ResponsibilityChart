"use client";

import { useState } from 'react';
import { X, Download, Maximize2, Minimize2 } from 'lucide-react';
import SaveButton from '@/app/master/department/_components/SaveButton';
import ApprovalRequestButton from '@/app/master/department/_components/ApprovalRequestButton';
import ApproveButton from '@/app/master/department/_components/ApproveButton';
import RejectButton from '@/app/master/department/_components/RejectButton';


interface ResponsibilityCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    controlActivityCode: string;
    controlActivityName: string;
    controlActivity: string;
    responsibleDepartment: string;
    responsibleTeam: string;
    assignee: string;
    implementationDeadline: string;
    inspectionDate: string;
    implementationStatus: string;
    inspectionStatus: string;
    inspectionResult: string;
  } | null;
  actionType: 'inspect' | 'view'; // 'inspect': 점검하기, 'view': 상세보기
}

export default function ResponsibilityCheckModal({ isOpen, onClose, data, actionType }: ResponsibilityCheckModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    inspectionDate: '',
    inspectionResult: '',
    inspectionRemarks: '',
    implementationRemarks: ''
  });
  
  const [radioValues, setRadioValues] = useState({
    review1: '',
    review2: '',
    review3: ''
  });

  if (!isOpen || !data) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setRadioValues(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(`${name}: ${value}`);
  };

  const handleSubmit = () => {
    if (actionType === 'inspect') {
      console.log('점검 제출:', { ...data, ...formData });
      // 점검 제출 로직 구현
    } else {
      console.log('상세보기:', data);
      // 상세보기 로직 구현
    }
    onClose();
  };

  const getModalTitle = () => {
    return actionType === 'inspect' ? '책무 점검' : '책무 상세보기';
  };

  const getSubmitButtonText = () => {
    return actionType === 'inspect' ? '점검 제출' : '확인';
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
                {getModalTitle()}
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
                         {/* 1. 책무 정보 섹션 */}
             <section className="p-4 border-b border-gray-200 pb-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">책무 정보</h3>
               <div className="border border-gray-200 overflow-hidden">
                                   <div className="flex border-b border-gray-300 last:border-b-0">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무구분</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">책무</div>
                  </div>
                  <div className="flex border-b border-gray-300 last:border-b-0">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">책무구조도의 마련·관리 업무와 관련된 책무</div>
                  </div>
                  <div className="flex border-b border-gray-300 last:border-b-0">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무세부코드</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">CE-지정책임-A1-A</div>
                  </div>
                  <div className="flex border-b border-gray-300 last:border-b-0">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무세부내용</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제등의 최종 책임자로서 총괄적인 관리조치 운영 책임</div>
                  </div>
               </div>
             </section>

            {/* 2. 관리의무 및 조치 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">관리의무 및 조치</h3>
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
                 <div className="flex">
                   <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">관리조치유형</div>
                   <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">기준마련 여부 점검, 기준의 효과적 집행·운영 여부 점검</div>
                </div>
              </div>
            </section>

                        {/* 3. 통제활동 및 증빙 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">통제활동 및 증빙</h3>
              <div className="border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">통제활동코드</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">CE-지정책임-A1-A-001</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">통제활동명</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제기준등의 제·개폐(안) 마련</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">통제활동</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">직무와 관련된 내부통제등의 효과적으로 전행할 수 있도록 소관부서 내부통제기준 마련</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">수행주기</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">발생시</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">담당부서</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">대표이사</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">담당팀</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">준법감시실</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">담당자</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">김동제</div>
                </div>
                <div className="flex border-b border-gray-300 last:border-b-0">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">증빙</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제기준등의 제·개폐(안), 내부통제기준 점토</div>
                </div>
                                 <div className="flex border-b border-gray-300 last:border-b-0">
                   <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">증빙업로드</div>
                   <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                     <div className="space-y-2 w-full">
                                                                        <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border border-[#EC6437]">
                                                      <div className="flex items-center space-x-2">
                              <img src="/images/folder.png" alt="폴더" className="w-4 h-4" />
                                                            <span className="text-sm font-medium text-gray-900">내부통제기준등의 제·개폐(안) 파일.pdf</span>
                            </div>
                           <button className="text-[#EC6437] hover:text-[#d45a2f] text-sm flex items-center space-x-1 cursor-pointer">
                             <Download className="w-4 h-4" />
                             <span>다운로드</span>
                           </button>
                         </div>
                                                 <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border border-[#EC6437]">
                                                      <div className="flex items-center space-x-2">
                              <img src="/images/folder.png" alt="폴더" className="w-4 h-4" />
                                                            <span className="text-sm font-medium text-gray-900">내부통제기준등의 제·개폐(안) 검토내용 파일.pdf</span>
                            </div>
                           <button className="text-[#EC6437] hover:text-[#d45a2f] text-sm flex items-center space-x-1 cursor-pointer">
                             <Download className="w-4 h-4" />
                             <span>다운로드</span>
                           </button>
                         </div>
                     </div>
                   </div>
                 </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">비고</div>
                  <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">내부통제기준 제/개폐(안) 및 검토내용 파일 첨부하였습니다.</div>
                </div>
              </div>
            </section>

            {/* 5. 이행점검 검토항목 섹션 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">이행점검 검토항목</h3>
              <div className="space-y-4">
                                 <div className="space-y-3">
                   <div className="flex items-start space-x-4">
                     <div className="flex-1">
                                               <label className="block text-sm font-medium text-gray-700 mb-2">
                          1. 금융관계법령 제/개정시 내부통제기준 및 위험관리기준 반영이 적정한가
                        </label>
                                               <div className="flex items-center space-x-4">
                                                     <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review1" 
                               value="Y" 
                               checked={radioValues.review1 === 'Y'}
                               onChange={(e) => handleRadioChange('review1', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">Y</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review1" 
                               value="N" 
                               checked={radioValues.review1 === 'N'}
                               onChange={(e) => handleRadioChange('review1', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">N</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review1" 
                               value="N/A" 
                               checked={radioValues.review1 === 'N/A'}
                               onChange={(e) => handleRadioChange('review1', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">N/A</span>
                           </label>
                        </div>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-3">
                   <div className="flex items-start space-x-4">
                     <div className="flex-1">
                                               <label className="block text-sm font-medium text-gray-700 mb-2">
                          2. 내부통제기준 및 위험관리기준 위반사항에 대한 조치 요구사항 및 결과에 대하여 점검을 수행하였는가
                        </label>
                                               <div className="flex items-center space-x-4">
                                                     <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review2" 
                               value="Y" 
                               checked={radioValues.review2 === 'Y'}
                               onChange={(e) => handleRadioChange('review2', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">Y</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review2" 
                               value="N" 
                               checked={radioValues.review2 === 'N'}
                               onChange={(e) => handleRadioChange('review2', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">N</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review2" 
                               value="N/A" 
                               checked={radioValues.review2 === 'N/A'}
                               onChange={(e) => handleRadioChange('review2', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">N/A</span>
                           </label>
                        </div>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-3">
                   <div className="flex items-start space-x-4">
                     <div className="flex-1">
                                               <label className="block text-sm font-medium text-gray-700 mb-2">
                          3. 금감원 지적 및 조치사항 이행 내역에 대하여 점검을 수행하였는가
                        </label>
                                               <div className="flex items-center space-x-4">
                                                     <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review3" 
                               value="Y" 
                               checked={radioValues.review3 === 'Y'}
                               onChange={(e) => handleRadioChange('review3', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">Y</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review3" 
                               value="N" 
                               checked={radioValues.review3 === 'N'}
                               onChange={(e) => handleRadioChange('review3', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">N</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input 
                               type="radio" 
                               name="review3" 
                               value="N/A" 
                               checked={radioValues.review3 === 'N/A'}
                               onChange={(e) => handleRadioChange('review3', e.target.value)}
                               className="text-blue-600 cursor-pointer" 
                             />
                             <span className="text-sm text-gray-700">N/A</span>
                           </label>
                        </div>
                     </div>
                   </div>
                 </div>
              </div>

                             {/* 의견작성 및 서명 섹션 */}
               <div className="mt-4">
                 <div className="border border-gray-200 overflow-hidden">
                                       <div className="flex border-b border-gray-300 last:border-b-0">
                      <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">의견작성</div>
                      <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                        2024년 연간 그룹 경영계획 등에서 상기 검토항목에 대해 점검하였음.
                      </div>
                    </div>
                                                           <div className="flex border-b border-gray-300 last:border-b-0">
                      <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">서명</div>
                      <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">대표이사 OOO</div>
                    </div>
                    <div className="flex">
                      <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">날짜</div>
                      <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">2023-12-20 AM10:00</div>
                    </div>
                 </div>
               </div>
            </section>

            {/* 점검 입력 필드 (점검하기 모드일 때만) */}
            {actionType === 'inspect' && (
              <section className="p-4 border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">점검 정보 입력</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">점검일자</label>
                    <input
                      type="date"
                      value={formData.inspectionDate}
                      onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">점검결과</label>
                    <select
                      value={formData.inspectionResult}
                      onChange={(e) => handleInputChange('inspectionResult', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">선택하세요</option>
                      <option value="적정">적정</option>
                      <option value="보완필요">보완필요</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">점검 비고</label>
                    <textarea
                      value={formData.inspectionRemarks}
                      onChange={(e) => handleInputChange('inspectionRemarks', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="점검 관련 추가 메모를 입력하세요..."
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">이행 비고</label>
                    <textarea
                      value={formData.implementationRemarks}
                      onChange={(e) => handleInputChange('implementationRemarks', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="이행 관련 추가 메모를 입력하세요..."
                    />
                  </div>
                </div>
              </section>
            )}

                                                   {/* 액션 버튼 */}
              <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
                <SaveButton 
                  onClick={() => console.log('저장')}
                  disabled={false}
                />
                <RejectButton 
                  onClick={() => console.log('반려')}
                  disabled={false}
                />
                <ApproveButton 
                  onClick={() => console.log('승인완료')}
                  disabled={false}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
