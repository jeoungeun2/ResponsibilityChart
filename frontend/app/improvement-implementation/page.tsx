"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from './_components/Breadcrumb';
import Header from './_components/Header';
import { useSidebar } from '@/config/providers';
import { ImprovementImplementationData, improvementImplementationData } from '@/data/improvement-implementation-data';
import StatusBadge from '@/components/ui/StatusBadge';
import { SearchFilter, FilterConfig } from '@/components/ui/SearchFilter';
import ImprovementImplementationModal from '@/components/ImprovementImplementationModal';

export default function ImprovementImplementationPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  
  // 모달 관련 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<ImprovementImplementationData | null>(null);
  
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
    approvalStatus: ''
  });
   
  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 조치 버튼 클릭 핸들러
  const handleActionClick = (row: ImprovementImplementationData) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  // 모달 모드 결정
  const getModalMode = () => {
    return selectedRowData?.approvalStatus === "미등록" ? 'register' : 'approve';
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
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
      { value: "CIB그룹", label: "CIB그룹" },
      { value: "자산관리그룹", label: "자산관리그룹" },
      { value: "투자운용그룹", label: "투자운용그룹" },
      { value: "IT그룹", label: "IT그룹" },
      { value: "인사그룹", label: "인사그룹" },
      { value: "재무그룹", label: "재무그룹" },
      { value: "법무그룹", label: "법무그룹" },
      { value: "구매그룹", label: "구매그룹" },
      { value: "품질그룹", label: "품질그룹" },
      { value: "환경그룹", label: "환경그룹" },
      { value: "고객서비스그룹", label: "고객서비스그룹" }
    ],
    responsibleTeam: [
      { value: "전체", label: "전체" },
      { value: "준법감시팀", label: "준법감시팀" },
      { value: "신용리스크팀", label: "신용리스크팀" },
      { value: "영업기획팀", label: "영업기획팀" },
      { value: "개인영업팀", label: "개인영업팀" },
      { value: "기업금융팀", label: "기업금융팀" },
      { value: "자산관리팀", label: "자산관리팀" },
      { value: "투자운용팀", label: "투자운용팀" },
      { value: "보안팀", label: "보안팀" },
      { value: "인사관리팀", label: "인사관리팀" },
      { value: "재무관리팀", label: "재무관리팀" },
      { value: "법무관리팀", label: "법무관리팀" },
      { value: "구매관리팀", label: "구매관리팀" },
      { value: "품질관리팀", label: "품질관리팀" },
      { value: "환경관리팀", label: "환경관리팀" },
      { value: "고객서비스팀", label: "고객서비스팀" }
    ],
    assignee: [
      { value: "전체", label: "전체" },
      { value: "박○○", label: "박○○" },
      { value: "김○○", label: "김○○" },
      { value: "이○○", label: "이○○" },
      { value: "최○○", label: "최○○" },
      { value: "정○○", label: "정○○" },
      { value: "송○○", label: "송○○" },
      { value: "한○○", label: "한○○" },
      { value: "강○○", label: "강○○" },
      { value: "윤○○", label: "윤○○" },
      { value: "임○○", label: "임○○" },
      { value: "조○○", label: "조○○" },
      { value: "백○○", label: "백○○" },
      { value: "남○○", label: "남○○" },
      { value: "서○○", label: "서○○" },
      { value: "황○○", label: "황○○" }
    ],
    managementActionCode: [
      { value: "전체", label: "전체" },
      { value: "BD-경영관리-C1", label: "BD-경영관리-C1" },
      { value: "EQ-금융업무-B1", label: "EQ-금융업무-B1" },
      { value: "CE-영업활동-A1", label: "CE-영업활동-A1" },
      { value: "CE-개인고객-A1", label: "CE-개인고객-A1" },
      { value: "CE-기업금융-A1", label: "CE-기업금융-A1" },
      { value: "CE-자산관리-A1", label: "CE-자산관리-A1" },
      { value: "CE-투자운용-A1", label: "CE-투자운용-A1" },
      { value: "CE-정보시스템-A1", label: "CE-정보시스템-A1" },
      { value: "CE-인사관리-A1", label: "CE-인사관리-A1" },
      { value: "CE-재무관리-A1", label: "CE-재무관리-A1" },
      { value: "CE-법무관리-A1", label: "CE-법무관리-A1" },
      { value: "CE-구매관리-A1", label: "CE-구매관리-A1" },
      { value: "CE-품질관리-A1", label: "CE-품질관리-A1" },
      { value: "CE-환경관리-A1", label: "CE-환경관리-A1" },
      { value: "CE-고객서비스-A1", label: "CE-고객서비스-A1" }
    ],
    targetYear: [
      { value: "2025", label: "2025년" },
      { value: "2024", label: "2024년" },
      { value: "2023", label: "2023년" },
      { value: "2022", label: "2022년" },
      { value: "2021", label: "2021년" }
    ],
    approvalStatus: [
      { value: "전체", label: "전체" },
      { value: "승인대기", label: "승인대기" },
      { value: "승인완료", label: "승인완료" },
      { value: "반려", label: "반려" },
      { value: "미등록", label: "미등록" }
    ]
  };

  // 컬럼 정의
  const columns: any[] = [
    {
      key: "managementActionCode" as keyof ImprovementImplementationData,
      header: "관리조치코드",
      visible: true
    },
    {
      key: "managementAction" as keyof ImprovementImplementationData,
      header: "관리조치",
      visible: true
    },
    {
      key: "responsibleDepartment" as keyof ImprovementImplementationData,
      header: "소관부서",
      visible: true
    },
    {
      key: "responsibleTeam" as keyof ImprovementImplementationData,
      header: "소관팀",
      visible: true
    },
    {
      key: "assignee" as keyof ImprovementImplementationData,
      header: "담당자",
      visible: true
    },
    {
      key: "reviewer" as keyof ImprovementImplementationData,
      header: "리뷰어",
      visible: true
    },
    {
      key: "responsibleExecutive" as keyof ImprovementImplementationData,
      header: "담당임원",
      visible: true
    },
    {
      key: "deficiency" as keyof ImprovementImplementationData,
      header: "미흡사항",
      visible: true
    },
    {
      key: "improvementPlan" as keyof ImprovementImplementationData,
      header: "개선계획",
      visible: true
    },
    {
      key: "improvementPlanRegistrationDate" as keyof ImprovementImplementationData,
      header: "개선계획등록일",
      visible: true
    },
    {
      key: "improvementImplementationResult" as keyof ImprovementImplementationData,
      header: "개선계획이행결과",
      visible: true
    },
    {
      key: "implementationResultDate" as keyof ImprovementImplementationData,
      header: "이행결과작성일",
      visible: true
    },
    {
      key: "approvalStatus" as keyof ImprovementImplementationData,
      header: "이행결과결재상태",
      visible: true,
      render: (value: any, row: any) => (
        <div className="min-w-[80px]">
          <StatusBadge status={row.approvalStatus} />
        </div>
      )
    },
    {
      key: "action" as keyof ImprovementImplementationData,
      header: "조치",
      visible: true,
      width: "w-20",
      render: (value: any, row: any) => {
        const buttonText = row.approvalStatus === "미등록" ? "개선이행" : "상세보기";
        const buttonTitle = row.approvalStatus === "미등록" ? "개선이행" : "상세보기";
        const isImprovementButton = row.approvalStatus === "미등록";
        
        return (
          <div className="flex items-center justify-center w-full h-full">
            <button
              className={`px-2 py-1 text-xs border transition-colors cursor-pointer ${
                isImprovementButton 
                  ? 'border-orange-400 text-orange-500 bg-orange-50 hover:bg-orange-100' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleActionClick(row)}
              title={buttonTitle}
            >
              {buttonText}
            </button>
          </div>
        );
      }
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
        <H1 title="미흡사항개선 이행내역" />
        
        <DataTable
          data={improvementImplementationData}
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
              key: "approvalStatus",
              label: "이행결과결재상태",
              type: "dropdown" as const,
              width: "w-40"
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

        {/* 미흡사항개선이행등록 모달 */}
        <ImprovementImplementationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={selectedRowData}
          mode={getModalMode()}
        />
      </div>
    </div>
  );
}
