'use client';

import Navigation from './sidebar';
import Footer from './Footer/Footer';
import Header from './header';
import { useSidebar } from '@/config/providers';

interface DynamicLayoutProps {
  children: React.ReactNode;
}

export default function DynamicLayout({ children }: DynamicLayoutProps) {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  return (
    <>
    <Header isSidebarCollapsed={isSidebarCollapsed} />
    <div className="flex min-h-screen">
      
      {/* Navigation 컴포넌트에 상태와 토글 함수 전달 */}
      <Navigation 
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />
      
      {/* 메인 콘텐츠 영역 - 사이드바 상태에 따라 동적 마진 조정 */}
      <div 
        className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  </>);
}
