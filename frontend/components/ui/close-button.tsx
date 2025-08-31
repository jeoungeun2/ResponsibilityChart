import { X } from 'lucide-react';

interface CloseButtonProps {
  onClick: () => void;
  variant?: 'close' | 'delete';
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
}

export default function CloseButton({
  onClick,
  variant = 'close',
  size = 'md',
  className = '',
  disabled = false
}: CloseButtonProps) {
  // 기본 스타일
  const baseClasses = 'flex items-center justify-center border transition-colors';
  
  // variant별 스타일
  const variantClasses = {
    close: 'text-gray-900 hover:bg-gray-100 border-gray-200',
    delete: 'text-red-600 hover:bg-red-50 border-red-200'
  };
  
  // size별 스타일
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10'
  };
  
  // 아이콘 크기
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-4 w-4';
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-label={variant === 'close' ? '닫기' : '삭제'}
    >
      <X className={iconSize} />
    </button>
  );
}

