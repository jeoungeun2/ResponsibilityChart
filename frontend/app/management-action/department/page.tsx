"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { DutyData, sampleData } from '@/data/department-data';

// 컬럼 정의
const columns: any[] = [
  {
    key: "category" as keyof DutyData,
    header: "책무구분",
    visible: true
  },
  {
    key: "code" as keyof DutyData,
    header: "책무코드",
    visible: true
  },
  {
    key: "name" as keyof DutyData,
    header: "책무",
    visible: true
  },
  {
    key: "detailCode" as keyof DutyData,
    header: "책무 세부코드",
    visible: true
  },
  {
    key: "detailContent" as keyof DutyData,
    header: "책무 세부내용",
    visible: true
  },
  {
    key: "actions",
    header: "액션",
    visible: true,
    render: (value: any, row: any) => (
      <div className="flex items-center space-x-2">
        <EditIcon 
          className="h-4 w-4" 
          onClick={() => console.log('수정:', row.id)}
        />
        <DeleteIcon 
          className="h-4 w-4" 
          onClick={() => console.log('삭제:', row.id)}
        />
      </div>
    )
  }
];

export default function DepartmentPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState(columns);
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
   
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    category: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 필터 설정 정의
  const filters = [
    {
      key: "category",
      label: "책무구분",
      type: "dropdown" as const,
      width: "w-32"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    category: [
      { value: "경영관리", label: "경영관리" },
      { value: "인사관리", label: "인사관리" },
      { value: "재무관리", label: "재무관리" },
      { value: "정보관리", label: "정보관리" },
      { value: "법무관리", label: "법무관리" },
      { value: "보안관리", label: "보안관리" },
      { value: "품질관리", label: "품질관리" },
      { value: "환경관리", label: "환경관리" },
      { value: "시설관리", label: "시설관리" },
      { value: "구매관리", label: "구매관리" },
      { value: "물류관리", label: "물류관리" },
      { value: "고객관리", label: "고객관리" },
      { value: "마케팅관리", label: "마케팅관리" },
      { value: "연구개발관리", label: "연구개발관리" },
      { value: "지식관리", label: "지식관리" }
    ]
  };

  // 폼 필드 정의
  const formFields = [
    { key: "category", label: "책무구분", type: "text" as const, required: true },
    { key: "code", label: "책무코드", type: "text" as const, required: true },
    { key: "name", label: "책무", type: "text" as const, required: true },
    { key: "detailCode", label: "책무 세부코드", type: "text" as const, required: true },
    { key: "detailContent", label: "책무 세부내용", type: "text" as const, required: true }
  ];

  // 폼 데이터 변경 핸들러
  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 추가 버튼 클릭 핸들러
  const handleShowAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      setFormData({}); // 폼 초기화
    }
  };

  // 추가 처리 핸들러 (기능 없음)
  const handleAdd = () => {
    console.log('추가 기능은 구현되지 않았습니다.', formData);
    // 여기에 실제 추가 로직을 구현할 수 있습니다
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
      <div className={`max-w-7xl mx-auto space-y-6 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 title="Department Management Action" />
        
        <DataTable
          data={sampleData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={filters}
          // 추가 버튼 관련 props
          enableAddForm={true}
          showAddForm={showAddForm}
          onShowAddForm={handleShowAddForm}
          formData={formData}
          formFields={formFields}
          onFormDataChange={handleFormDataChange}
          onAdd={handleAdd}
          isAddLoading={false}
          isNameValid={true}
          // 액션 컬럼 비활성화 (별도 actions 컬럼 사용)
          showActionColumn={false}
        />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6 mb-8"
        />
      </div>
    </div>
  );
}
