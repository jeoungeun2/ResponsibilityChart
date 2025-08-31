import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  iconOnly?: boolean;
}

export default function AddButton({
  onClick,
  children,
  className = '',
  iconOnly = false
}: AddButtonProps) {
  // 기본 스타일 - 플러스 아이콘을 앞으로, 배경 제거, brand-gray-500 색상
  const baseClasses = 'py-1 px-2 text-sm border-brand-gray-500 border font-medium transition-colors flex items-center justify-between text-brand-gray-500 cursor-pointer hover:text-brand-gray-600 hover:border-brand-gray-600';
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      <Plus className="h-4 w-4 mr-1 text-gray-500" />
      <span>추가</span>
      {children}
    </button>
  );
}
