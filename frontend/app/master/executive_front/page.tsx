"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../executive/_components/Breadcrumb';
import Header from './_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { ExecutiveData, executiveSampleData } from '@/data/executive-data';
import ExecutiveDetailModal from '@/components/ExecutiveDetailModal';

export default function ExecutiveFrontPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // 모달 관련 상태 관리
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExecutive, setSelectedExecutive] = useState<ExecutiveData | null>(null);
   
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    position: '',
    jobTitle: '',
    name: '',
    term: ''
  });

  // H1 필터용 추가 상태 관리
  const [h1Filters, setH1Filters] = useState<Record<string, string>>({
    position: '',
    jobTitle: '',
    managedOrganization: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 상세보기 핸들러
  const handleViewDetail = (executive: ExecutiveData) => {
    setSelectedExecutive(executive);
    setShowDetailModal(true);
  };

  // 모달 닫기 핸들러
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedExecutive(null);
  };

  const [tableColumns, setTableColumns] = useState<any[]>([]);

  // 컬럼 정의 (handleViewDetail 함수 이후에 정의)
  const columns: any[] = [
    {
      key: "name" as keyof ExecutiveData,
      header: "성명",
      visible: true,
      render: (value: any, row: any) => (
        <button 
          onClick={() => handleViewDetail(row)}
          className="text-blue-600 underline cursor-pointer hover:text-blue-800"
        >
          {value}
        </button>
      )
    },
    {
      key: "position" as keyof ExecutiveData,
      header: "직책",
      visible: true
    },
    {
      key: "jobTitle" as keyof ExecutiveData,
      header: "직위",
      visible: true
    },
    {
      key: "employeeId" as keyof ExecutiveData,
      header: "사번",
      visible: true
    },
    {
      key: "phoneNumber" as keyof ExecutiveData,
      header: "전화번호",
      visible: true
    },
    {
      key: "email" as keyof ExecutiveData,
      header: "이메일",
      visible: true
    },
    {
      key: "managedOrganization" as keyof ExecutiveData,
      header: "관리대상조직",
      visible: true
    },
    {
      key: "term" as keyof ExecutiveData,
      header: "임기",
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

  // columns가 정의된 후 tableColumns 상태를 업데이트
  useEffect(() => {
    setTableColumns(columns);
  }, []);

  // 필터 설정 정의
  const filters = [
    {
      key: "position",
      label: "직책",
      type: "dropdown" as const,
      width: "w-32"
    },
    {
      key: "jobTitle",
      label: "직위",
      type: "dropdown" as const,
      width: "w-32"
    },
    {
      key: "name",
      label: "성명",
      type: "dropdown" as const,
      width: "w-32"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    position: [
      { value: "대표이사", label: "대표이사" },
      { value: "ETF투자부문장", label: "ETF투자부문장" },
      { value: "감사실장", label: "감사실장" }
    ],
    jobTitle: [
      { value: "대표이사", label: "대표이사" },
      { value: "상무", label: "상무" },
      { value: "실장", label: "실장" }
    ],
    name: [
      { value: "전체", label: "전체" },
      { value: "김철수", label: "김철수" },
      { value: "이영희", label: "이영희" },
      { value: "박민수", label: "박민수" },
      { value: "정수진", label: "정수진" },
      { value: "최영호", label: "최영호" }
    ]
  };

  // 폼 필드 정의
  const formFields = [
    { key: "name", label: "성명", type: "text" as const, required: true },
    { key: "position", label: "직책", type: "text" as const, required: true },
    { key: "jobTitle", label: "직위", type: "text" as const, required: true },
    { key: "employeeId", label: "사번", type: "text" as const, required: true },
    { key: "phoneNumber", label: "전화번호", type: "tel" as const, required: true },
    { key: "email", label: "이메일", type: "email" as const, required: true },
    { key: "managedOrganization", label: "관리대상조직", type: "text" as const, required: true },
    { key: "term", label: "임기", type: "text" as const, required: true }
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

  // H1 필터 변경 핸들러
  const handleH1FilterChange = (key: string, value: string) => {
    setH1Filters(prev => ({
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
      <div className={`max-w-7xl mx-auto space-y-6 pt-8 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 
          title="책무대상임원등록" 
        />
        
        <DataTable
          data={executiveSampleData}
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

        {/* 임원 상세 정보 모달 */}
        <ExecutiveDetailModal
          executive={selectedExecutive}
          isOpen={showDetailModal}
          onClose={handleCloseDetailModal}
        />
      </div>
    </div>
  );
}
