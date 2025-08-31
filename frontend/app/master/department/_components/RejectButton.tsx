"use client";

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RejectButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function RejectButton({ onClick, disabled = false, className = "" }: RejectButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`py-1.5 w-21 text-sm font-semibold text-red-800 border-red-800 hover:bg-red-50 hover:text-red-800 cursor-pointer ${className}`}
    >
      <X className="h-4 w-4 mr-2" />
      반려
    </Button>
  );
}
