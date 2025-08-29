"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';
import { ResponsibilityAllocationData, responsibilityAllocationData } from '@/data/responsibility-allocation-data';

// 책무 상세 정보 팝업 컴포넌트
function DutyDetailModal({ 
  open, 
  onOpenChange, 
  dutyData 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  dutyData: ResponsibilityAllocationData | null; 
}) {
  if (!open || !dutyData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-[90vw] overflow-hidden">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">책무 배분 (Pop-up)</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-white hover:bg-blue-700 p-2 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 컨텐츠 */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* 책무 상세 정보 */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-2">
              책무 상세 정보
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">책무코드</label>
                <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800">
                  {dutyData.code}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">책무명</label>
                <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800">
                  {dutyData.name}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">책무세부코드</label>
                <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800">
                  {dutyData.code}-A
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">책무세부내용</label>
                <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800">
                  {dutyData.detailContent}
                </div>
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">관리의무</label>
                <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800">
                  {dutyData.managementObligation}
                </div>
              </div>
            </div>
          </section>

          {/* 책무 배분 임원 */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-2">
              책무 배분 임원
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">직책 (Position)</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">전체</option>
                  <option value="CEO">CEO</option>
                  <option value="CFO">CFO</option>
                  <option value="CTO">CTO</option>
                  <option value="COO">COO</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">사번 (Employee ID)</label>
                <input
                  type="text"
                  placeholder="사번을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">성명 (Name)</label>
                <input
                  type="text"
                  placeholder="성명을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                조회
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                책무배분 승인요청
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

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
    <div className="relative">
      <Header 
        rightContent={
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm font-medium">
              책무 배분 시 적격성 평가
            </div>
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12 " />
              </svg>
              <span>업로드</span>
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
        <H1 title="책무배분관리" />
        

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
