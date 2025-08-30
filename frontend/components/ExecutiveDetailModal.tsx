"use client"

import { useState, useEffect } from 'react';
import { ExecutiveEvaluationData, getEvaluationStatusDisplay } from '@/data/executive-evaluation-data';

interface ExecutiveDetailModalProps {
  executive: ExecutiveEvaluationData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExecutiveDetailModal({ 
  executive, 
  isOpen, 
  onClose 
}: ExecutiveDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});

  // 모달이 열릴 때마다 편집 데이터 초기화
  useEffect(() => {
    if (executive) {
      setEditData({
        name: executive.name || '',
        jobTitle: executive.jobTitle || '',
        position: executive.position || '',
        managedOrganization: executive.managedOrganization || '',
        evaluationStatus: executive.evaluationStatus || '',
        evaluationCompletionDate: executive.evaluationCompletionDate || ''
      });
    }
  }, [executive]);

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
        managedOrganization: executive.managedOrganization || '',
        evaluationStatus: executive.evaluationStatus || '',
        evaluationCompletionDate: executive.evaluationCompletionDate || ''
      });
    }
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      // TODO: API 호출로 데이터 삭제
      onClose();
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">임원 평가 정보 상세</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-6">
          {/* 임원 정보 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">임원 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">성명</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.name || '-'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.jobTitle || '-'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.position || '-'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">관리대상 조직</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.managedOrganization}
                    onChange={(e) => handleInputChange('managedOrganization', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.managedOrganization || '-'}</div>
                )}
              </div>
            </div>
          </div>

          {/* 평가 정보 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">평가 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">평가 상태</label>
                {isEditing ? (
                  <select
                    value={editData.evaluationStatus}
                    onChange={(e) => handleInputChange('evaluationStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="completed">완료</option>
                    <option value="in-progress">진행중</option>
                    <option value="not-evaluated">미평가</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    {getStatusDisplay(executive.evaluationStatus)}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">평가 완료일자</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.evaluationCompletionDate || ''}
                    onChange={(e) => handleInputChange('evaluationCompletionDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    {executive.evaluationCompletionDate || '-'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 알림 정보 (있는 경우) */}
          {executive.notificationCount && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">알림 정보</h3>
              <div className="flex items-center space-x-2">
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {executive.notificationCount}
                </span>
                <span className="text-sm text-gray-600">개의 새로운 알림이 있습니다</span>
              </div>
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                수정
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
