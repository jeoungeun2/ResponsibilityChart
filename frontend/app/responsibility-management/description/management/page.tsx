"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import CommonBreadcrumb from '../../_components/Breadcrumb';
import Header from '../../_components/Header';
import { useSidebar } from '@/config/providers';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { PrintButton } from '@/components/ui/PrintButton';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table2';
import { 
  dutyDescriptionData,
  dutyFilterOptions,
  type DutyDescriptionData 
} from '@/data/duty-description-data';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/pagination';
import StatusBadge from '@/components/ui/StatusBadge';
import ActionButton from '@/components/ui/ActionButton';

export default function DutyManagementPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 필터링된 데이터 계산
  const filteredData = dutyDescriptionData.filter(duty => {
    if (searchFilters.reportingPeriod && duty.reportingPeriod !== searchFilters.reportingPeriod) return false;
    if (searchFilters.status && duty.status !== searchFilters.status) return false;
    return true;
  });

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`페이지 ${page}로 이동`);
    // 여기에 실제 페이지 변경 로직을 구현할 수 있습니다
  };

  // SearchFilter 설정
  const filters = [
    {
      key: "reportingPeriod",
      label: "보고연월",
      type: "dropdown" as const,
      placeholder: "보고연월을 선택하세요"
    },
    {
      key: "status",
      label: "상태",
      type: "dropdown" as const,
      placeholder: "상태를 선택하세요"
    }
  ];

  const filterOptions = {
    ...dutyFilterOptions,
    reportingPeriod: dutyFilterOptions.reportingPeriod
  };



  // 상세보기 핸들러
  const handleViewDetails = (duty: DutyDescriptionData) => {
    console.log("상세보기:", duty);
    // 여기에 상세보기 모달이나 페이지 이동 로직을 구현할 수 있습니다
  };

  return (
    <div className="relative">
      <Header 
        rightContent={
          <div className="flex items-center space-x-3">
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>새 책무기술서</span>
            </button>
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>업로드</span>
            </button>
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`max-w-7xl mx-auto space-y-6 pt-24 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 
          title="책무기술서 관리" 
          rightContent={
            <div className="flex items-center space-x-3">
              <DownloadButton 
                fileType="hwp"
                onDownload={() => {
                  console.log("책무기술서 관리 HWP 다운로드")
                }}
              />
              <DownloadButton 
                fileType="doc"
                onDownload={() => {
                  console.log("책무기술서 관리 DOC 다운로드")
                }}
              />
              <PrintButton 
                onPrint={() => {
                  console.log("책무기술서 관리 인쇄")
                }}
              />
            </div>
          }
        />
        
        {/* SearchFilter */}
        <SearchFilter
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filters={filters}
          filterOptions={filterOptions}
        />
        
        {/* 책무기술서 관리 컨테이너 */}
        <div>
          {/* 책무기술서 목록 테이블 */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>보고기간</TableHead>
                  <TableHead>성명</TableHead>
                  <TableHead>직책</TableHead>
                  <TableHead>직위</TableHead>
                  <TableHead>제출일자</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>승인일자</TableHead>
                  <TableHead>관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((duty) => (
                  <TableRow key={duty.id} className="hover:bg-gray-50">
                    <TableCell>{duty.reportingPeriod}</TableCell>
                    <TableCell>{duty.name}</TableCell>
                    <TableCell>{duty.position}</TableCell>
                    <TableCell>{duty.rank}</TableCell>
                    <TableCell>{duty.submissionDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={duty.status} />
                    </TableCell>
                    <TableCell>{duty.approvalDate}</TableCell>
                    <TableCell>
                      <ActionButton
                        actionType="view"
                        onClick={() => handleViewDetails(duty)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

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
