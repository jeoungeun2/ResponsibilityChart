"use client"

import React from 'react'
import { useSidebar } from '@/config/providers'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const { isSidebarCollapsed } = useSidebar();
  const pathname = usePathname();
  
  const navigationItems = [
    {
      name: "조직 관리",
      href: "/master/organization",
      active: pathname === "/master/organization"
    },
    {
      name: "조직 구조도",
      href: "/master/organization/structure",
      active: pathname === "/master/organization/structure"
    },
    {
      name: "조직 이력",
      href: "/master/organization/history",
      active: pathname === "/master/organization/history"
    }
  ];
  
  return (
    <header className="fixed top-14 left-0 right-0 z-10 w-full bg-gray-100 text-gray-900">
      <div className="px-4">
        <div className="flex items-end justify-start h-12">
          {/* 네비게이션 메뉴 */}
          <div className={`flex items-center space-x-8 transition-all duration-300 ease-in-out ${!isSidebarCollapsed ? 'ml-64' : 'ml-28'}`}>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-base transition-colors cursor-pointer ${
                  item.active
                    ? 'text-gray-900 font-semibold bg-white rounded-t'
                    : 'text-gray-500 font-medium hover:bg-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* 우측 다운로드 버튼 */}
          <div className="ml-auto">
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-200 cursor-pointer bg-white rounded-t">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
