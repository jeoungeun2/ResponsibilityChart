"use client";

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ApproveButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ApproveButton({ onClick, disabled = false, className = "" }: ApproveButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`py-1.5 w-21 text-sm font-semibold bg-white text-blue-800 border-blue-800 hover:bg-blue-50 hover:text-blue-800 cursor-pointer ${className}`}
    >
      <Check className="h-4 w-4 mr-2" />
      승인
    </Button>
  );
}
