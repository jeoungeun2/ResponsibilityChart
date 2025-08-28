"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';

// 책무 데이터 타입 정의
interface DutyData {
  id: string;
  category: string;        // 채무구분
  code: string;            // 채무코드
  name: string;            // 채무
  detailCode: string;      // 채무 세부코드
  detailContent: string;   // 채무 세부내용
}

// 샘플 데이터
const sampleData: DutyData[] = [
  {
    id: "1",
    category: "경영관리",
    code: "AM-경영관리-C11",
    name: "경영지원업무와 관련된 책무",
    detailCode: "AM-경영관리-C11-A",
    detailContent: "경영지원 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "2",
    category: "인사관리",
    code: "AM-인사관리-C12",
    name: "인사관리업무와 관련된 책무",
    detailCode: "AM-인사관리-C12-A",
    detailContent: "인사관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "3",
    category: "재무관리",
    code: "AM-재무관리-C13",
    name: "재무관리업무와 관련된 책무",
    detailCode: "AM-재무관리-C13-A",
    detailContent: "재무관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "4",
    category: "정보관리",
    code: "AM-정보관리-C14",
    name: "정보관리업무와 관련된 책무",
    detailCode: "AM-정보관리-C14-A",
    detailContent: "정보관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "5",
    category: "법무관리",
    code: "AM-법무관리-C15",
    name: "법무관리업무와 관련된 책무",
    detailCode: "AM-법무관리-C15-A",
    detailContent: "법무관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "6",
    category: "보안관리",
    code: "AM-보안관리-C16",
    name: "보안관리업무와 관련된 책무",
    detailCode: "AM-보안관리-C16-A",
    detailContent: "보안관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "7",
    category: "품질관리",
    code: "AM-품질관리-C17",
    name: "품질관리업무와 관련된 책무",
    detailCode: "AM-품질관리-C17-A",
    detailContent: "품질관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "8",
    category: "환경관리",
    code: "AM-환경관리-C18",
    name: "환경관리업무와 관련된 책무",
    detailCode: "AM-환경관리-C18-A",
    detailContent: "환경관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  }
];

// 컬럼 정의
const columns = [
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
  }
];

export default function DepartmentPage() {
  const [tableColumns, setTableColumns] = useState(columns);
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    category: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 필터 설정 정의
  const filters = [
    {
      key: "category",
      label: "책무구분",
      type: "dropdown" as const,
      width: "w-32"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    category: [
      { value: "경영관리", label: "경영관리" },
      { value: "인사관리", label: "인사관리" },
      { value: "재무관리", label: "재무관리" },
      { value: "정보관리", label: "정보관리" },
      { value: "법무관리", label: "법무관리" },
      { value: "보안관리", label: "보안관리" },
      { value: "품질관리", label: "품질관리" },
      { value: "환경관리", label: "환경관리" }
    ]
  };

  // 폼 필드 정의
  const formFields = [
    { key: "category", label: "책무구분", type: "text" as const, required: true },
    { key: "code", label: "책무코드", type: "text" as const, required: true },
    { key: "name", label: "책무", type: "text" as const, required: true },
    { key: "detailCode", label: "책무 세부코드", type: "text" as const, required: true },
    { key: "detailContent", label: "책무 세부내용", type: "text" as const, required: true }
  ];

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
  const handleAdd = () => {
    console.log('추가 기능은 구현되지 않았습니다.', formData);
    // 여기에 실제 추가 로직을 구현할 수 있습니다
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
    <div className="space-y-6">
      <H1 title="책무 Master" />
      
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
        // 추가 버튼 관련 props
        enableAddForm={true}
        showAddForm={showAddForm}
        onShowAddForm={handleShowAddForm}
        formData={formData}
        formFields={formFields}
        onFormDataChange={handleFormDataChange}
        onAdd={handleAdd}
        isAddLoading={false}
        isNameValid={true}
      />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-6"
      />
    </div>
  );
}
