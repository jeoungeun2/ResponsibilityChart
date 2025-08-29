"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    inspectionDate: '',
    inspectionResult: '',
    inspectionRemarks: '',
    implementationRemarks: ''
  });

  if (!isOpen || !data) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">{getModalTitle()}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-6">
          {/* 기본 정보 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">기본 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">통제활동코드</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.controlActivityCode}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">통제활동명</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.controlActivityName}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">통제활동</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.controlActivity}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">담당부서</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.responsibleDepartment}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">담당팀</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.responsibleTeam}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.assignee}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이행기한</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.implementationDeadline}
                </div>
              </div>
            </div>
          </div>

          {/* 현재 상태 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">현재 상태</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이행상태</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.implementationStatus}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">점검상태</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.inspectionStatus}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">점검결과</label>
                <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-900">
                  {data.inspectionResult}
                </div>
              </div>
            </div>
          </div>

          {/* 점검 입력 필드 (점검하기 모드일 때만) */}
          {actionType === 'inspect' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">점검 정보 입력</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    점검일자 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.inspectionDate}
                    onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    점검결과 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.inspectionResult}
                    onChange={(e) => handleInputChange('inspectionResult', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
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
            </div>
          )}
        </div>

        {/* 푸터 버튼 */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {getSubmitButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}
