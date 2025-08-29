"use client"

import { useState, useEffect } from 'react';

interface ExecutiveDetailModalProps {
  executive: {
    id: string;
    name: string;
    position: string;
    jobTitle: string;
    employeeId: string;
    phoneNumber: string;
    email: string;
    managedOrganization: string;
    term: string;
  } | null;
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
        employeeId: executive.employeeId || '',
        position: executive.position || '',
        jobTitle: executive.jobTitle || '',
        phoneNumber: executive.phoneNumber || '',
        email: executive.email || '',
        managedOrganization: executive.managedOrganization || '',
        term: executive.term || ''
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
        employeeId: executive.employeeId || '',
        position: executive.position || '',
        jobTitle: executive.jobTitle || '',
        phoneNumber: executive.phoneNumber || '',
        email: executive.email || '',
        managedOrganization: executive.managedOrganization || '',
        term: executive.term || ''
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">임원정보 상세</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-6">
          {/* 임원등록 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">임원등록</h3>
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
                    value={editData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.position || '-'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.employeeId || '-'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.phoneNumber || '-'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.email || '-'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">관리대상조직</label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">임기</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.term}
                    onChange={(e) => handleInputChange('term', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{executive.term || '-'}</div>
                )}
              </div>
            </div>
          </div>
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
