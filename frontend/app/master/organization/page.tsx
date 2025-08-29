"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../executive/_components/Breadcrumb';
import Header from './_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { OrganizationData, organizationSampleData } from '@/data/organization-data';
import OrganizationFilter from '@/components/OrganizationFilter';
import AddOrganizationForm from './_components/AddOrganizationForm';

// 컬럼 정의
const columns: any[] = [
  {
    key: "orgCodeLv1" as keyof OrganizationData,
    header: "관리대상조직코드 Lv1",
    visible: true
  },
  {
    key: "orgNameLv1" as keyof OrganizationData,
    header: "관리대상조직명",
    visible: true
  },
  {
    key: "deptCodeLv2" as keyof OrganizationData,
    header: "소관부서/본부코드 Lv2",
    visible: true
  },
  {
    key: "deptNameLv2" as keyof OrganizationData,
    header: "소관부서/본부명",
    visible: true
  },
  {
    key: "teamCodeLv3" as keyof OrganizationData,
    header: "소관팀코드 Lv3",
    visible: true
  },
  {
    key: "teamNameLv3" as keyof OrganizationData,
    header: "소관팀명",
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
    key: "registrationDate" as keyof OrganizationData,
    header: "등록일자",
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

export default function OrganizationPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState(columns);
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);
   
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    orgCodeLv1: '',
    deptCodeLv2: '',
    teamCodeLv3: '',
    startDate: '',
    endDate: '',
    orgStatus: '',
    orgType: '',
    organizationLv1: '',
    organizationLv2: '',
    organizationLv3: ''
  });

  // H1 필터용 추가 상태 관리
  const [h1Filters, setH1Filters] = useState<Record<string, string>>({
    baselineDate: '',
    orgStatus: '',
    orgType: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 필터 설정 정의
  const filters = [
    {
      key: "organizationLv1",
      label: "조직Lv1명",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "organizationLv2",
      label: "조직Lv2명",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "organizationLv3",
      label: "조직Lv3명",
      type: "dropdown" as const,
      width: "w-40"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    orgCodeLv1: [
      { value: "ET", label: "ET - ETF투자부문" },
      { value: "AU", label: "AU - 자산운용부문" },
      { value: "AM", label: "AM - 자산관리부문" },
      { value: "GI", label: "GI - 글로벌투자부문" },
      { value: "CP", label: "CP - 금융소비자보호실" },
      { value: "IT", label: "IT - IT부문" },
      { value: "HR", label: "HR - 인사부문" },
      { value: "FI", label: "FI - 재무부문" },
      { value: "LE", label: "LE - 법무부문" }
    ],
    deptCodeLv2: [
      { value: "ET01", label: "ET01 - ETF운용팀" },
      { value: "ET02", label: "ET02 - ETF전략팀" },
      { value: "AU01", label: "AU01 - 자산운용팀" },
      { value: "AU02", label: "AU02 - 리스크관리팀" },
      { value: "AM01", label: "AM01 - 자산관리팀" },
      { value: "GI01", label: "GI01 - 글로벌투자팀" },
      { value: "CP01", label: "CP01 - 소비자보호팀" },
      { value: "IT01", label: "IT01 - 시스템개발팀" },
      { value: "IT02", label: "IT02 - 인프라팀" },
      { value: "HR01", label: "HR01 - 인사팀" },
      { value: "FI01", label: "FI01 - 재무팀" },
      { value: "LE01", label: "LE01 - 법무팀" }
    ],
    teamCodeLv3: [
      { value: "ET0101", label: "ET0101 - ETF운용1팀" },
      { value: "ET0102", label: "ET0102 - ETF운용2팀" },
      { value: "ET0201", label: "ET0201 - ETF전략1팀" },
      { value: "AU0101", label: "AU0101 - 자산운용1팀" },
      { value: "AU0201", label: "AU0201 - 리스크관리1팀" },
      { value: "AM0101", label: "AM0101 - 자산관리1팀" },
      { value: "GI0101", label: "GI0101 - 글로벌투자1팀" },
      { value: "CP0101", label: "CP0101 - 소비자보호1팀" },
      { value: "IT0101", label: "IT0101 - 시스템개발1팀" },
      { value: "IT0201", label: "IT0201 - 인프라1팀" },
      { value: "HR0101", label: "HR0101 - 인사1팀" },
      { value: "FI0101", label: "FI0101 - 재무1팀" },
      { value: "LE0101", label: "LE0101 - 법무1팀" }
    ],
    orgStatus: [
      { value: "ACTIVE", label: "활성" },
      { value: "INACTIVE", label: "비활성" },
      { value: "PENDING", label: "대기" }
    ],
    orgType: [
      { value: "HEADQUARTERS", label: "본사" },
      { value: "BRANCH", label: "지점" },
      { value: "DEPARTMENT", label: "부서" },
      { value: "TEAM", label: "팀" }
    ],
    organizationLv1: [
      { value: "전체", label: "전체" },
      { value: "ET", label: "ET - ETF투자부문" },
      { value: "AU", label: "AU - 자산운용부문" },
      { value: "AM", label: "AM - 자산관리부문" },
      { value: "GI", label: "GI - 글로벌투자부문" },
      { value: "CP", label: "CP - 금융소비자보호실" },
      { value: "IT", label: "IT - IT부문" },
      { value: "HR", label: "HR - 인사부문" },
      { value: "FI", label: "FI - 재무부문" },
      { value: "LE", label: "LE - 법무부문" }
    ],
    organizationLv2: [
      { value: "전체", label: "전체" },
      { value: "ET01", label: "ET01 - ETF운용팀" },
      { value: "ET02", label: "ET02 - ETF전략팀" },
      { value: "AU01", label: "AU01 - 자산운용팀" },
      { value: "AU02", label: "AU02 - 리스크관리팀" },
      { value: "AM01", label: "AM01 - 자산관리팀" },
      { value: "GI01", label: "GI01 - 글로벌투자팀" },
      { value: "CP01", label: "CP01 - 소비자보호팀" },
      { value: "IT01", label: "IT01 - 시스템개발팀" },
      { value: "IT02", label: "IT02 - 인프라팀" },
      { value: "HR01", label: "HR01 - 인사팀" },
      { value: "FI01", label: "FI01 - 재무팀" },
      { value: "LE01", label: "LE01 - 법무팀" }
    ],
    organizationLv3: [
      { value: "전체", label: "전체" },
      { value: "ET0101", label: "ET0101 - ETF운용1팀" },
      { value: "ET0102", label: "ET0102 - ETF운용2팀" },
      { value: "ET0201", label: "ET0201 - ETF전략1팀" },
      { value: "AU0101", label: "AU0101 - 자산운용1팀" },
      { value: "AU0201", label: "AU0201 - 리스크관리1팀" },
      { value: "AM0101", label: "AM0101 - 자산관리1팀" },
      { value: "GI0101", label: "GI0101 - 글로벌투자1팀" },
      { value: "CP0101", label: "CP0101 - 소비자보호1팀" },
      { value: "IT0101", label: "IT0101 - 시스템개발1팀" },
      { value: "IT0201", label: "IT0201 - 인프라1팀" },
      { value: "HR0101", label: "HR0101 - 인사1팀" },
      { value: "FI0101", label: "FI0101 - 재무1팀" },
      { value: "LE0101", label: "LE0101 - 법무1팀" }
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
    setFormData({
      orgNameLv1: row.orgNameLv1 || '',
      orgNameLv2: row.deptNameLv2 || '',
      orgNameLv3: row.teamNameLv3 || '',
      orgCodeLv1: row.orgCodeLv1 || '',
      deptCodeLv2: row.deptCodeLv2 || '',
      teamCodeLv3: row.teamCodeLv3 || ''
    });
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

      <div className={`max-w-7xl mx-auto space-y-6 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 
          title="직책(조직) Master" 
          rightContent={
            <OrganizationFilter
              searchFilters={h1Filters}
              onFilterChange={handleH1FilterChange}
              filterOptions={filterOptions}
            />
          }
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
        
        {/* 조직 추가/수정 모달 */}
        <AddOrganizationForm
          open={showAddForm}
          onOpenChange={handleCloseModal}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onAdd={handleAdd}
          isLoading={false}
          disabled={false}
          isEdit={isEditMode}
        />
      </div>
    </div>
  );
}
