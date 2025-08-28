"use client"

import React from 'react'

interface HeaderProps {
  title?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export default function Header({ title, rightContent }: HeaderProps) {
  return (
    <header className="fixed top-14 left-0 right-0 z-10 w-full bg-gradient-to-r from-brand-300/20 to-brand-500/20 backdrop-blur-sm text-gray-900">
      <div className="px-4">
        <div className="flex items-center justify-between">
          {/* 로고/제목 영역 */}
          <div className="flex items-center">
            {title}
          </div>
          
          {/* 우측 메뉴 영역 */}
          <div className="flex items-center space-x-4">
            {rightContent }
          </div>
        </div>
      </div>
    </header>
  )
}
