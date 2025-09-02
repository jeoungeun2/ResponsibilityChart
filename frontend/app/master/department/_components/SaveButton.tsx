"use client";

import { Button } from '@/components/ui/button';

interface SaveButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function SaveButton({ onClick, disabled = false, className = "", children }: SaveButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`py-1.5 w-21 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 hover:text-white cursor-pointer ${className}`}
    >
      {children || "저장"}
    </Button>
  );
}
