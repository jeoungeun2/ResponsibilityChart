"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';
import { ResponsibilityCheckManagementData, responsibilityCheckManagementData } from '@/data/responsibility-check-management-data';
import ResponsibilityCheckModal from '@/components/ResponsibilityCheckModal';
import StatusCard from '@/components/StatusCard';
import StatusBadge from '@/components/ui/StatusBadge';
import ActionButton from '@/components/ui/ActionButton';
import { SearchFilter, FilterConfig } from '@/components/ui/SearchFilter';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table2';

export default function ManagementPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 모달 관련 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<ResponsibilityCheckManagementData | null>(null);
  const [modalActionType, setModalActionType] = useState<'inspect' | 'view'>('inspect');
   
  // 필터 관련 상태 관리
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    targetYear: currentYear,
    targetMonth: currentMonth,
    responsibleDepartment: '',
    responsibleTeam: '',
    executiveName: '',
    implementationStatus: '',
    inspectionStatus: '',
    inspectionResult: '',
    reviewStatus: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 조치 버튼 클릭 핸들러
  const handleActionClick = (row: ResponsibilityCheckManagementData, actionType: 'inspect' | 'view') => {
    setSelectedRowData(row);
    setModalActionType(actionType);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  // 컬럼 정의 (함수 내부로 이동)
  const columns: any[] = [
    {
      key: "managementActionCode" as keyof ResponsibilityCheckManagementData,
      header: "관리조치코드",
      visible: true
    },
    {
      key: "managementAction" as keyof ResponsibilityCheckManagementData,
      header: "관리조치",
      visible: true
    },
    {
      key: "responsibleDepartment" as keyof ResponsibilityCheckManagementData,
      header: "소관부서",
      visible: true
    },
    {
      key: "responsibleTeam" as keyof ResponsibilityCheckManagementData,
      header: "소관팀",
      visible: true
    },
    {
      key: "assignee" as keyof ResponsibilityCheckManagementData,
      header: "담당자",
      visible: true
    },
    {
      key: "implementationDeadline" as keyof ResponsibilityCheckManagementData,
      header: "제출기한",
      visible: true
    },
    {
      key: "implementationStatus" as keyof ResponsibilityCheckManagementData,
      header: "이행상태",
      visible: true,
      render: (value: any, row: any) => (
        <div className="min-w-[80px]">
          <StatusBadge status={row.implementationStatus} />
        </div>
      )
    },
    {
      key: "reviewer" as keyof ResponsibilityCheckManagementData,
      header: "리뷰어",
      visible: true
    },
    {
      key: "reviewStatus" as keyof ResponsibilityCheckManagementData,
      header: "리뷰상태",
      visible: true,
      render: (value: any, row: any) => (
        <div className="min-w-[80px]">
          <StatusBadge status={row.reviewStatus} />
        </div>
      )
    },
    {
      key: "reviewDate" as keyof ResponsibilityCheckManagementData,
      header: "리뷰일자",
      visible: true
    },
    {
      key: "responsibleExecutive" as keyof ResponsibilityCheckManagementData,
      header: "담당임원",
      visible: true
    },
    {
      key: "inspectionStatus" as keyof ResponsibilityCheckManagementData,
      header: "점검상태",
      visible: true,
      render: (value: any, row: any) => (
        <div className="min-w-[70px]">
          <StatusBadge status={row.inspectionStatus} />
        </div>
      )
    },
    {
      key: "inspectionDate" as keyof ResponsibilityCheckManagementData,
      header: "점검일자",
      visible: true
    },
    {
      key: "inspectionResult" as keyof ResponsibilityCheckManagementData,
      header: "점검결과",
      visible: true,
      render: (value: any, row: any) => {
        const result = row.inspectionResult;
        if (result === '-') return <span className="text-gray-500">-</span>;
        
        let bgColor = '';
        let borderColor = '';
        if (result === '적정') {
          bgColor = 'bg-blue-100 text-blue-800';
          borderColor = 'border-blue-300';
        } else if (result === '보완필요' || result === '미흡') {
          bgColor = 'bg-red-100 text-red-800';
          borderColor = 'border-red-300';
        } else if (result === '대상없음') {
          bgColor = 'bg-gray-100 text-gray-800';
          borderColor = 'border-gray-300';
        }
        
        return (
          <span className={`px-2 py-1 text-xs font-medium w-[60px] text-center inline-block border border-dashed ${bgColor} ${borderColor}`}>
            {result}
          </span>
        );
      }
    },
    {
      key: "actions",
      header: "조치",
      visible: true,
      render: (value: any, row: any) => {
        const inspectionStatus = row.inspectionStatus;
        const implementationStatus = row.implementationStatus;
        const inspectionResult = row.inspectionResult;
        
        let actionType: 'inspect' | 'view';
        
        // 점검결과가 "대상없음"인 경우 상세보기
        if (inspectionResult === '대상없음') {
          actionType = 'view' as const;
        } else if (inspectionStatus === '완료' && implementationStatus === '승인요청') {
          actionType = 'view' as const;
        } else {
          actionType = 'inspect' as const;
        }
        
        return (
          <ActionButton
            actionType={actionType}
            onClick={() => handleActionClick(row, actionType)}
          />
        );
      }
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // 필터 설정 정의
  const filters = [
    {
      key: "targetYear",
      label: "대상연도",
      type: "dropdown" as const,
      width: "w-40",
      required: true
    } as FilterConfig,
    {
      key: "targetMonth",
      label: "대상월",
      type: "dropdown" as const,
      width: "w-40",
      required: true
    } as FilterConfig,
    {
      key: "responsibleDepartment",
      label: "소관부서",
      type: "dropdown" as const,
      width: "w-40"
    } as FilterConfig,
    {
      key: "responsibleTeam",
      label: "소관팀",
      type: "dropdown" as const,
      width: "w-40"
    } as FilterConfig,
    {
      key: "executiveName",
      label: "임원명",
      type: "input" as const,
      width: "w-40"
    } as FilterConfig,
    {
      key: "implementationStatus",
      label: "이행상태",
      type: "dropdown" as const,
      width: "w-40"
    } as FilterConfig,
    {
      key: "inspectionStatus",
      label: "점검상태",
      type: "dropdown" as const,
      width: "w-40"
    } as FilterConfig,
    {
      key: "inspectionResult",
      label: "점검결과",
      type: "dropdown" as const,
      width: "w-40"
    } as FilterConfig,
    {
      key: "reviewStatus",
      label: "리뷰상태",
      type: "dropdown" as const,
      width: "w-40"
    } as FilterConfig
  ];

  // 필터 옵션들
  const filterOptions = {
    targetYear: [
      { value: "2024", label: "2024년" },
      { value: "2023", label: "2023년" },
      { value: "2022", label: "2022년" },
      { value: "2021", label: "2021년" }
    ],
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
      { value: "준법감시팀", label: "준법감시팀" },
      { value: "리스크팀", label: "리스크팀" },
      { value: "영업팀", label: "영업팀" },
      { value: "개인팀", label: "개인팀" },
      { value: "CIB팀", label: "CIB팀" },
      { value: "자산관리팀", label: "자산관리팀" },
      { value: "투자운용팀", label: "투자운용팀" },
      { value: "IT팀", label: "IT팀" },
      { value: "인사팀", label: "인사팀" },
      { value: "재무팀", label: "재무팀" },
      { value: "법무팀", label: "법무팀" },
      { value: "구매팀", label: "구매팀" },
      { value: "품질팀", label: "품질팀" },
      { value: "환경팀", label: "환경팀" },
      { value: "고객서비스팀", label: "고객서비스팀" }
    ],
    implementationStatus: [
      { value: "승인요청", label: "승인요청" },
      { value: "미완료", label: "미완료" },
      { value: "완료", label: "완료" },
      { value: "대상없음", label: "대상없음" }
    ],
    inspectionStatus: [
      { value: "완료", label: "완료" },
      { value: "진행중", label: "진행중" },
      { value: "미점검", label: "미점검" },
      { value: "반려", label: "반려" }
    ],
    inspectionResult: [
      { value: "적정", label: "적정" },
      { value: "미흡", label: "미흡" },
      { value: "대상없음", label: "대상없음" }
    ],
    reviewStatus: [
      { value: "미완료", label: "미완료" },
      { value: "승인완료", label: "승인완료" },
      { value: "반려", label: "반려" }
    ]
  };

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
        <H1 title="관리조치 이행 점검" />
        
        {/* 검색 필터 */}
        <SearchFilter
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={filters}
        />

        {/* 상태 카드 그리드 */}
        <div className="grid grid-cols-4 gap-6">
          <StatusCard 
            title="관리조치이행완료" 
            value="364" 
            subValue="/489건"
            image="/images/complete2.png"
            titleColor="text-brand-500"
            valueColor="text-brand-500"
            subValueColor="text-gray-500"
          />
          <StatusCard 
            title="이행점검완료" 
            value="172" 
            subValue="/489건"
            image="/images/search.png"
            titleColor="text-brand-500/70"
            valueColor="text-brand-500/70"
            subValueColor="text-gray-500"
          />
          <StatusCard 
            title="점검결과 : 적정" 
            value="170" 
            subValue="/172건"
            image="/images/check (3).png"
            titleColor="text-black"
            valueColor="text-black"
            subValueColor="text-gray-500"
          />
          <StatusCard 
            title="점검결과 : 미흡" 
            value="2" 
            subValue="/172건"
            image="/images/alert-sign.png"
            titleColor="text-black"
            valueColor="text-black"
            subValueColor="text-gray-500"
          />
        </div>

        {/* 데이터 테이블 */}
        <div className="border-t border-b bg-white w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                {tableColumns.map((column, index) => (
                  <TableHead 
                    key={String(column.key)} 
                    className={`p-2 font-semibold text-gray-900 !border-t !border-orange-600 ${
                      column.key === 'implementationStatus' || column.key === 'reviewDate' ? 'border-r border-gray-300' : ''
                    }`}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {responsibilityCheckManagementData.map((item, index) => (
                <TableRow
                  key={item.id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {tableColumns.map((column, columnIndex) => (
                    <TableCell 
                      key={String(column.key)} 
                      className={`p-2 text-gray-700 text-sm ${
                        column.key === 'implementationStatus' || column.key === 'reviewDate' ? 'border-r border-dashed border-gray-300' : ''
                      }`}
                    >
                      {column.render ? column.render(item[column.key], item) : String(item[column.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6 mb-8"
        />

        {/* 책무 점검 모달 */}
        <ResponsibilityCheckModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={selectedRowData}
          actionType={modalActionType}
        />
      </div>
    </div>
  );
}
