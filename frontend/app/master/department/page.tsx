"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';

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

  return (
    <div className="space-y-6">
      <H1 title="책무 Master" />
      
      <DataTable
        data={sampleData}
        columns={tableColumns}
        onColumnsChange={setTableColumns}
        searchPlaceholder="책무 검색..."
        className="w-full"
      />
    </div>
  );
}
