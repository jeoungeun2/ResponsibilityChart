'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

interface HeaderProps {
  isSidebarCollapsed: boolean;
}

export default function Header({ isSidebarCollapsed }: HeaderProps) {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

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
            <span className="text-xl font-semibold font-pretendard text-white">책무관리시스템</span>
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
          
          {/* 유저 정보 및 로그인/로그아웃 */}
          {status === 'loading' ? (
            <div className="text-white text-sm">로딩 중...</div>
          ) : session?.user ? (
            <div className="flex items-center space-x-3">
              {/* 유저 정보 */}
              <div className="text-white">
                <span className="text-base font-medium">{session.user.email}</span>
              </div>
              
              {/* 로그아웃 버튼 */}
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 text-sm text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link 
              href="/signin"
              className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
