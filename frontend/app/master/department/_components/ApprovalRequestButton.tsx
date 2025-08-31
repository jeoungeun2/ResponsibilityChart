"use client";

import { Button } from '@/components/ui/button';

interface ApprovalRequestButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ApprovalRequestButton({ onClick, disabled = false, className = "" }: ApprovalRequestButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`py-1.5 w-21 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 cursor-pointer ${className}`}
    >
      승인요청
    </Button>
  );
}
