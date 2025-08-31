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
  const pathname = usePathname();
  
  const navigationItems = [
    {
      name: "책무기술서 작성",
      href: "/responsibility-management/description",
      active: pathname === "/responsibility-management/description"
    },
    {
      name: "책무기술서 관리",
      href: "/responsibility-management/description/management",
      active: pathname === "/responsibility-management/description/management"
    },
  ];

  return (
    <>
      <header className="fixed top-14 left-0 right-0 z-10 w-full bg-gray-100 text-gray-900">
        <div className="px-4">
          <div className="flex items-end justify-start h-12">
            {/* 네비게이션 메뉴 */}
            <div className={`flex items-center space-x-2 transition-all duration-300 ease-in-out ${!isSidebarCollapsed ? 'ml-64' : 'ml-28'}`}>
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-base transition-colors ${
                    item.active
                      ? `text-gray-900 font-semibold border-t border-l border-r mt-2 ${rightContent ? 'bg-[#fee7da] border-brand-500/20' : 'bg-white border-gray-300'}`
                      : 'text-gray-500 font-medium border-r border-r-gray-300 hover:bg-gray-200 cursor-pointer'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      {/* 두 번째 헤더 - rightContent가 있을 때만 표시 */}
      {rightContent && (
        <header className="fixed top-24 left-0 right-0 z-10 w-full bg-gradient-to-r from-brand-300/20 to-brand-500/20 backdrop-blur-sm text-gray-900">
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
      )}
    </>
  )
}
