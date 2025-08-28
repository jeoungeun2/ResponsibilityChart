'use client';

import { useState } from 'react';
import Navigation from './sidebar';
import Footer from './Footer/Footer';
import Header from './header';


interface DynamicLayoutProps {
  children: React.ReactNode;
}

export default function DynamicLayout({ children }: DynamicLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
    <Header isSidebarCollapsed={isSidebarCollapsed} />
    <div className="flex min-h-screen">
      
      {/* Navigation 컴포넌트에 상태와 토글 함수 전달 */}
      <div>
        <Navigation 
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
        />
      </div>
      
      {/* 메인 콘텐츠 영역 - 사이드바 상태에 따라 동적 마진 조정 */}
      <div 
        className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <main className={`flex-1 max-w-7xl mx-auto pt-4 min-h-screen ${
          isSidebarCollapsed ? 'px-2' : 'px-8'
        }`}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  </>);
}
