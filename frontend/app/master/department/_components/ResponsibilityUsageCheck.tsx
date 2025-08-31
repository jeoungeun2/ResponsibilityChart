"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface ResponsibilityUsageCheckProps {
  className?: string;
  usageStatus?: string;
  onUsageStatusChange?: (status: string) => void;
}

export default function ResponsibilityUsageCheck({ 
  className = "", 
  usageStatus = "Y",
  onUsageStatusChange 
}: ResponsibilityUsageCheckProps) {
  const labelCls = "block text-base font-medium text-gray-700 mb-1 flrex items-center";

  return (
    <section className={`p-4 ${className}`}>
      <div className="mb-4">
        {/* 섹션 제목 */}
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          책무 사용여부 체크
        </h3>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-4 gap-6 items-center">
          <label className={labelCls}>사용여부</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-10 px-4 justify-between"
              >
                <span className="truncate flex-1 text-left">
                  {usageStatus}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-full">
              <DropdownMenuItem
                onClick={() => onUsageStatusChange?.("Y")}
                className="cursor-pointer"
              >
                Y
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUsageStatusChange?.("N")}
                className="cursor-pointer"
              >
                N
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
}
