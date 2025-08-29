"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">관리조치활동 수행</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-6">
          {/* 책무 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">책무</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">책무구분:</label>
                <span className="text-sm text-gray-900">{data.responsibilityType}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">책무세부코드:</label>
                <span className="text-sm text-gray-900">{data.responsibilityDetailCode}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">책무:</label>
                <span className="text-sm text-gray-900">{data.responsibility}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">책무세부내용:</label>
                <span className="text-sm text-gray-900">{data.responsibilityDetailContent}</span>
              </div>
            </div>
          </div>

          {/* 관리조치 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">관리조치</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">관리의무:</label>
                <span className="text-sm text-gray-900">{data.managementDuty}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">관리조치코드:</label>
                <span className="text-sm text-gray-900">{data.managementActionCode}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">관리조치:</label>
                <span className="text-sm text-gray-900">{data.managementAction}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">관리조치유형:</label>
                <span className="text-sm text-gray-900">{data.managementActionType}</span>
              </div>
            </div>
          </div>

          {/* 통제활동 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">통제활동</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">통제활동코드:</label>
                <span className="text-sm text-gray-900">{data.controlActivityCode}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">통제활동명:</label>
                <span className="text-sm text-gray-900">{data.controlActivityName}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">통제활동:</label>
                <span className="text-sm text-gray-900">{data.controlActivity}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">통제활동수행주기:</label>
                <span className="text-sm text-gray-900">{data.controlActivityCycle}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">담당부서:</label>
                <span className="text-sm text-gray-900">{data.responsibleDepartment}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">담당팀:</label>
                <span className="text-sm text-gray-900">{data.responsibleTeam}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">담당자:</label>
                <span className="text-sm text-gray-900">{data.responsiblePerson}</span>
              </div>
              <div className="flex">
                <label className="w-32 text-sm font-medium text-gray-700">증빙:</label>
                <span className="text-sm text-gray-900">{data.evidence}</span>
              </div>
            </div>
          </div>

          {/* 추가 입력 필드 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                증빙업로드
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비고
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="추가 메모를 입력하세요..."
              />
            </div>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            저장
          </button>
          <button
            onClick={handleRequestApproval}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            승인요청
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
