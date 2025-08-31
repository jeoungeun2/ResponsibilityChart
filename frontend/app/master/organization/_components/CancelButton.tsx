"use client";

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CancelButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function CancelButton({ onClick, disabled = false, className = "" }: CancelButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`py-1.5 w-21 text-sm font-semibold text-gray-800 border-gray-800 hover:bg-gray-50 hover:text-gray-800 cursor-pointer ${className}`}
    >
      <X className="h-4 w-4 mr-2" />
      취소
    </Button>
  );
}
