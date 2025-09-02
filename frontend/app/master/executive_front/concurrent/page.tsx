"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../../executive/_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { ExecutiveConcurrentData, executiveConcurrentSampleData } from '@/data/executive-concurrent-data';
import AddExecutiveForm from '../_components/AddExecutiveForm';

export default function ExecutiveFrontConcurrentPage() {
  const { isSidebarCollapsed } = useSidebar();
  const pathname = usePathname();
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    hasInternalConcurrent: '',
    hasExternalConcurrent: '',
    employeeId: '',
    name: ''
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
  const currentData = executiveConcurrentSampleData;

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
      key: "name" as keyof ExecutiveConcurrentData,
      header: "성명",
      visible: true,
      width: "w-20"
    },
    {
      key: "jobTitle" as keyof ExecutiveConcurrentData,
      header: "직위",
      visible: true,
      width: "w-24"
    },
    {
      key: "employeeId" as keyof ExecutiveConcurrentData,
      header: "사번",
      visible: true,
      width: "w-24"
    },
    {
      key: "hasInternalConcurrent" as keyof ExecutiveConcurrentData,
      header: "사내겸직여부",
      visible: true,
      width: "w-28"
    },
    {
      key: "internalConcurrentPosition" as keyof ExecutiveConcurrentData,
      header: "겸직직책",
      visible: true,
      width: "w-40",
      render: (value: any, row: any) => (
        <span>{value || '-'}</span>
      )
    },
    {
      key: "hasExternalConcurrent" as keyof ExecutiveConcurrentData,
      header: "사외겸직여부",
      visible: true,
      width: "w-28"
    },
    {
      key: "externalConcurrentIndustry" as keyof ExecutiveConcurrentData,
      header: "사외겸직업종",
      visible: true,
      width: "w-32",
      render: (value: any, row: any) => (
        <span>{value || '-'}</span>
      )
    },
    {
      key: "externalConcurrentCompany" as keyof ExecutiveConcurrentData,
      header: "사외겸직회사",
      visible: true,
      width: "w-40",
      render: (value: any, row: any) => (
        <span>{value || '-'}</span>
      )
    },
    {
      key: "externalConcurrentJobTitle" as keyof ExecutiveConcurrentData,
      header: "사외겸직직위",
      visible: true,
      width: "w-28",
      render: (value: any, row: any) => (
        <span>{value || '-'}</span>
      )
    },
    {
      key: "externalConcurrentPosition" as keyof ExecutiveConcurrentData,
      header: "사외겸직직책",
      visible: true,
      width: "w-36",
      render: (value: any, row: any) => (
        <span>{value || '-'}</span>
      )
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
    hasInternalConcurrent: [
      { value: "있음", label: "있음" },
      { value: "없음", label: "없음" }
    ],
    hasExternalConcurrent: [
      { value: "있음", label: "있음" },
      { value: "없음", label: "없음" }
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

  // 폼 데이터 변경 핸들러
  const handleFormDataChange = (data: Record<string, string>) => {
    setFormData(data);
  };

  // 추가/수정 핸들러
  const handleAdd = (newData: Record<string, string>) => {
    console.log('폼 데이터:', newData);
    if (isEditMode) {
      alert('수정되었습니다.');
    } else {
      alert('추가되었습니다.');
    }
    handleCloseModal();
  };

  // 일괄 삭제 핸들러
  const handleBulkDelete = (selectedIds: string[]) => {
    if (confirm(`선택된 ${selectedIds.length}명의 임원을 삭제하시겠습니까?`)) {
      console.log('일괄 삭제:', selectedIds);
      alert(`${selectedIds.length}명의 임원이 삭제되었습니다.`);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`페이지 ${page}로 이동`);
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
        
        {/* 탭 네비게이션 */}
        <div className="flex space-x-1 border-b border-gray-200">
          <Link href="/master/executive_front" className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            pathname === '/master/executive_front' 
              ? 'text-brand-600 border-brand-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
          }`}>
            임원리스트 관리
          </Link>
          <Link href="/master/executive_front/position" className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            pathname === '/master/executive_front/position' 
              ? 'text-brand-600 border-brand-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
          }`}>
            임원별 직책관리
          </Link>
          <Link href="/master/executive_front/concurrent" className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            pathname === '/master/executive_front/concurrent' 
              ? 'text-brand-600 border-brand-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
          }`}>
            겸직내역 관리
          </Link>
          <Link href="/master/executive_front/evaluation" className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            pathname === '/master/executive_front/evaluation' 
              ? 'text-brand-600 border-brand-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
          }`}>
            임원적격성평가
          </Link>
        </div>
        
        <H1 
          title="겸직내역 관리" 
        />
        
        <DataTable
          data={currentData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={[
            {
              key: "hasInternalConcurrent",
              label: "사내겸직여부",
              type: "dropdown" as const,
              width: "w-32"
            },
            {
              key: "hasExternalConcurrent",
              label: "사외겸직여부",
              type: "dropdown" as const,
              width: "w-32"
            },
            {
              key: "employeeId",
              label: "사번",
              type: "input" as const,
              width: "w-32"
            },
            {
              key: "name",
              label: "성명",
              type: "input" as const,
              width: "w-32"
            }
          ]}
          // 체크박스 활성화
          enableRowSelection={true}
          // 일괄 삭제 버튼 활성화
          enableBulkDelete={true}
          // 일괄 삭제 핸들러
          onBulkDelete={handleBulkDelete}
          // 추가 버튼 비활성화
          enableAddFormV2={false}
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
