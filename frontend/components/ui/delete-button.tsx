import { X } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function DeleteButton({
  onClick,
  size = 'md',
  className = '',
  disabled = false,
  ariaLabel = '삭제'
}: DeleteButtonProps) {
  // 기본 스타일 - 보더와 배경 제거하고 gray-500으로 변경, justify-center 유지
  const baseClasses = 'flex items-center justify-center text-gray-500 hover:text-gray-600 transition-colors';
  
  // size별 스타일
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10'
  };
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-label={ariaLabel}
    >
      <X className="h-4 w-4" />
    </button>
  );
}
