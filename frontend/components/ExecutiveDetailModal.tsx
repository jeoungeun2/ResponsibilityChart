"use client"

import { useState, useEffect } from 'react';
import { ExecutiveEvaluationData, getEvaluationStatusDisplay } from '@/data/executive-evaluation-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Maximize2, Minimize2, X } from 'lucide-react';

interface ExecutiveDetailModalProps {
  executive: ExecutiveEvaluationData | null;
  isOpen: boolean;
  onClose: () => void;
  initialEditMode?: boolean;
}

export default function ExecutiveDetailModal({ 
  executive, 
  isOpen, 
  onClose,
  initialEditMode = false
}: ExecutiveDetailModalProps) {
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [editData, setEditData] = useState<any>({});
  const [isExpanded, setIsExpanded] = useState(false);

  // 모달이 열릴 때마다 편집 데이터 초기화
  useEffect(() => {
    if (executive) {
      setEditData({
        name: executive.name || '',
        jobTitle: executive.jobTitle || '',
        position: executive.position || '',
        evaluationStatus: executive.evaluationStatus || '',
        evaluationCompletionDate: executive.evaluationCompletionDate || '',
        evaluationResult: executive.evaluationResult || '',
        judgmentReason: executive.judgmentReason || '',
        supportingDocuments: executive.supportingDocuments || [],
        selectedFile: '',
        fileName: ''
      });
    }
  }, [executive]);

  // initialEditMode가 변경될 때 isEditing 상태 업데이트
  useEffect(() => {
    setIsEditing(initialEditMode);
  }, [initialEditMode]);

  if (!isOpen || !executive) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: API 호출로 데이터 저장
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 원본 데이터로 복원
    if (executive) {
      setEditData({
        name: executive.name || '',
        jobTitle: executive.jobTitle || '',
        position: executive.position || '',
        evaluationStatus: executive.evaluationStatus || '',
        evaluationCompletionDate: executive.evaluationCompletionDate || '',
        evaluationResult: executive.evaluationResult || '',
        judgmentReason: executive.judgmentReason || '',
        supportingDocuments: executive.supportingDocuments || [],
        selectedFile: '',
        fileName: ''
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusDisplay = (status: string) => {
    const statusDisplay = getEvaluationStatusDisplay(status as any);
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusDisplay.color}`}>
        {statusDisplay.label}
      </span>
    );
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div 
        className={`border border-warm-grey-600/50 shadow-2xl transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-w-[85vw] max-h-[95vh] w-[85vw] h-[95vh]' 
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
                onClick={onClose}
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
                임원평가정보 상세
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
                         {/* =============== 임원 정보 =============== */}
             <section className="p-4 border-b border-gray-200 pb-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">임원 정보</h3>
                               <div className="border border-gray-200 overflow-hidden">
                  {/* 헤더 행 */}
                  <div className="grid grid-cols-3 border-b border-gray-300">
                    <div className="text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">성명</div>
                    <div className="text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center border-l border-gray-300">직책</div>
                    <div className="text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center border-l border-gray-300">직위</div>
                  </div>
                                     {/* 내용 행 */}
                   <div className="grid grid-cols-3">
                     <div className="px-4 py-1.5 text-gray-800 flex items-center text-[14px]">
                       {isEditing ? (
                         <Input
                           type="text"
                           value={editData.name}
                           onChange={(e) => handleInputChange('name', e.target.value)}
                           className="w-full h-8 text-[14px]"
                         />
                       ) : (
                         <span>{executive.name || '-'}</span>
                       )}
                     </div>
                     <div className="px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                       {isEditing ? (
                         <Input
                           type="text"
                           value={editData.jobTitle}
                           onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                           className="w-full h-8 text-[14px]"
                         />
                       ) : (
                         <span>{executive.jobTitle || '-'}</span>
                       )}
                     </div>
                     <div className="px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                       {isEditing ? (
                         <Input
                           type="text"
                           value={editData.position}
                           onChange={(e) => handleInputChange('position', e.target.value)}
                           className="w-full h-8 text-[14px]"
                         />
                       ) : (
                         <span>{executive.position || '-'}</span>
                       )}
                     </div>
                   </div>
                </div>
             </section>

            

                         {/* =============== 평가결과 =============== */}
             <section className="p-4 border-b border-gray-200 pb-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">
                 평가결과
               </h3>
               
               {/* 평가결과 */}
               <div className="mb-6">
                 <label className="block text-base font-medium text-gray-600 mb-2">평가결과</label>
                 {isEditing ? (
                   <Input
                     value={editData.evaluationResult || ''}
                     onChange={(e) => handleInputChange('evaluationResult', e.target.value)}
                     placeholder="평가결과를 입력하세요"
                   />
                 ) : (
                   <div className="px-3 py-2 bg-gray-50">
                     {executive.evaluationResult || '평가결과가 입력되지 않았습니다.'}
                   </div>
                 )}
               </div>

               {/* 판단사유 */}
               <div className="mb-6">
                 <label className="block text-base font-medium text-gray-600 mb-2">판단사유</label>
                 {isEditing ? (
                   <Textarea
                     value={editData.judgmentReason || ''}
                     onChange={(e) => handleInputChange('judgmentReason', e.target.value)}
                     placeholder="판단사유를 입력하세요"
                   />
                 ) : (
                   <div className="px-3 py-2 bg-gray-50 min-h-[120px]">
                     {executive.judgmentReason || '판단사유가 입력되지 않았습니다.'}
                   </div>
                 )}
               </div>

                               {/* 증빙서류 업로드 */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">증빙서류 업로드</label>
                  {isEditing ? (
                    // 수정 모드: 기존 증빙서류 리스트 + 새 파일 업로드
                    <div className="space-y-4">
                      {/* 기존 증빙서류 리스트 */}
                      {editData.supportingDocuments && editData.supportingDocuments.length > 0 && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-600">기존 증빙서류</label>
                          <div className="space-y-2">
                            {editData.supportingDocuments.map((doc: string, index: number) => (
                              <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-100 border border-[#EC6437]">
                                <div className="flex items-center space-x-2">
                                  <img src="/images/folder.png" alt="폴더" className="w-4 h-4" />
                                  <span className="text-sm font-medium text-gray-900">{doc}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button className="text-[#EC6437] hover:text-[#d45a2f] text-sm flex items-center space-x-1 cursor-pointer">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>다운로드</span>
                                  </button>
                                                                     <button
                                     type="button"
                                     onClick={() => {
                                       const newDocs = editData.supportingDocuments.filter((_: string, i: number) => i !== index);
                                       handleInputChange('supportingDocuments', newDocs);
                                     }}
                                     className="text-red-500 hover:text-red-700 text-sm flex items-center justify-center w-6 h-6"
                                   >
                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                     </svg>
                                   </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* 새 파일 업로드 */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-600">새 파일 추가</label>
                        <div className="relative">
                          {editData.selectedFile ? (
                            // 파일이 선택된 경우: 파일명과 제거 버튼 표시
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border border-[#EC6437]">
                              <div className="flex items-center space-x-2">
                                <img src="/images/folder.png" alt="폴더" className="w-4 h-4" />
                                <span className="text-sm font-medium text-gray-900 truncate">{editData.fileName}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleInputChange('selectedFile', '')}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                제거
                              </button>
                            </div>
                          ) : (
                            // 파일이 선택되지 않은 경우: 클릭 가능한 파일 선택 안내 영역
                            <div 
                              className="flex items-center justify-center p-6 border border-dashed border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                              onClick={() => document.getElementById('file-upload')?.click()}
                            >
                              <div className="text-center">
                                <svg className="mx-auto h-8 w-8 text-black mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-sm font-semibold text-gray-600">
                                  파일을 <span className="text-brand-500">선택하거나 여기로 드래그</span>하세요
                                </p>
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                  (PDF, DOC, XLS, 이미지 파일 등)
                                </p>
                              </div>
                            </div>
                          )}
                          {/* 숨겨진 파일 입력 필드 */}
                          <input
                            id="file-upload"
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleInputChange('selectedFile', file.name);
                                handleInputChange('fileName', file.name);
                              }
                            }}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // 읽기 모드: 업로드된 증빙서류만 표시
                    <div className="space-y-2">
                      {executive.supportingDocuments && executive.supportingDocuments.length > 0 ? (
                        <div className="space-y-2">
                          {executive.supportingDocuments.map((doc: string, index: number) => (
                            <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-100 border border-[#EC6437]">
                              <div className="flex items-center space-x-2">
                                <img src="/images/folder.png" alt="폴더" className="w-4 h-4" />
                                <span className="text-sm font-medium text-gray-900">{doc}</span>
                              </div>
                              <button className="text-[#EC6437] hover:text-[#d45a2f] text-sm flex items-center space-x-1 cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>다운로드</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-3 py-2 bg-gray-50 text-gray-500 text-sm">
                          업로드된 증빙서류가 없습니다.
                        </div>
                      )}
                    </div>
                  )}
                </div>
             </section>

           

                                                   {/* =============== 액션 버튼 =============== */}
              <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
                {isEditing ? (
                  <>
                                         <button
                       onClick={handleSave}
                       className="py-1.5 w-21 text-sm font-semibold bg-white text-blue-800 border border-blue-800 hover:bg-blue-50 hover:text-blue-800 cursor-pointer"
                     >
                       저장
                     </button>
                     <button
                       onClick={handleCancel}
                       className="py-1.5 w-21 text-sm font-semibold bg-white text-gray-600 border border-gray-600 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
                     >
                       취소
                     </button>
                  </>
                ) : (
                  // initialEditMode가 true일 때는 수정 버튼을 보여주지 않음
                  !initialEditMode && (
                                         <button
                       onClick={handleEdit}
                       className="py-1.5 w-21 text-sm font-semibold bg-white text-blue-800 border border-blue-800 hover:bg-blue-50 hover:text-blue-800 cursor-pointer"
                     >
                       수정
                     </button>
                  )
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
