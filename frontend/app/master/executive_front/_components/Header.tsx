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
      name: "책무대상 임원등록",
      href: "/master/executive_front",
      active: pathname === "/master/executive_front"
    },
    {
      name: "임원적격성평가",
      href: "/master/executive_front/evaluation",
      active: pathname === "/master/executive_front/evaluation"
    },
    {
      name: "책무대상 임원 종합정보",
      href: "/master/executive_front/comprehensive",
      active: pathname === "/master/executive_front/comprehensive"
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
        </div>
      </div>
    </header>
  )
}
