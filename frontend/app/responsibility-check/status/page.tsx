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
import StatusBadge from '@/components/ui/StatusBadge';
import { SearchFilter, FilterConfig } from '@/components/ui/SearchFilter';



export default function ResponsibilityCheckStatusPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  
  // 모달 관련 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedControlActivity, setSelectedControlActivity] = useState<any>(null);
  
  // 검색/필터 관련 상태 관리
  // 현재 날짜 기준으로 디폴트 값 설정
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    targetYear: currentYear,
    targetMonth: currentMonth,
    responsibleDepartment: '',
    responsibleTeam: '',
    assignee: '',
    managementActionCode: '',
    processingStatus: ''
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
    targetMonth: [
      { value: "1", label: "1월" },
      { value: "2", label: "2월" },
      { value: "3", label: "3월" },
      { value: "4", label: "4월" },
      { value: "5", label: "5월" },
      { value: "6", label: "6월" },
      { value: "7", label: "7월" },
      { value: "8", label: "8월" },
      { value: "9", label: "9월" },
      { value: "10", label: "10월" },
      { value: "11", label: "11월" },
      { value: "12", label: "12월" }
    ],
    responsibleDepartment: [
      { value: "전체", label: "전체" },
      { value: "준법감시실", label: "준법감시실" },
      { value: "리스크관리부", label: "리스크관리부" },
      { value: "영업기획그룹", label: "영업기획그룹" },
      { value: "개인그룹", label: "개인그룹" },
      { value: "CIB그룹", label: "CIB그룹" }
    ],
    responsibleTeam: [
      { value: "전체", label: "전체" },
      { value: "준법팀", label: "준법팀" },
      { value: "리스크팀", label: "리스크팀" },
      { value: "영업팀", label: "영업팀" },
      { value: "개인팀", label: "개인팀" },
      { value: "CIB팀", label: "CIB팀" }
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
      { value: "2025", label: "2025년" },
      { value: "2024", label: "2024년" },
      { value: "2023", label: "2023년" },
      { value: "2022", label: "2022년" },
      { value: "2021", label: "2021년" }
    ],
    processingStatus: [
      { value: "전체", label: "전체" },
      { value: "미이행", label: "미이행" },
      { value: "진행중", label: "진행중" },
      { value: "완료", label: "완료" }
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
      key: "controlActivityCycle" as keyof ResponsibilityCheckStatusData,
      header: "점검주기",
      visible: true
    },
    {
      key: "responsibleDepartment" as keyof ResponsibilityCheckStatusData,
      header: "소관부서",
      visible: true
    },
    {
      key: "responsibleTeam" as keyof ResponsibilityCheckStatusData,
      header: "소관팀",
      visible: true
    },
    {
      key: "assignee" as keyof ResponsibilityCheckStatusData,
      header: "담당자",
      visible: true
    },
    {
      key: "reviewer" as keyof ResponsibilityCheckStatusData,
      header: "리뷰어",
      visible: true
    },
    {
      key: "deadline" as keyof ResponsibilityCheckStatusData,
      header: "제출기한",
      visible: true,
      render: (value: any) => {
        // 현재 날짜 (실제 운영에서는 new Date() 사용)
        const today = new Date();
        // 날짜 문자열을 정확하게 파싱
        const deadline = new Date(value + 'T00:00:00');
        const isOverdue = deadline < today;
        
        return (
          <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-700'}>
            {value}
          </span>
        );
      }
    },
    {
      key: "managementActionImplementation" as keyof ResponsibilityCheckStatusData,
      header: "관리조치 이행",
      visible: true,
      width: "w-6",
      render: (value: any, row: any) => {
        const buttonText = (row.performanceStatus === "미이행" || row.performanceStatus === "진행중") 
          ? "관리조치이행" 
          : "이행내역수정";
        
        return (
          <div className="flex items-center justify-center w-full h-full">
            <button
              className="px-2 py-1 text-xs border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={() => handleControlActivityClick(row)}
              title={buttonText}
            >
              {buttonText}
            </button>
          </div>
        );
      }
    },
    {
      key: "performanceStatus" as keyof ResponsibilityCheckStatusData,
      header: "수행현황",
      visible: true,
      width: "w-20", // 열 너비 설정
      render: (value: any, row: any) => (
        <div className="min-w-[100px]">
          <StatusBadge status={row.performanceStatus} />
        </div>
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
      <Header 
        rightContent={
          <div className="flex items-center space-x-3">
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`w-full space-y-6 pt-14 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
        <CommonBreadcrumb />
        <H1 title="관리조치활동 수행" />
        

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
      key: "targetYear",
      label: "대상연도",
      type: "dropdown" as const,
      width: "w-32",
      required: true
    } as FilterConfig,
    {
      key: "targetMonth",
      label: "대상월",
      type: "dropdown" as const,
      width: "w-32",
      required: true
    } as FilterConfig,
            {
              key: "responsibleDepartment",
              label: "소관부서",
              type: "dropdown" as const,
              width: "w-40"
            },
            {
              key: "responsibleTeam",
              label: "소관팀",
              type: "dropdown" as const,
              width: "w-32"
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
