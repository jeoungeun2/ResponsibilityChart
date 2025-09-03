"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { ComplexDataTable } from '@/components/ui/complex-data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { ManagementActionData, managementActionData } from '@/data/management-action-data';
import AddDepartmentForm from './_components/AddDepartmentForm';

export default function DepartmentPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    referenceDate: '',
    managementAction: '',
    department: '',
    team: ''
  });

  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  // 필터 옵션 데이터
  const filterOptions = {
    managementAction: [
      { value: "기준마련여부 점검", label: "기준마련여부 점검" },
      { value: "효과적집행운영여부 점검", label: "효과적집행운영여부 점검" },
      { value: "임직원 준수여부 점검", label: "임직원 준수여부 점검" },
      { value: "관리사항 및 미흡사항 조치", label: "관리사항 및 미흡사항 조치" },
      { value: "조치이행여부 점검", label: "조치이행여부 점검" },
      { value: "교육 및 훈련 지원", label: "교육 및 훈련 지원" },
      { value: "조서 및 제재조치결과 보고", label: "조서 및 제재조치결과 보고" }
    ],
    department: [
      { value: "ETF투자부문", label: "ETF투자부문" },
      { value: "감사실", label: "감사실" },
      { value: "경영관리부문", label: "경영관리부문" },
      { value: "공통", label: "공통" }
    ],
    team: [
      { value: "금융영업팀", label: "금융영업팀" },
      { value: "운용팀", label: "운용팀" },
      { value: "리스크관리팀", label: "리스크관리팀" },
      { value: "내부감사팀", label: "내부감사팀" },
      { value: "인사팀", label: "인사팀" },
      { value: "재무팀", label: "재무팀" },
      { value: "회계팀", label: "회계팀" },
      { value: "개인정보보호팀", label: "개인정보보호팀" },
      { value: "내부통제팀", label: "내부통제팀" }
    ]
  };
   
  // 페이지네이션 관련 상태 관리 (UI 표시용)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정 (UI 표시용)

  // 실제 데이터는 모두 표시
  const currentData = managementActionData;

  // 수정 버튼 클릭 핸들러
  const handleEdit = (row: any) => {
    setEditingRow(row);
    setIsEditMode(true);
    
    // 기존 데이터를 폼에 설정
    setFormData({
      managementActionCode: row.managementActionCode || '',
      managementAction: row.managementAction || '',
      department: row.department || '',
      team: row.team || '',
      manager: row.manager || '',
      reviewer: row.reviewer || ''
    });
    setShowAddForm(true);
  };

  // 컬럼 정의
  const columns: any[] = [
    {
      key: "managementActionCode" as keyof ManagementActionData,
      header: "관리조치코드",
      visible: true,
      width: "w-32"
    },
    {
      key: "managementAction" as keyof ManagementActionData,
      header: "관리조치",
      visible: true,
      width: "w-48"
    },
    {
      key: "department" as keyof ManagementActionData,
      header: "소관부서",
      visible: true,
      width: "w-40"
    },
    {
      key: "team" as keyof ManagementActionData,
      header: "소관팀",
      visible: true,
      width: "w-40"
    },
    {
      key: "manager" as keyof ManagementActionData,
      header: "담당자",
      visible: true,
      width: "w-32"
    },
    {
      key: "reviewer" as keyof ManagementActionData,
      header: "리뷰어",
      visible: true,
      width: "w-32"
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

  // columns가 정의된 후 tableColumns 초기화
  useEffect(() => {
    setTableColumns(columns);
  }, []);

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
  const handleFormDataChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    console.log('새 부서별 관리조치 추가:', formData);
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
        <H1 title="관리조치 수행팀 정보" />
        
        {/* 복잡한 데이터 테이블 */}
        <ComplexDataTable
          data={currentData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          searchPlaceholder="관리조치 수행팀 정보 검색..."
          isLoading={false}
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={[
            {
              key: "referenceDate",
              label: "조회기준일자",
              type: "date" as const,
              width: "w-32",
              required: true
            },
            {
              key: "managementAction",
              label: "관리조치",
              type: "dropdown" as const,
              width: "w-48"
            },
            {
              key: "department",
              label: "소관부서",
              type: "dropdown" as const,
              width: "w-32"
            },
            {
              key: "team",
              label: "소관팀",
              type: "dropdown" as const,
              width: "w-32"
            }
          ]}
          // 추가 버전 2 사용
          enableAddFormV2={true}
          addFormV2Modal={
            <AddDepartmentForm
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
          // 엑셀업로드, 삭제, 추가 버튼 활성화
          enableExcelUpload={true}
          enableBulkDelete={true}
          enableAddButton={true}
          onExcelUpload={() => console.log('엑셀업로드')}
          onBulkDelete={(selectedIds: string[]) => {
            console.log('일괄 삭제:', selectedIds);
            alert(`${selectedIds.length}개의 관리조치가 삭제되었습니다.`);
          }}
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
        
        {/* 부서별 관리조치 추가/수정 모달 */}
        <AddDepartmentForm
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
