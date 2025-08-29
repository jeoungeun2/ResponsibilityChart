"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import AddDutyForm from '@/app/master/department/_components/AddDutyForm';

interface DutyModalCardProps {
  // 다이얼로그 열기/닫기 상태
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // 제목
  title: string;
  // 폼 데이터
  formData: Record<string, any>;
  // 폼 데이터 변경 핸들러
  onFormDataChange: (field: string, value: any) => void;
  // 추가 버튼 클릭 핸들러
  onAdd: () => void;
  // 로딩 상태
  isLoading?: boolean;
  // 추가 버튼 비활성화 여부
  disabled?: boolean;
}

export default function DutyModalCard({
  open,
  onOpenChange,
  title,
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  disabled = false
}: DutyModalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAdd = () => {
    onAdd();
    // 성공 시 다이얼로그 닫기
    if (!isLoading && !disabled) {
      onOpenChange(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh]' 
            : 'max-w-6xl max-h-[85vh] w-[90vw] h-[85vh]'
        } overflow-y-auto`}
      >
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>{title}</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpand}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </DialogHeader>
        
        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* AddDutyForm 직접 렌더링 */}
          <AddDutyForm
            formData={formData}
            onFormDataChange={onFormDataChange}
          />
          
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
              disabled={isLoading || disabled}
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
