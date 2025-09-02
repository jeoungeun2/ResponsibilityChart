"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../../master/executive/_components/Breadcrumb';
import Header from '../../master/executive/_components/Header';
import DutyDetailModal from '../_components/DutyDetailModal';
import { useSidebar } from '@/config/providers';
import { ResponsibilityAllocationData, responsibilityAllocationData } from '@/data/responsibility-allocation-data';



export default function ResponsibilityAllocationPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 검색/필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    division: '',
    code: '',
    name: '',
    responsibilityCode: '',
    responsibilityName: ''
  });
  
  // 책무 상세 모달 관련 상태 관리
  const [showDutyDetailModal, setShowDutyDetailModal] = useState(false);
  const [selectedDutyData, setSelectedDutyData] = useState<ResponsibilityAllocationData | null>(null);
   
  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 책무코드 클릭 핸들러
  const handleDutyCodeClick = (dutyData: ResponsibilityAllocationData) => {
    setSelectedDutyData(dutyData);
    setShowDutyDetailModal(true);
  };

  // 컬럼 정의 (함수 내부로 이동)
  const columns: any[] = [
    {
      key: "position" as keyof ResponsibilityAllocationData,
      header: "직책",
      visible: true
    },
    {
      key: "division" as keyof ResponsibilityAllocationData,
      header: "책무구분",
      visible: true
    },
    {
      key: "code" as keyof ResponsibilityAllocationData,
      header: "책무코드",
      visible: true,
      render: (value: any, row: any) => (
        <button
          onClick={() => handleDutyCodeClick(row)}
          className="text-blue-600 hover:text-blue-800 underline cursor-pointer text-left"
        >
          {value}
        </button>
      )
    },
    {
      key: "name" as keyof ResponsibilityAllocationData,
      header: "책무명",
      visible: true
    },
    {
      key: "overview" as keyof ResponsibilityAllocationData,
      header: "책무개요",
      visible: true
    },
    {
      key: "detailContent" as keyof ResponsibilityAllocationData,
      header: "책무세부내용",
      visible: true
    },
    {
      key: "managementObligation" as keyof ResponsibilityAllocationData,
      header: "관리의무",
      visible: true
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // 필터 옵션들
  const filterOptions = {
    division: [
      { value: "전체", label: "전체" },
      { value: "경영", label: "경영" },
      { value: "경영관리", label: "경영관리" },
      { value: "재무", label: "재무" },
      { value: "정보", label: "정보" },
      { value: "법무", label: "법무" },
      { value: "보안", label: "보안" },
      { value: "품질", label: "품질" },
      { value: "환경", label: "환경" },
      { value: "시설", label: "시설" },
      { value: "구매", label: "구매" },
      { value: "물류", label: "물류" },
      { value: "고객", label: "고객" },
      { value: "마케팅", label: "마케팅" },
      { value: "연구개발", label: "연구개발" },
      { value: "지식", label: "지식" }
    ],
    responsibilityCode: [
      { value: "전체", label: "전체" },
      { value: "BD-001", label: "BD-001" },
      { value: "BD-002", label: "BD-002" },
      { value: "BD-003", label: "BD-003" },
      { value: "EQ-001", label: "EQ-001" },
      { value: "EQ-002", label: "EQ-002" }
    ],
    responsibilityName: [
      { value: "전체", label: "전체" },
      { value: "경영전략수립", label: "경영전략수립" },
      { value: "재무관리", label: "재무관리" },
      { value: "정보보안관리", label: "정보보안관리" },
      { value: "법무관리", label: "법무관리" },
      { value: "품질관리", label: "품질관리" }
    ]
  };

  // 필터 변경 핸들러
  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`페이지 ${page}로 이동`);
    // 여기에 실제 페이지 변경 로직을 구현할 수 있습니다
  };

  return (
    <div className="relative liquidGlass-page">
      {/* 리퀴드 글래스 배경 효과 */}
      <div className="liquidGlass-bg-effect"></div>
      <div className="liquidGlass-bg-tint"></div>
      <div className="liquidGlass-bg-shine"></div>
      
      <Header 
        rightContent={
          <div className="flex items-center space-x-3">
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`w-full space-y-6 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
        <div className="pt-14">
          <CommonBreadcrumb />
        </div>
        <H1 title="책무 배분" />
        

        <DataTable
          data={responsibilityAllocationData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={[
            {
              key: "division",
              label: "책무구분",
              type: "dropdown" as const,
              width: "w-32"
            },
            {
              key: "responsibilityCode",
              label: "책무코드",
              type: "dropdown" as const,
              width: "w-40"
            },
            {
              key: "responsibilityName",
              label: "책무명",
              type: "dropdown" as const,
              width: "w-48"
            }
          ]}
          // 추가 버튼 및 체크박스 비활성화
          enableAddForm={false}
          enableRowSelection={false}
          // 삭제 기능 비활성화
          enableBulkDelete={false}
          // 액션 컬럼 비활성화
          showActionColumn={false}
        />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6 mb-8"
        />
        
        {/* 책무 상세 모달 */}
        <DutyDetailModal
          open={showDutyDetailModal}
          onOpenChange={setShowDutyDetailModal}
          dutyData={selectedDutyData}
        />
      </div>
    </div>
  );
}
