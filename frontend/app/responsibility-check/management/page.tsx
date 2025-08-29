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

// 상태 카드 컴포넌트
const StatusCard = ({ title, value, valueColor }: { 
  title: string; 
  value: string; 
  valueColor: string; 
}) => (
  <div className="bg-white border border-gray-200 p-6">
    <div className="text-left">
      <h3 className="text-base font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold bg-gradient-to-r from-brand-200 to-brand-500 bg-clip-text text-transparent">{value}</p>
    </div>
  </div>
);

export default function ManagementPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 모달 관련 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<ResponsibilityCheckManagementData | null>(null);
  const [modalActionType, setModalActionType] = useState<'inspect' | 'view'>('inspect');
   
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    controlActivityCode: '',
    responsibleDepartment: '',
    implementationStatus: '',
    inspectionStatus: '',
    targetYear: '',
    responsibleTeam: ''
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
      key: "controlActivityCode" as keyof ResponsibilityCheckManagementData,
      header: "통제활동코드",
      visible: true
    },
    {
      key: "controlActivityName" as keyof ResponsibilityCheckManagementData,
      header: "통제활동명",
      visible: true
    },
    {
      key: "controlActivity" as keyof ResponsibilityCheckManagementData,
      header: "통제활동",
      visible: true
    },
    {
      key: "responsibleDepartment" as keyof ResponsibilityCheckManagementData,
      header: "담당부서",
      visible: true
    },
    {
      key: "responsibleTeam" as keyof ResponsibilityCheckManagementData,
      header: "담당팀",
      visible: true
    },
    {
      key: "assignee" as keyof ResponsibilityCheckManagementData,
      header: "담당자",
      visible: true
    },
    {
      key: "implementationDeadline" as keyof ResponsibilityCheckManagementData,
      header: "이행기한",
      visible: true
    },
    {
      key: "inspectionDate" as keyof ResponsibilityCheckManagementData,
      header: "점검일자",
      visible: true
    },
    {
      key: "implementationStatus" as keyof ResponsibilityCheckManagementData,
      header: "이행상태",
      visible: true,
      render: (value: any, row: any) => {
        const status = row.implementationStatus;
        let bgColor = '';
        if (status === '승인요청') bgColor = 'bg-blue-100 text-blue-800';
        else if (status === '미완료') bgColor = 'bg-red-100 text-red-800';
        else if (status === '완료') bgColor = 'bg-green-100 text-green-800';
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
            {status}
          </span>
        );
      }
    },
    {
      key: "inspectionStatus" as keyof ResponsibilityCheckManagementData,
      header: "점검상태",
      visible: true,
      render: (value: any, row: any) => {
        const status = row.inspectionStatus;
        let bgColor = '';
        if (status === '완료') bgColor = 'bg-green-100 text-green-800';
        else if (status === '진행중') bgColor = 'bg-orange-100 text-orange-800';
        else if (status === '미점검') bgColor = 'bg-red-100 text-red-800';
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
            {status}
          </span>
        );
      }
    },
    {
      key: "inspectionResult" as keyof ResponsibilityCheckManagementData,
      header: "점검결과",
      visible: true,
      render: (value: any, row: any) => {
        const result = row.inspectionResult;
        if (result === '-') return <span className="text-gray-500">-</span>;
        
        let bgColor = '';
        if (result === '적정') bgColor = 'bg-blue-100 text-blue-800';
        else if (result === '보완필요') bgColor = 'bg-yellow-100 text-yellow-800';
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
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
        
        if (inspectionStatus === '완료' && implementationStatus === '승인요청') {
          return (
            <button 
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
              onClick={() => handleActionClick(row, 'view')}
            >
              상세보기
            </button>
          );
        } else {
          return (
            <button 
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
              onClick={() => handleActionClick(row, 'inspect')}
            >
              점검하기
            </button>
            );
        }
      }
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // 필터 설정 정의
  const filters = [
    {
      key: "controlActivityCode",
      label: "통제활동코드",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "responsibleDepartment",
      label: "담당부서",
      type: "dropdown" as const,
      width: "w-32"
    },
    {
      key: "implementationStatus",
      label: "이행상태",
      type: "dropdown" as const,
      width: "w-28"
    },
    {
      key: "inspectionStatus",
      label: "점검상태",
      type: "dropdown" as const,
      width: "w-28"
    },
    {
      key: "targetYear",
      label: "대상연월",
      type: "dropdown" as const,
      width: "w-32"
    },
    {
      key: "responsibleTeam",
      label: "담당팀",
      type: "dropdown" as const,
      width: "w-32"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    controlActivityCode: [
      { value: "CE-지정책임", label: "CE-지정책임" },
      { value: "EQ-금융업무", label: "EQ-금융업무" },
      { value: "CE-영업활동", label: "CE-영업활동" },
      { value: "CE-개인고객", label: "CE-개인고객" },
      { value: "CE-기업금융", label: "CE-기업금융" },
      { value: "CE-자산관리", label: "CE-자산관리" },
      { value: "CE-투자운용", label: "CE-투자운용" },
      { value: "CE-정보시스템", label: "CE-정보시스템" },
      { value: "CE-인사관리", label: "CE-인사관리" },
      { value: "CE-재무관리", label: "CE-재무관리" },
      { value: "CE-법무관리", label: "CE-법무관리" },
      { value: "CE-구매관리", label: "CE-구매관리" },
      { value: "CE-품질관리", label: "CE-품질관리" },
      { value: "CE-환경관리", label: "CE-환경관리" },
      { value: "CE-고객서비스", label: "CE-고객서비스" }
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
    implementationStatus: [
      { value: "승인요청", label: "승인요청" },
      { value: "미완료", label: "미완료" },
      { value: "완료", label: "완료" }
    ],
    inspectionStatus: [
      { value: "완료", label: "완료" },
      { value: "진행중", label: "진행중" },
      { value: "미점검", label: "미점검" }
    ],
    targetYear: [
      { value: "전체", label: "전체" },
      { value: "2024", label: "2024년" },
      { value: "2023", label: "2023년" },
      { value: "2022", label: "2022년" },
      { value: "2021", label: "2021년" }
    ],
    responsibleTeam: [
      { value: "전체", label: "전체" },
      { value: "준법팀", label: "준법팀" },
      { value: "리스크팀", label: "리스크팀" },
      { value: "영업팀", label: "영업팀" },
      { value: "개인팀", label: "개인팀" },
      { value: "CIB팀", label: "CIB팀" }
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12 " />
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
      <div className={`max-w-7xl mx-auto space-y-6 pt-14 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 title="관리조치이행점검" />
        
        {/* 상태 카드 그리드 */}
        <div className="grid grid-cols-4 gap-6">
          <StatusCard 
            title="책무활동이행완료" 
            value="364/489건" 
            valueColor="text-black" 
          />
          <StatusCard 
            title="이행점검완료" 
            value="172/489건" 
            valueColor="text-green-600" 
          />
          <StatusCard 
            title="이행점검결과-적정" 
            value="170/172건" 
            valueColor="text-orange-600" 
          />
          <StatusCard 
            title="이행점검결과-보완필요" 
            value="2/172건" 
            valueColor="text-red-600" 
          />
        </div>
        
        <DataTable
          data={responsibilityCheckManagementData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={filters}
          // 추가 버튼 및 체크박스 비활성화
          enableAddForm={false}
          enableRowSelection={false}
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
