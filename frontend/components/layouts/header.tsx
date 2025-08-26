'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bell, Settings } from 'lucide-react';

interface HeaderProps {
  isSidebarCollapsed: boolean;
}

export default function Header({ isSidebarCollapsed }: HeaderProps) {
  return (
    <header className="bg-black sticky top-0 backdrop-blur-sm z-30 h-14">
      <div className={`mx-auto flex items-center justify-between transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      } px-4 h-full`}>
        {/* 로고 영역 - 사이드바가 펼쳐졌을 때는 로고 이미지만 숨김 */}
        <div className="flex items-center px-2">
          <Link href="/" className="flex items-center space-x-3">
            {isSidebarCollapsed && (
              <img 
                src="/images/logo_white_v3.png" 
                alt="PWC Logo" 
                className="w-15 h-17 object-contain "
              />
            )}
            <span className="text-xl font-semibold font-pretendard text-white">책무구조시스템</span>
          </Link>
        </div>

        {/* 우측 아이콘 영역 */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
