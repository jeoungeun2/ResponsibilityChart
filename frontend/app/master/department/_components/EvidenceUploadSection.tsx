"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface EvidenceUploadSectionProps {
  className?: string;
}

export default function EvidenceUploadSection({ className = "" }: EvidenceUploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // 파일 선택 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  // 파일 제거 핸들러
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName("");
    // input 요소의 value를 초기화
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <section className={`p-4 bg-white ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        이사회 승인 증빙 업로드
      </h3>
      <div className="grid grid-cols-12 gap-4 items-end">
        <div className="col-span-12">
          <div className="relative">
            {selectedFile ? (
              // 파일이 선택된 경우: 파일명과 제거 버튼 표시
              <div className="flex items-center justify-between p-3 border border-gray-300">
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4 text-black" />
                  <span className="text-sm text-gray-700 truncate">{fileName}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              // 파일이 선택되지 않은 경우: 클릭 가능한 파일 선택 안내 영역
              <div 
                className="flex items-center justify-center p-6 border border-dashed border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-black mb-2" />
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
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
