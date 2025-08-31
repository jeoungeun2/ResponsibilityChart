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
    division: ''
  });

  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  // 필터 옵션 데이터
  const filterOptions = {
    division: [
      { value: "ETF투자부문", label: "ETF투자부문" },
      { value: "감사실", label: "감사실" },
      { value: "경영관리부문", label: "경영관리부문" },
      { value: "공통", label: "공통" }
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
      division: row.division || '',
      responsibilityCode: row.responsibilityCode || '',
      responsibility: row.responsibility || '',
      detailCode: row.detailCode || '',
      detailContent: row.detailContent || ''
    });
    setShowAddForm(true);
  };

  // 컬럼 정의
  const columns: any[] = [
    {
      key: "division" as keyof ManagementActionData,
      header: "부문구분",
      visible: true,
      width: "w-32"
    },
    {
      key: "responsibilityCode" as keyof ManagementActionData,
      header: "책무코드",
      visible: true,
      width: "w-40"
    },
    {
      key: "responsibility" as keyof ManagementActionData,
      header: "책무",
      visible: true,
      width: "w-80"
    },
    {
      key: "detailCode" as keyof ManagementActionData,
      header: "책무 세부코드",
      visible: true,
      width: "w-48"
    },
    {
      key: "detailContent" as keyof ManagementActionData,
      header: "책무 세부내용",
      visible: true,
      width: "w-80"
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
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12 " />
              </svg>
              <span>책무 데이터 업로드</span>
            </button>
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>책무 데이터 다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`max-w-7xl mx-auto space-y-6 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 title="부서별 관리조치 Master" />
        
        {/* 복잡한 데이터 테이블 */}
        <ComplexDataTable
          data={currentData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          searchPlaceholder="부서별 관리조치 검색..."
          isLoading={false}
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={[
            {
              key: "division",
              label: "부문구분",
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
