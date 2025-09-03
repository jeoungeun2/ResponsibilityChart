"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import CommonBreadcrumb from '../_components/Breadcrumb';

import { useSidebar } from '@/config/providers';
import { SearchFilter, FilterConfig } from '@/components/ui/SearchFilter';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { PrintButton } from '@/components/ui/PrintButton';

export default function SystemDiagramPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 필터 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    referenceDate: '',
    position: '',
    executive: ''
  });

  // 필터 설정
  const filters: FilterConfig[] = [
    {
      key: 'referenceDate',
      label: '조회기준일자',
      type: 'date',
      placeholder: '연도-월-일',
      required: true
    },
    {
      key: 'position',
      label: '직책',
      type: 'dropdown'
    },
    {
      key: 'executive',
      label: '임원',
      type: 'dropdown'
    }
  ];

  // 필터 옵션
  const filterOptions = {
    position: [
      { value: "전체", label: "전체" },
      { value: "대표이사", label: "대표이사" },
      { value: "부사장", label: "부사장" },
      { value: "전무", label: "전무" },
      { value: "상무", label: "상무" },
      { value: "이사", label: "이사" },
      { value: "감사", label: "감사" }
    ],
    executive: [
      { value: "전체", label: "전체" },
      { value: "김철수", label: "김철수" },
      { value: "이영희", label: "이영희" },
      { value: "박민수", label: "박민수" },
      { value: "정수진", label: "정수진" },
      { value: "최동호", label: "최동호" }
    ]
  };

  // 필터 변경 핸들러
  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="relative">
      {/* 헤더 직접 추가 */}
      <header className="fixed top-14 left-0 right-0 z-10 w-full bg-gradient-to-r from-brand-300/20 to-brand-500/20 backdrop-blur-sm text-gray-900">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* 제목이 필요하다면 여기에 추가 */}
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>다운로드</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={`w-full space-y-6 pt-14 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
        <CommonBreadcrumb />
        <H1 
          title="책무체계도 작성" 
          rightContent={
            <div className="flex items-center space-x-3">
              <DownloadButton 
                fileType="pptx"
                onDownload={() => {
                  console.log("시스템 다이어그램 PPTX 다운로드")
                  // 여기에 실제 다운로드 로직 구현
                }}
              />
              <PrintButton 
                onPrint={() => {
                  console.log("시스템 다이어그램 인쇄")
                  // 여기에 실제 인쇄 로직 구현
                }}
              />
            </div>
          }
        />
        
        {/* SearchFilter 컴포넌트 추가 */}
        <SearchFilter
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={filters}
        />
        
        {/* 시스템 다이어그램 컨테이너 */}
        <div className="bg-white border border-gray-200 min-h-[400px] mb-12">
          {/* 조직도 이미지 */}
          <div className="w-full max-w-6xl overflow-auto">
            <img 
              src="/images/체계도.png" 
              alt="조직 체계도" 
              className="w-full h-auto object-contain"
              style={{ minHeight: '600px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
