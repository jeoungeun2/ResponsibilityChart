"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../executive/_components/Breadcrumb';
import Header from '../executive/_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { DutyData, sampleData } from '@/data/department-data';
import AddDutyForm from './_components/AddDutyForm';




export default function DepartmentPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // 수정 폼 관련 상태 관리
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState<Record<string, any>>({});
   
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    category: '',
    department: '',
    responsibilityName: '',
    position: '',
    executive: '',
    departmentGroup: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 수정 버튼 클릭 핸들러
  const handleEdit = (row: any) => {
    setEditFormData(row);
    setShowEditForm(true);
  };

  // 추가 처리 핸들러 (기능 없음)
  const handleAdd = () => {
    console.log('추가 기능은 구현되지 않았습니다.', formData);
    // 여기에 실제 추가 로직을 구현할 수 있습니다
  };

  // 수정 처리 핸들러 (기능 없음)
  const handleEditSubmit = () => {
    console.log('수정 기능은 구현되지 않았습니다.', editFormData);
    // 여기에 실제 수정 로직을 구현할 수 있습니다
    setShowEditForm(false);
  };

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
      key: "position" as keyof DutyData,
      header: "직책",
      visible: true
    },
    {
      key: "executive" as keyof DutyData,
      header: "임원",
      visible: true
    },
    {
      key: "actions",
      header: "액션",
      visible: true,
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-2">
          <EditIcon 
            className="h-4 w-4 cursor-pointer" 
            onClick={() => handleEdit(row)}
          />
          <DeleteIcon 
            className="h-4 w-4 cursor-pointer" 
            onClick={() => console.log('삭제:', row.id)}
          />
        </div>
      )
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // 필터 설정 정의
  const filters = [
    {
      key: "department",
      label: "부문",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "category",
      label: "책무구분",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "responsibilityName",
      label: "책무명",
      type: "dropdown" as const,
      width: "w-48"
    },
    {
      key: "departmentGroup",
      label: "부서/본부",
      type: "dropdown" as const,
      width: "w-40"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    category: [
      { value: "지정책임자", label: "지정책임자" },
      { value: "경영관리", label: "경영관리" },
      { value: "금융", label: "금융" }
    ],
    department: [
      { value: "전체", label: "전체" },
      { value: "ETF투자부문", label: "ETF투자부문" },
      { value: "자산운용부문", label: "자산운용부문" },
      { value: "자산관리부문", label: "자산관리부문" },
      { value: "글로벌투자부문", label: "글로벌투자부문" },
      { value: "준법감시실", label: "준법감시실" },
      { value: "IT부문", label: "IT부문" },
      { value: "인사부문", label: "인사부문" },
      { value: "재무부문", label: "재무부문" },
      { value: "법무부문", label: "법무부문" }
    ],
    responsibilityName: [
      { value: "전체", label: "전체" },
      { value: "경영지원업무와 관련된 책무", label: "경영지원업무와 관련된 책무" },
      { value: "인사관리업무와 관련된 책무", label: "인사관리업무와 관련된 책무" },
      { value: "재무관리업무와 관련된 책무", label: "재무관리업무와 관련된 책무" },
      { value: "정보관리업무와 관련된 책무", label: "정보관리업무와 관련된 책무" },
      { value: "법무관리업무와 관련된 책무", label: "법무관리업무와 관련된 책무" },
      { value: "보안관리업무와 관련된 책무", label: "보안관리업무와 관련된 책무" },
      { value: "품질관리업무와 관련된 책무", label: "품질관리업무와 관련된 책무" },
      { value: "환경관리업무와 관련된 책무", label: "환경관리업무와 관련된 책무" },
      { value: "시설관리업무와 관련된 책무", label: "시설관리업무와 관련된 책무" },
      { value: "구매관리업무와 관련된 책무", label: "구매관리업무와 관련된 책무" },
      { value: "물류관리업무와 관련된 책무", label: "물류관리업무와 관련된 책무" },
      { value: "고객관리업무와 관련된 책무", label: "고객관리업무와 관련된 책무" },
      { value: "마케팅관리업무와 관련된 책무", label: "마케팅관리업무와 관련된 책무" },
      { value: "연구개발관리업무와 관련된 책무", label: "연구개발관리업무와 관련된 책무" },
      { value: "지식관리업무와 관련된 책무", label: "지식관리업무와 관련된 책무" }
    ],
    departmentGroup: [
      { value: "전체", label: "전체" },
      { value: "투자본부", label: "투자본부" },
      { value: "운용본부", label: "운용본부" },
      { value: "관리본부", label: "관리본부" },
      { value: "지원본부", label: "지원본부" },
      { value: "감시본부", label: "감시본부" }
    ]
  };



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
        <H1 title="책무관리 Master" />
        
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
          // 추가 버전 2 사용
          enableAddFormV2={true}
          addFormV2Modal={
            <AddDutyForm
              open={showAddForm}
              onOpenChange={setShowAddForm}
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onAdd={handleAdd}
              isLoading={false}
              disabled={false}
              mode="add"
            />
          }
          onShowAddFormV2={() => setShowAddForm(true)}
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
        
        {/* 책무 추가 모달 */}
        <AddDutyForm
          open={showAddForm}
          onOpenChange={setShowAddForm}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onAdd={handleAdd}
          isLoading={false}
          disabled={false}
          mode="add"
        />

        {/* 책무 수정 모달 */}
        <AddDutyForm
          open={showEditForm}
          onOpenChange={setShowEditForm}
          formData={editFormData}
          onFormDataChange={(field: string, value: any) => {
            setEditFormData(prev => ({
              ...prev,
              [field]: value
            }));
          }}
          onAdd={handleEditSubmit}
          isLoading={false}
          disabled={false}
          mode="edit"
        />
      </div>
    </div>
  );
}
