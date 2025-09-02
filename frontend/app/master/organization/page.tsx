"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../executive/_components/Breadcrumb';
import Header from '../executive/_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { OrganizationData, organizationSampleData } from '@/data/organization-data';
import AddOrganizationForm from './_components/AddOrganizationForm';
import { StartDateFilter } from '@/components/ui/DateFilter';

export default function OrganizationPage() {
  const { isSidebarCollapsed } = useSidebar();
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);
   
  // 조회기준일자 상태 관리
  const [referenceDate, setReferenceDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  });

  // 조회기준일자 변경 시 데이터 재조회
  useEffect(() => {
    console.log('조회기준일자 변경:', referenceDate);
    // 필터 상태도 업데이트
    setSearchFilters(prev => ({
      ...prev,
      referenceDate: referenceDate
    }));
    // 여기에 실제 API 호출 로직을 구현할 수 있습니다
    // 예: fetchOrganizationData(referenceDate);
  }, [referenceDate]);

  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    jobTitle: '',
    orgDivision: '',
    managedOrg: '',
    referenceDate: referenceDate
  });



  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 필터 설정 정의
  const filters = [
    {
      key: "referenceDate",
      label: "조회기준일자",
      type: "date" as const,
      width: "w-auto"
    },
    {
      key: "jobTitle",
      label: "직책",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "orgDivision",
      label: "조직구분",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "managedOrg",
      label: "관리대상조직",
      type: "dropdown" as const,
      width: "w-40"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    jobTitle: [
      { value: "대표이사", label: "대표이사" },
      { value: "이사회 의장", label: "이사회 의장" },
      { value: "경영지원", label: "경영지원" },
      { value: "감사실장", label: "감사실장" },
      { value: "마케팅총괄부사장", label: "마케팅총괄부사장" }
    ],
    orgDivision: [
      { value: "대표이사", label: "대표이사" },
      { value: "이사회 의장", label: "이사회 의장" },
      { value: "경영지원", label: "경영지원" },
      { value: "감사실", label: "감사실" },
      { value: "금융영업", label: "금융영업" }
    ],
    managedOrg: [
      { value: "대표이사", label: "대표이사" },
      { value: "이사회 의장", label: "이사회 의장" },
      { value: "경영지원", label: "경영지원" },
      { value: "감사실", label: "감사실" },
      { value: "마케팅총괄부문", label: "마케팅총괄부문" }
    ]
  };

  // 폼 데이터 변경 핸들러
  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 수정 버튼 클릭 핸들러
  const handleEdit = (row: any) => {
    setEditingRow(row);
    setIsEditMode(true);
    // 기존 데이터를 폼에 설정
    const newFormData = {
      jobCode: row.jobCode || '',
      jobTitle: row.jobTitle || '',
      orgDivision: row.orgDivision || '',
      managedOrg: row.managedOrg || '',
      responsibleDept: row.responsibleDept || '',
      responsibleTeam: row.responsibleTeam || '',
      startDate: row.effectiveStartDate || '',
      endDate: row.effectiveEndDate || ''
    };
    setFormData(newFormData);
    setShowAddForm(true);
  };

  // 추가 버튼 클릭 핸들러
  const handleShowAddForm = () => {
    setIsEditMode(false);
    setEditingRow(null);
    setShowAddForm(true);
    setFormData({}); // 폼 초기화
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowAddForm(false);
    setIsEditMode(false);
    setEditingRow(null);
    setFormData({});
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
    
    // 조회기준일자 필터가 변경되면 referenceDate 상태도 업데이트
    if (key === 'referenceDate') {
      setReferenceDate(value);
    }
  };



  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`페이지 ${page}로 이동`);
    // 여기에 실제 페이지 변경 로직을 구현할 수 있습니다
  };

  // 컬럼 정의 - handleEdit 함수에 접근할 수 있도록 컴포넌트 내부에 정의
  const columns: any[] = [
    {
      key: "jobCode" as keyof OrganizationData,
      header: "직책코드",
      visible: true
    },
    {
      key: "jobTitle" as keyof OrganizationData,
      header: "직책",
      visible: true
    },
    {
      key: "orgDivision" as keyof OrganizationData,
      header: "조직구분",
      visible: true
    },
    {
      key: "managedOrg" as keyof OrganizationData,
      header: "관리대상조직",
      visible: true
    },
    {
      key: "responsibleDept" as keyof OrganizationData,
      header: "소관부서",
      visible: true
    },
    {
      key: "responsibleTeam" as keyof OrganizationData,
      header: "소관팀",
      visible: true
    },
    {
      key: "registrationDate" as keyof OrganizationData,
      header: "등록일자",
      visible: true
    },
    {
      key: "effectiveStartDate" as keyof OrganizationData,
      header: "적용시작일자",
      visible: true
    },
    {
      key: "effectiveEndDate" as keyof OrganizationData,
      header: "적용종료일자",
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
            onClick={() => handleEdit(row)}
          />
          <DeleteIcon 
            className="h-4 w-4" 
            onClick={() => console.log('삭제:', row.id)}
          />
        </div>
      )
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  return (
    <div className="relative">
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
        <CommonBreadcrumb />
        <H1 
          title="직책(조직) Master" 
        />
        
        <DataTable
          data={organizationSampleData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={filters}
          // 추가 버전 2 사용
          enableAddFormV2={true}
          addFormV2Modal={
            <AddOrganizationForm
              key={`${isEditMode}-${editingRow?.id || 'new'}`}
              open={showAddForm}
              onOpenChange={handleCloseModal}
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onAdd={handleAdd}
              isLoading={false}
              disabled={false}
              isEdit={isEditMode}
            />
          }
          onShowAddFormV2={handleShowAddForm}
          // 기존 추가 폼 비활성화
          enableAddForm={false}
          showAddForm={false}
          onShowAddForm={() => {}}
          formData={{}}
          formFields={[]}
          onFormDataChange={() => {}}
          onAdd={() => {}}
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
