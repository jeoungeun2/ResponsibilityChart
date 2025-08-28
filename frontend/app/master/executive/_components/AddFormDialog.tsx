"use client"

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddFormDialogProps {
  // 폼 데이터
  formData: {
    name: string;
    employeeNo: string;
    positionLabel: string;
    titleLabel: string;
    phone: string;
    email: string;
    termStartDate: string;
    termEndDate: string;
  };
  // 폼 데이터 변경 핸들러
  onFormDataChange: (field: string, value: string) => void;
  // 추가 버튼 클릭 핸들러
  onAdd: () => void;
  // 로딩 상태
  isLoading?: boolean;
  // 이름 유효성 검사
  isNameValid?: boolean;
  // 다이얼로그 열기/닫기 상태
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddFormDialog({
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  isNameValid = true,
  open,
  onOpenChange
}: AddFormDialogProps) {
  const handleAdd = () => {
    onAdd();
    // 성공 시 다이얼로그 닫기
    if (isNameValid && !isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 임원 추가</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 폼 필드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름 <span className="text-red-500">*</span>
              </label>
                             <input
                 type="text"
                 placeholder="이름을 입력하세요"
                 value={formData.name}
                 onChange={(e) => onFormDataChange('name', e.target.value)}
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
                 required
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
                             <input
                 type="text"
                 placeholder="사번을 입력하세요"
                 value={formData.employeeNo}
                 onChange={(e) => onFormDataChange('employeeNo', e.target.value)}
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
                             <input
                 type="text"
                 placeholder="직위를 입력하세요"
                 value={formData.positionLabel}
                 onChange={(e) => onFormDataChange('positionLabel', e.target.value)}
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                             <input
                 type="text"
                 placeholder="직책을 입력하세요"
                 value={formData.titleLabel}
                 onChange={(e) => onFormDataChange('titleLabel', e.target.value)}
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                             <input
                 type="tel"
                 placeholder="연락처를 입력하세요"
                 value={formData.phone}
                 onChange={(e) => onFormDataChange('phone', e.target.value)}
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                             <input
                 type="email"
                 placeholder="이메일을 입력하세요"
                 value={formData.email}
                 onChange={(e) => onFormDataChange('email', e.target.value)}
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">재임시작일</label>
                             <input
                 type="date"
                 value={formData.termStartDate}
                 onChange={(e) => onFormDataChange('termStartDate', e.target.value)}
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">재임종료일</label>
                             <input
                 type="date"
                 value={formData.termEndDate}
                 onChange={(e) => onFormDataChange('termEndDate', e.target.value)}
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
               />
            </div>
          </div>
          
          {/* 버튼들 */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              취소
            </Button>
                         <Button
               onClick={handleAdd}
               disabled={isLoading || !isNameValid}
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
      </DialogContent>
    </Dialog>
  );
}
