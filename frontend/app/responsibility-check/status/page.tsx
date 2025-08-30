"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';
import { ResponsibilityCheckStatusData, responsibilityCheckStatusData } from '@/data/responsibility-check-status-data';
import ControlActivityModal from '@/components/ControlActivityModal';

// 수행현황 상태별 색상 컴포넌트
const PerformanceStatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '점검승인대기':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case '점검승인완료':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default function ResponsibilityCheckStatusPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  
  // 모달 관련 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedControlActivity, setSelectedControlActivity] = useState<any>(null);
  
  // 검색/필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    group: '',
    responsibleDepartment: '',
    assignee: '',
    managementActionCode: '',
    targetYear: '',
    processingStatus: '',
    responsibleTeam: ''
  });
   
  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 통제활동코드 클릭 핸들러
  const handleControlActivityClick = (row: ResponsibilityCheckStatusData) => {
    setSelectedControlActivity({
      responsibilityType: row.responsibilityType,
      responsibilityDetailCode: row.responsibilityDetailCode,
      responsibility: row.responsibility,
      responsibilityDetailContent: row.responsibilityDetailContent,
      managementDuty: row.managementDuty,
      managementActionCode: row.managementActionCode,
      managementAction: row.managementAction,
      managementActionType: row.managementActionType,
      controlActivityCode: row.controlActivityCode,
      controlActivityName: row.controlActivityName,
      controlActivity: row.controlActivity,
      controlActivityCycle: row.controlActivityCycle,
      responsibleDepartment: row.responsibleDepartment,
      responsibleTeam: row.responsibleTeam,
      responsiblePerson: row.assignee,
      evidence: row.evidence
    });
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedControlActivity(null);
  };

  // 필터 옵션들
  const filterOptions = {
    group: [
      { value: "전체", label: "전체" },
      { value: "경영관리그룹", label: "경영관리그룹" },
      { value: "투자운용그룹", label: "투자운용그룹" },
      { value: "IT그룹", label: "IT그룹" },
      { value: "인사그룹", label: "인사그룹" },
      { value: "재무그룹", label: "재무그룹" }
    ],
    responsibleDepartment: [
      { value: "전체", label: "전체" },
      { value: "준법감시실", label: "준법감시실" },
      { value: "리스크관리부", label: "리스크관리부" },
      { value: "영업기획그룹", label: "영업기획그룹" },
      { value: "개인그룹", label: "개인그룹" },
      { value: "CIB그룹", label: "CIB그룹" }
    ],
    assignee: [
      { value: "전체", label: "전체" },
      { value: "김철수", label: "김철수" },
      { value: "김민수", label: "김민수" },
      { value: "이영희", label: "이영희" },
      { value: "박민수", label: "박민수" },
      { value: "정수진", label: "정수진" }
    ],
    managementActionCode: [
      { value: "전체", label: "전체" },
      { value: "BD-경영관리-C1", label: "BD-경영관리-C1" },
      { value: "BD-경영관리-C2", label: "BD-경영관리-C2" },
      { value: "BD-경영관리-C3", label: "BD-경영관리-C3" },
      { value: "EQ-금융업무-B1", label: "EQ-금융업무-B1" }
    ],
    targetYear: [
      { value: "전체", label: "전체" },
      { value: "2024", label: "2024년" },
      { value: "2023", label: "2023년" },
      { value: "2022", label: "2022년" },
      { value: "2021", label: "2021년" }
    ],
    processingStatus: [
      { value: "전체", label: "전체" },
      { value: "진행중", label: "진행중" },
      { value: "완료", label: "완료" },
      { value: "보류", label: "보류" },
      { value: "취소", label: "취소" }
    ]
  };

  // 컬럼 정의
  const columns: any[] = [
    {
      key: "managementActionCode" as keyof ResponsibilityCheckStatusData,
      header: "관리조치코드",
      visible: true
    },
    {
      key: "managementAction" as keyof ResponsibilityCheckStatusData,
      header: "관리조치",
      visible: true
    },
    {
      key: "controlActivityCode" as keyof ResponsibilityCheckStatusData,
      header: "통제활동코드",
      visible: true,
      render: (value: any, row: any) => (
        <button
          className="text-blue-600 hover:text-blue-800 underline cursor-pointer text-left"
          onClick={() => handleControlActivityClick(row)}
        >
          {value}
        </button>
      )
    },
    {
      key: "controlActivity" as keyof ResponsibilityCheckStatusData,
      header: "통제활동",
      visible: true
    },
    {
      key: "controlActivityDetails" as keyof ResponsibilityCheckStatusData,
      header: "통제활동내용",
      visible: true
    },
    {
      key: "responsibleDepartment" as keyof ResponsibilityCheckStatusData,
      header: "소관부서",
      visible: true
    },
    {
      key: "assignee" as keyof ResponsibilityCheckStatusData,
      header: "담당자",
      visible: true
    },
    {
      key: "performanceStatus" as keyof ResponsibilityCheckStatusData,
      header: "수행현황",
      visible: true,
      render: (value: any, row: any) => (
        <PerformanceStatusBadge status={row.performanceStatus} />
      )
    }
  ];

  // 컴포넌트 마운트 시 컬럼 설정
  useEffect(() => {
    setTableColumns(columns);
  }, []);

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
    <div className="relative">
      <div className={`max-w-7xl mx-auto space-y-6 pt-6 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 title="책무 점검 현황" />
        

        <DataTable
          data={responsibilityCheckStatusData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={[
            {
              key: "group",
              label: "그룹",
              type: "dropdown" as const,
              width: "w-32"
            },
            {
              key: "responsibleDepartment",
              label: "담당부서",
              type: "dropdown" as const,
              width: "w-40"
            },
            {
              key: "assignee",
              label: "담당자",
              type: "dropdown" as const,
              width: "w-32"
            },
            {
              key: "managementActionCode",
              label: "관리조치코드",
              type: "dropdown" as const,
              width: "w-48"
            },
            {
              key: "targetYear",
              label: "대상연월",
              type: "dropdown" as const,
              width: "w-32"
            },
            {
              key: "processingStatus",
              label: "처리상태",
              type: "dropdown" as const,
              width: "w-32"
            }
          ]}
          // 추가 버튼 및 체크박스 비활성화
          enableAddForm={false}
          enableRowSelection={false}
          // 삭제 기능 비활성화
          enableBulkDelete={false}
          // 액션 컬럼 비활성화
          showActionColumn={false}
        />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6 mb-8"
        />

        {/* 통제활동 모달 */}
        <ControlActivityModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={selectedControlActivity}
        />
      </div>
    </div>
  );
}
