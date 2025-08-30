'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  ChevronRight, ChevronLeft
} from 'lucide-react';

interface NavigationProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Navigation({ isCollapsed, onToggle }: NavigationProps) {
  const pathname = usePathname();

  // 토글 상태를 localStorage 에 저장/복원하고 싶다면 부모에서 처리해도 되지만
  // 보조적으로 여기서도 이벤트를 쏴 줍니다.
  useEffect(() => {
    try {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    } catch {}
  }, [isCollapsed]);

  const navigationItems = [
    { href: '/', label: '대시보드', subItems: [], imageSrc: '/images/data-analytics.png' },
    {
      href: '/master',
      label: '책무구조 Master',
      subItems: [
        { href: '/master/department', label: '책무 Master' },
        { href: '/master/executive_front', label: '임원 Master' },        
        { href: '/master/organization', label: '조직 Master' },
      ],
      imageSrc: '/images/data-analysis (1).png',
    },
    {
      label: '관리조치Master',
      href: '/management-action/executive',
      subItems: [
        { label: '임원별 관리조치 Master', href: '/management-action/executive' },
        { label: '부서별 관리조치 Master', href: '/management-action/department' },
      ],
      imageSrc: '/images/team-management.png',
    },
    {
      label: '책무 관리',
      href: '/responsibility-management',
      subItems: [
        { label: '책무 배분', href: '/responsibility-management/allocation' },
        { label: '책무체계도 작성', href: '/responsibility-management/system-diagram' },
        { label: '책무기술서 작성', href: '/responsibility-management/description' },
      ],
      imageSrc: '/images/pen-tool.png',
    },
    {
      label: '책무 이행 점검',
      href: '/responsibility-check',
      subItems: [
        { label: '관리조치활동 수행', href: '/responsibility-check/status' },
        { label: '관리조치 이행 점검', href: '/responsibility-check/management' },
      ],
      imageSrc: '/images/check (2).png',
    },
  ];

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      className={[
        'fixed left-0 top-0 z-40 h-screen backdrop-blur-sm 0 shadow-lg',
        'flex flex-col transition-[width] duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64',
      ].join(' ')}
      aria-label="사이드바 내비게이션"
    >
      {/* 헤더 / 토글 버튼 */}
      <div className="flex items-center justify-between px-6  h-15 flex-shrink-0 bg-[#ec5a29]">
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'space-x-3'}`}>
          {!isCollapsed && (
            <div className="w-16 h-12 flex items-center justify-center  ">
              <img
                src="/images/logo_white.png"
                alt="책무구조시스템 로고"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
        {/* #ec5a29 */}
        <button
          onClick={onToggle}
          className=" rounded-lg hover:bg-gray-100 transition-colors "
          aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-white font-bold" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white font-bold" />
          )}
        </button>
      </div>

      {/* 내비게이션 */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className={`space-y-1 ${isCollapsed ? 'space-y-2' : ''}`}>
          {navigationItems.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                {/* 메인 메뉴 */}
                <Link
                  href={item.href}
                  className={[
                    'group flex items-center transition-all duration-200 relative',
                    isCollapsed ? 'justify-center p-2' : (active ? 'p-1.5 space-x-3' : 'p-2.5 space-x-3'),
                    active
                      ? 'bg-[#f8cfc1] text-[#ec5a29] border-l-4 border-[#ec5a29]'
                      : 'hover:bg-[#f8cfc1] hover:text-gray-800 text-gray-500',
                  ].join(' ')}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.label}
                    className="w-5 h-5 shrink-0"
                  />
                  {!isCollapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}

                  {/* collapsed 상태 툴팁 */}
                  {isCollapsed && (
                    <span
                      className="pointer-events-none absolute left-16 z-[100] whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                      role="tooltip"
                    >
                      {item.label}
                    </span>
                  )}
                </Link>

                {/* 서브메뉴 (펼친 상태에서만 표시) */}
                {!isCollapsed && item.subItems.length > 0 && (
                  <div className="ml-4 mt-1 space-y-0.5 relative">
                    {/* 세로 왼쪽 줄 */}
                    <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300"></div>
                    {item.subItems.map((sub) => {
                      const subActive = isActive(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={[
                            'flex items-center transition-all duration-200 px-2 py-1.5 text-sm relative ml-2',
                            subActive
                              ? 'text-black font-semibold'
                              : 'hover:bg-gray-50 text-gray-400 hover:text-gray-600',
                          ].join(' ')}
                        >
                          <span className="truncate">{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}