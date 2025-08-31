"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { ComplexDataTable } from '@/components/ui/complex-data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../executive/_components/Breadcrumb';
import Header from '../executive/_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { ExecutiveData, executiveSampleData } from '@/data/executive-data';
import AddExecutiveForm from './_components/AddExecutiveForm';

export default function ExecutiveFrontPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    position: '',
    jobTitle: '',
    name: '',
    term: '',
    termStartDate: '',
    termEndDate: ''
  });

  // H1 필터용 추가 상태 관리
  const [h1Filters, setH1Filters] = useState<Record<string, string>>({
    position: '',
    jobTitle: '',
    managedOrganization: ''
  });

  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 실제 데이터는 모두 표시
  const currentData = executiveSampleData;

  // 수정 버튼 클릭 핸들러
  const handleEdit = (row: any) => {
    setEditingRow(row);
    setIsEditMode(true);
    
    // 기존 데이터를 폼에 설정
    setFormData({
      name: row.name || '',
      position: row.position || '',
      jobTitle: row.jobTitle || '',
      employeeId: row.employeeId || '',
      phoneNumber: row.phoneNumber || '',
      email: row.email || '',
      termStartDate: row.termStartDate || '',
      termEndDate: row.termEndDate || '',
      hasConcurrentPosition: row.hasConcurrentPosition || '',
      concurrentPositionDetails: row.concurrentPositionDetails || ''
    });
    setShowAddForm(true);
  };

  // 컬럼 정의
  const columns: any[] = [
    {
      key: "name" as keyof ExecutiveData,
      header: "성명",
      visible: true,
      width: "w-24"
    },
    {
      key: "position" as keyof ExecutiveData,
      header: "직책",
      visible: true,
      width: "w-32"
    },
    {
      key: "jobTitle" as keyof ExecutiveData,
      header: "직위",
      visible: true,
      width: "w-24"
    },
    {
      key: "employeeId" as keyof ExecutiveData,
      header: "사번",
      visible: true,
      width: "w-24"
    },
    {
      key: "phoneNumber" as keyof ExecutiveData,
      header: "전화번호",
      visible: true,
      width: "w-32"
    },
    {
      key: "email" as keyof ExecutiveData,
      header: "이메일",
      visible: true,
      width: "w-48"
    },
    {
      key: "term" as keyof ExecutiveData,
      header: "임기",
      visible: true,
      width: "w-40"
    },
    {
      key: "hasConcurrentPosition",
      header: "겸직여부",
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

  // columns가 정의된 후 tableColumns 상태를 업데이트
  useEffect(() => {
    setTableColumns(columns);
  }, []);

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

  // H1 필터 변경 핸들러
  const handleH1FilterChange = (key: string, value: string) => {
    setH1Filters(prev => ({
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
    console.log('새 임원정보 추가:', formData);
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
      <div className={`max-w-7xl mx-auto space-y-6 pt-4 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
       
        <H1 
          title="임원관리 Master" 
        />
        
        {/* 복잡한 데이터 테이블 */}
        <ComplexDataTable
          data={currentData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          searchPlaceholder="임원정보 검색..."
          isLoading={false}
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={[
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
            },
            {
              key: "termStartDate",
              label: "임기시작일",
              type: "date" as const,
              width: "w-40"
            },
            {
              key: "termEndDate",
              label: "임기종료일",
              type: "date" as const,
              width: "w-40"
            }
          ]}
          // 추가 버전 2 사용
          enableAddFormV2={true}
          addFormV2Modal={
            <AddExecutiveForm
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

        {/* 임원정보 추가/수정 모달 */}
        <AddExecutiveForm
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
