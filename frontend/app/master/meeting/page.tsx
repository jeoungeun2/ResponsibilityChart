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
import { MeetingData, meetingSampleData } from '@/data/meeting-data';
import AddMeetingForm from './_components/AddMeetingForm';

export default function MeetingMasterPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    meetingBody: '',
    employeeId: '',
    name: ''
  });

  // H1 필터용 추가 상태 관리
  const [h1Filters, setH1Filters] = useState<Record<string, string>>({
    meetingBody: '',
    roleType: '',
    name: ''
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
  const currentData = meetingSampleData;

  // 수정 버튼 클릭 핸들러
  const handleEdit = (row: any) => {
    setEditingRow(row);
    setIsEditMode(true);
    
    // 기존 데이터를 폼에 설정
    setFormData({
      meetingBody: row.meetingBody || '',
      roleType: row.roleType || '',
      meetingFrequency: row.meetingFrequency || '',
      mainDecisions: row.mainDecisions || '',
      employeeId: row.employeeId || '',
      name: row.name || '',
      effectiveStartDate: row.effectiveStartDate || '',
      effectiveEndDate: row.effectiveEndDate || ''
    });
    setShowAddForm(true);
  };

  // 컬럼 정의
  const columns: any[] = [
    {
      key: "meetingBody" as keyof MeetingData,
      header: "주관회의체",
      visible: true,
      width: "w-32"
    },
    {
      key: "roleType" as keyof MeetingData,
      header: "위원장/위원",
      visible: true,
      width: "w-28"
    },
    {
      key: "meetingFrequency" as keyof MeetingData,
      header: "개최주기",
      visible: true,
      width: "w-24"
    },
    {
      key: "mainDecisions" as keyof MeetingData,
      header: "주요심의의결사항",
      visible: true,
      width: "w-48"
    },
    {
      key: "employeeId" as keyof MeetingData,
      header: "사번",
      visible: true,
      width: "w-24"
    },
    {
      key: "name" as keyof MeetingData,
      header: "성명",
      visible: true,
      width: "w-24"
    },
    {
      key: "effectiveStartDate" as keyof MeetingData,
      header: "적용시작일자",
      visible: true,
      width: "w-32"
    },
    {
      key: "effectiveEndDate" as keyof MeetingData,
      header: "적용종료일자",
      visible: true,
      width: "w-32",
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
    meetingBody: [
      { value: "이사회", label: "이사회" },
      { value: "리스크관리위원회", label: "리스크관리위원회" },
      { value: "감사위원회", label: "감사위원회" },
      { value: "투자위원회", label: "투자위원회" },
      { value: "IT위원회", label: "IT위원회" },
      { value: "소비자보호위원회", label: "소비자보호위원회" },
      { value: "경영관리위원회", label: "경영관리위원회" }
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
  const handleAdd = (newData: any) => {
    console.log('폼 데이터:', newData);
    console.log('멤버 데이터:', newData.members);
    if (isEditMode) {
      alert('수정되었습니다.');
    } else {
      alert('추가되었습니다.');
    }
    handleCloseModal();
  };

  // 일괄 삭제 핸들러
  const handleBulkDelete = (selectedIds: string[]) => {
    if (confirm(`선택된 ${selectedIds.length}개의 회의체 정보를 삭제하시겠습니까?`)) {
      console.log('일괄 삭제:', selectedIds);
      alert(`${selectedIds.length}개의 회의체 정보가 삭제되었습니다.`);
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
        <H1 
          title="회의체 Master" 
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
              key: "meetingBody",
              label: "회의체",
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
          // 추가 버전 2 사용 (조직 마스터와 동일하게)
          enableAddFormV2={true}
          addFormV2Modal={
            <AddMeetingForm
              isOpen={showAddForm}
              onClose={handleCloseModal}
              onSubmit={handleAdd}
              isEditMode={isEditMode}
              initialData={editingRow}
            />
          }
          onShowAddFormV2={handleShowAddForm}
          // 기존 추가 폼 비활성화
          enableAddForm={false}
          showAddForm={showAddForm}
          onShowAddForm={() => {}}
          formData={formData}
          formFields={[]}
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
