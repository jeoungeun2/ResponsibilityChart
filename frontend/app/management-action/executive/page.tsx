"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { ComplexDataTable } from '@/components/ui/complex-data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { ManagementActionData, sampleManagementActionData } from '@/data/executive-management-action-data';
import AddManagementActionForm from './_components/AddManagementActionForm';

// 컬럼 정의 (서브컬럼 포함)
const columns: any[] = [
  {
    key: "name" as keyof ManagementActionData,
    header: "성명",
    visible: true,
    width: "w-24"
  },
  {
    key: "managedOrg" as keyof ManagementActionData,
    header: "관리대상조직",
    visible: true,
    width: "w-32"
  },
  {
    key: "dutyCode" as keyof ManagementActionData,
    header: "책무코드",
    visible: true,
    width: "w-40"
  },
  {
    key: "duty" as keyof ManagementActionData,
    header: "책무",
    visible: true,
    width: "w-80"
  },
  {
    key: "dutyDetail" as keyof ManagementActionData,
    header: "책무 세부내용",
    visible: true,
    width: "w-80"
  },
  {
    key: "actionCode" as keyof ManagementActionData,
    header: "관리조치코드",
    visible: true,
    width: "w-48"
  },
  {
    key: "action" as keyof ManagementActionData,
    header: "관리조치",
    visible: true,
    width: "w-80"
  },
  {
    key: "actionTypes" as keyof ManagementActionData,
    header: "관리조치 유형",
    visible: true,
    subColumns: [
      {
        key: "standardCheck",
        header: "기준마련 여부 점검",
        width: "w-36"
      },
      {
        key: "executionCheck",
        header: "기준의 효과적 집행·운영 여부 점검",
        width: "w-36"
      },
      {
        key: "complianceCheck",
        header: "임직원 준수 여부 점검",
        width: "w-36"
      },
      {
        key: "managementAction",
        header: "관리사항 및 미흡사항 조치",
        width: "w-36"
      },
      {
        key: "implementationCheck",
        header: "조치 이행 여부 점검",
        width: "w-36"
      },
      {
        key: "educationSupport",
        header: "교육 및 훈련지원",
        width: "w-36"
      },
      {
        key: "investigationReport",
        header: "조사 및 제재조치 결과보고",
        width: "w-36"
      }
    ]
  },
  {
    key: "detailedActions" as keyof ManagementActionData,
    header: "관리조치 세부활동",
    visible: true,
    width: "w-80"
  },
  {
    key: "checkCycle" as keyof ManagementActionData,
    header: "점검주기",
    visible: true,
    width: "w-24"
  },
  {
    key: "evidence" as keyof ManagementActionData,
    header: "증빙",
    visible: true,
    width: "w-24"
  },
  {
    key: "actions",
    header: "액션",
    visible: true,
    width: "w-32",
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

export default function ExecutivePage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState(columns);
  
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    name: '',
    managedOrg: '',
    dutyCode: '',
    actionCode: ''
  });

  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  // 필터 옵션 데이터
  const filterOptions = {
    name: [
      { value: '김철수', label: '김철수' },
      { value: '이영희', label: '이영희' },
      { value: '박민수', label: '박민수' },
      { value: '정수진', label: '정수진' },
      { value: '한지훈', label: '한지훈' }
    ],
    managedOrg: [
      { value: '경영기획팀', label: '경영기획팀' },
      { value: '인사팀', label: '인사팀' },
      { value: '재무팀', label: '재무팀' },
      { value: '영업팀', label: '영업팀' },
      { value: '개발팀', label: '개발팀' }
    ],
    dutyCode: [
      { value: 'D001', label: 'D001 - 경영전략' },
      { value: 'D002', label: 'D002 - 인사관리' },
      { value: 'D003', label: 'D003 - 재무관리' },
      { value: 'D004', label: 'D004 - 영업관리' },
      { value: 'D005', label: 'D005 - 개발관리' }
    ],
    actionCode: [
      { value: 'A001', label: 'A001 - 점검' },
      { value: 'A002', label: 'A002 - 조치' },
      { value: 'A003', label: 'A003 - 교육' },
      { value: 'A004', label: 'A004 - 보고' },
      { value: 'A005', label: 'A005 - 평가' }
    ]
  };
   
  // 페이지네이션 관련 상태 관리 (UI 표시용)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정 (UI 표시용)

  // 실제 데이터는 15행 모두 표시
  const currentData = sampleManagementActionData;

  // 수정 버튼 클릭 핸들러
  const handleEdit = (row: any) => {
    setEditingRow(row);
    setIsEditMode(true);
    // 기존 데이터를 폼에 설정
    setFormData({
      dutyName: row.duty || '',
      dutyDetail: row.dutyDetail || '',
      managedOrganization: row.managedOrg || '',
      responsibleDepartment: '전체',
      responsibleTeam: '전체',
      managementAction: row.action || '',
      actionType: '전체',
      detailedAction: row.detailedActions || '',
      checkCycle: row.checkCycle || '',
      evidence: row.evidence || ''
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

  // 필터 변경 핸들러
  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 추가 폼 관련 핸들러들
  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    console.log('새 관리조치 추가:', formData);
    // 여기에 실제 추가 로직 구현
    handleCloseModal();
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
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer">
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
        <H1 title="임원별 관리조치 Master" />
        
        {/* 복잡한 데이터 테이블 */}
        <ComplexDataTable
          data={currentData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          searchPlaceholder="관리조치 검색..."
          isLoading={false}
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={[
            {
              key: "name",
              label: "성명",
              type: "dropdown" as const,
              width: "w-32"
            },
            {
              key: "managedOrg",
              label: "관리대상조직",
              type: "dropdown" as const,
              width: "w-40"
            },
            {
              key: "dutyCode",
              label: "책무코드",
              type: "dropdown" as const,
              width: "w-40"
            },
            {
              key: "actionCode",
              label: "관리조치코드",
              type: "dropdown" as const,
              width: "w-40"
            }
          ]}
          // 추가 버전 2 사용
          enableAddFormV2={true}
          addFormV2Modal={
            <AddManagementActionForm
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
        />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6 mb-8"
        />
        
        {/* 관리조치 추가/수정 모달 */}
        <AddManagementActionForm
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
