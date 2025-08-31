"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from './_components/Header';
import { useSidebar } from '@/config/providers';
import { SearchFilter, FilterConfig } from '@/components/ui/SearchFilter';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { PrintButton } from '@/components/ui/PrintButton';

export default function SystemDiagramPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 필터 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    managementOrg: '',
    category: '',
    executive: '',
    dutyCode: '',
    allocationDate: ''
  });

  // 필터 설정
  const filters: FilterConfig[] = [
    {
      key: 'managementOrg',
      label: '관리조직LV1',
      type: 'input',
      placeholder: '관리조직을 입력하세요'
    },
    {
      key: 'category',
      label: '구분',
      type: 'input',
      placeholder: '구분을 입력하세요'
    },
    {
      key: 'executive',
      label: '책무배분임원',
      type: 'input',
      placeholder: '임원명을 입력하세요'
    },
    {
      key: 'dutyCode',
      label: '책무코드',
      type: 'input',
      placeholder: '책무코드를 입력하세요'
    },
    {
      key: 'allocationDate',
      label: '책무배분일자',
      type: 'input',
      placeholder: '날짜를 입력하세요'
    }
  ];

  // 필터 옵션 (input 타입이므로 빈 객체)
  const filterOptions = {};

  // 필터 변경 핸들러
  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="relative">
      <Header 
        rightContent={
          <div className="flex items-center space-x-3">
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>다이어그램 보기</span>
            </button>
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`max-w-7xl mx-auto space-y-6 pt-14 ${isSidebarCollapsed ? '' : 'px-8'}`}>
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
