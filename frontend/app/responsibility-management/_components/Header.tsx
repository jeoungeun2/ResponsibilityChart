"use client"

import React from 'react'
import { useSidebar } from '@/config/providers'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface HeaderProps {
  rightContent?: React.ReactNode;
}

export default function Header({ rightContent }: HeaderProps) {
  const { isSidebarCollapsed } = useSidebar();
  
  return (
    <>
      {/* 헤더 항상 표시 */}
      <header className="fixed top-14 left-0 right-0 z-10 w-full bg-gradient-to-r from-brand-300/20 to-brand-500/20 backdrop-blur-sm text-gray-900">
        <div className="px-4">
          <div className="flex items-center justify-between">
            {/* 로고/제목 영역 */}
            <div className="flex items-center">
              {/* 제목이 필요하다면 여기에 추가 */}
            </div>
            
            {/* 우측 메뉴 영역 */}
            <div className="flex items-center space-x-4">
              {rightContent}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
