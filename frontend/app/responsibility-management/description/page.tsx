"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from '../_components/Header';
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  employeeTableData,
  type EmployeeData 
} from '@/data/employee-table-data';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/pagination';

export default function DescriptionPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({});
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 체크박스 관련 핸들러
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(employeeTableData.map(emp => emp.id));
      setSelectedEmployees(allIds);
    } else {
      setSelectedEmployees(new Set());
    }
  };

  const handleSelectEmployee = (employeeId: string, checked: boolean) => {
    const newSelected = new Set(selectedEmployees);
    if (checked) {
      newSelected.add(employeeId);
    } else {
      newSelected.delete(employeeId);
    }
    setSelectedEmployees(newSelected);
  };

  // SearchFilter 설정
  const filters = [
    {
      key: "name",
      label: "성명",
      type: "input" as const,
      placeholder: "성명을 입력하세요"
    },
    {
      key: "position",
      label: "직책",
      type: "dropdown" as const,
      placeholder: "직책을 선택하세요"
    },
    {
      key: "rank",
      label: "직위",
      type: "dropdown" as const,
      placeholder: "직위를 선택하세요"
    }
  ];

  const filterOptions = {
    position: [
      { value: "금사본 부장", label: "금사본 부장" },
      { value: "준법감시인", label: "준법감시인" },
      { value: "그룹장", label: "그룹장" }
    ],
    rank: [
      { value: "이사", label: "이사" },
      { value: "준법감시인", label: "준법감시인" },
      { value: "부행장", label: "부행장" }
    ]
  };

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

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
      <div className={`w-full space-y-6 pt-24 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
        <CommonBreadcrumb />
        <H1 
          title="책무기술서 작성" 
          rightContent={
            <div className="flex items-center space-x-3">
              <DownloadButton 
                fileType="hwp"
                onDownload={() => {
                  console.log("책무기술서 HWP 다운로드")
                  // 여기에 실제 다운로드 로직 구현
                }}
              />
              <DownloadButton 
                fileType="doc"
                onDownload={() => {
                  console.log("책무기술서 DOC 다운로드")
                  // 여기에 실제 다운로드 로직 구현
                }}
              />
              <PrintButton 
                onPrint={() => {
                  console.log("책무기술서 인쇄")
                  // 여기에 실제 인쇄 로직 구현
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
         
                                                           {/* 메인 컨테이너 - 좌측 테이블, 우측 폼 */}
                       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pb-12">
              {/* 좌측: 직원 정보 테이블 */}
                                                                                                                       <div className="lg:col-span-2">
                                 <div className="bg-white border border-gray-200 p-4 h-[720px]">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">책무대상 등록 임원별 기술서 조회</h3>
                  </div>
                   <div className="space-y-4">
                     {/* 테이블 */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                                                     <TableHead className="w-12">
                             <Checkbox 
                               checked={selectedEmployees.size === employeeTableData.length && employeeTableData.length > 0}
                               onCheckedChange={handleSelectAll}
                               className="cursor-pointer"
                             />
                           </TableHead>
                          <TableHead>사번</TableHead>
                          <TableHead>성명</TableHead>
                          <TableHead>직책</TableHead>
                          <TableHead>직위</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employeeTableData.map((employee) => (
                          <TableRow key={employee.id}>
                                                         <TableCell className="w-12">
                               <Checkbox 
                                 checked={selectedEmployees.has(employee.id)}
                                 onCheckedChange={(checked) => handleSelectEmployee(employee.id, checked as boolean)}
                                 className="cursor-pointer"
                               />
                             </TableCell>
                            <TableCell>{employee.employeeId}</TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.rank}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* 페이지네이션 */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      className="mt-4"
                    />
                  </div>
                </div>
              </div>
              
                            {/* 우측: 책무기술서 작성 폼 */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-gray-200 h-[720px] overflow-y-auto">
                  <div className="w-full">
                    <img 
                      src="/images/그림1.png" 
                      alt="책무 이행을 위한 주요 관리의무 1" 
                      className="w-full h-auto"
                    />
                    <img 
                      src="/images/그림2.png" 
                      alt="책무 이행을 위한 주요 관리의무 2" 
                      className="w-full h-auto"
                    />
                    <img 
                      src="/images/그림3.png" 
                      alt="책무 이행을 위한 주요 관리의무 3" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
         </div>
       </div>
     </div>
   );
 }
