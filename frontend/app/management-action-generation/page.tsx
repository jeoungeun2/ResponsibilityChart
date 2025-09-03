"use client";

import { useState, useEffect } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import Header from '../responsibility-check/_components/Header';
import { useSidebar } from '@/config/providers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table2';
import { Calendar } from 'lucide-react';

// 관리조치차수 생성 데이터 타입
interface ManagementActionGenerationData {
  id: string;
  managementActionCode: string;
  managementAction: string;
  checkCycle: string;
  responsibleDepartment: string;
  responsibleTeam: string;
  assignee: string;
  reviewer: string;
  deadline: string;
}

// 샘플 데이터
const sampleGenerationData: ManagementActionGenerationData[] = [
  {
    id: "1",
    managementActionCode: "BD-경영관리-C1",
    managementAction: "경영관리 관련 내부통제 기준 마련 및 운영",
    checkCycle: "월간",
    responsibleDepartment: "준법감시실",
    responsibleTeam: "준법팀",
    assignee: "김철수",
    reviewer: "이영희",
    deadline: ""
  },
  {
    id: "2",
    managementActionCode: "BD-경영관리-C2",
    managementAction: "경영관리 관련 내부통제 기준의 효과적 집행·운영",
    checkCycle: "분기",
    responsibleDepartment: "리스크관리부",
    responsibleTeam: "리스크팀",
    assignee: "박민수",
    reviewer: "정수진",
    deadline: ""
  },
  {
    id: "3",
    managementActionCode: "BD-경영관리-C3",
    managementAction: "경영관리 관련 내부통제 기준 준수 여부 점검",
    checkCycle: "반기",
    responsibleDepartment: "영업기획그룹",
    responsibleTeam: "영업팀",
    assignee: "한지훈",
    reviewer: "김민수",
    deadline: ""
  },
  {
    id: "4",
    managementActionCode: "EQ-금융업무-B1",
    managementAction: "금융업무 관련 내부통제 기준 마련 및 운영",
    checkCycle: "연간",
    responsibleDepartment: "개인그룹",
    responsibleTeam: "개인팀",
    assignee: "최영수",
    reviewer: "박지영",
    deadline: ""
  }
];

export default function ManagementActionGenerationPage() {
  const { isSidebarCollapsed } = useSidebar();
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  
  // 필터 관련 상태
  const [targetYear, setTargetYear] = useState(new Date().getFullYear().toString());
  const [targetMonth, setTargetMonth] = useState((new Date().getMonth() + 1).toString());
  
  // 테이블 데이터 상태
  const [generationData, setGenerationData] = useState<ManagementActionGenerationData[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  
  // 일괄 설정 관련 상태
  const [bulkDeadline, setBulkDeadline] = useState("");
  const [showBulkSetting, setShowBulkSetting] = useState(false);
  
  // 차수 생성/등록 상태
  const [isGenerated, setIsGenerated] = useState(false);

  // 연도 옵션 (현재 연도 기준 ±2년)
  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - 2 + i;
    return { value: year.toString(), label: `${year}년` };
  });

  // 월 옵션
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}월`
  }));

  // 전체 선택/해제 핸들러
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(generationData.map(item => item.id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  // 개별 행 선택 핸들러
  const handleRowSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  // 제출기한 개별 변경 핸들러
  const handleDeadlineChange = (id: string, deadline: string) => {
    setGenerationData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, deadline } : item
      )
    );
  };

  // 차수 생성 버튼 핸들러
  const handleGenerate = () => {
    setGenerationData(sampleGenerationData);
    setShowBulkSetting(true);
    setIsGenerated(true);
  };

  // 차수 등록 버튼 핸들러
  const handleRegister = () => {
    console.log("차수 등록:", generationData);
    // 여기에 실제 등록 로직을 구현할 수 있습니다
    alert("차수가 등록되었습니다.");
  };

  // 일괄 제출기한 설정 핸들러
  const handleBulkDeadlineSet = () => {
    if (!bulkDeadline) return;
    
    setGenerationData(prev => 
      prev.map(item => 
        selectedRows.has(item.id) ? { ...item, deadline: bulkDeadline } : item
      )
    );
    setSelectedRows(new Set());
    setBulkDeadline("");
  };

  // 컬럼 정의
  const columns: any[] = [
    {
      key: "select" as keyof ManagementActionGenerationData,
      header: (
        <Checkbox 
          checked={selectedRows.size === generationData.length && generationData.length > 0}
          onCheckedChange={handleSelectAll}
          className="cursor-pointer"
        />
      ),
      visible: true,
      width: "w-12",
      render: (value: any, row: ManagementActionGenerationData) => (
        <Checkbox 
          checked={selectedRows.has(row.id)}
          onCheckedChange={(checked) => handleRowSelect(row.id, checked as boolean)}
          className="cursor-pointer"
        />
      )
    },
    {
      key: "managementActionCode" as keyof ManagementActionGenerationData,
      header: "관리조치코드",
      visible: true,
      width: "w-48"
    },
    {
      key: "managementAction" as keyof ManagementActionGenerationData,
      header: "관리조치",
      visible: true,
      width: "w-80"
    },
    {
      key: "checkCycle" as keyof ManagementActionGenerationData,
      header: "점검주기",
      visible: true,
      width: "w-32"
    },
    {
      key: "responsibleDepartment" as keyof ManagementActionGenerationData,
      header: "소관부서",
      visible: true,
      width: "w-40"
    },
    {
      key: "responsibleTeam" as keyof ManagementActionGenerationData,
      header: "소관팀",
      visible: true,
      width: "w-32"
    },
    {
      key: "assignee" as keyof ManagementActionGenerationData,
      header: "담당자",
      visible: true,
      width: "w-32"
    },
    {
      key: "reviewer" as keyof ManagementActionGenerationData,
      header: "리뷰어",
      visible: true,
      width: "w-32"
    },
    {
      key: "deadline" as keyof ManagementActionGenerationData,
      header: "제출기한",
      visible: true,
      width: "w-40",
      render: (value: string, row: ManagementActionGenerationData) => (
        <Input
          type="date"
          value={value}
          onChange={(e) => handleDeadlineChange(row.id, e.target.value)}
          className="h-8 text-sm"
        />
      )
    }
  ];

  // 컴포넌트 마운트 시 컬럼 설정
  useEffect(() => {
    setTableColumns(columns);
  }, [selectedRows, generationData]);

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
        <H1 title="관리조치차수 생성" />
        
        {/* 필터 영역 */}
        <div className="p-3 bg-brand-grey-100 border border-brand-grey-200">
          <div className="grid gap-3">
            <div className="space-y-4 border-b border-gray-300 pb-3">
              <div className="flex items-end gap-4">
                <div className="flex-1 grid grid-cols-4 gap-4">
                  {/* 대상연도 */}
                  <div className="grid grid-cols-3 items-center space-x-3">
                    <label className="text-sm font-medium whitespace-nowrap col-span-1 text-gray-700">
                      대상연도
                    </label>
                    <div className="col-span-2">
                      <select
                        value={targetYear}
                        onChange={(e) => setTargetYear(e.target.value)}
                        className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      >
                        {yearOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 대상월 */}
                  <div className="grid grid-cols-3 items-center space-x-3">
                    <label className="text-sm font-medium whitespace-nowrap col-span-1 text-gray-700">
                      대상월
                    </label>
                    <div className="col-span-2">
                      <select
                        value={targetMonth}
                        onChange={(e) => setTargetMonth(e.target.value)}
                        className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      >
                        {monthOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* 차수 생성/등록 버튼 */}
                <div className="flex justify-end space-x-2">
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerated}
                    className={`px-6 py-2 ${
                      isGenerated 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-brand-500 hover:bg-brand-600 text-white'
                    }`}
                  >
                    차수 생성
                  </Button>
                  <Button 
                    onClick={handleRegister}
                    disabled={!isGenerated}
                    className={`px-6 py-2 ${
                      !isGenerated 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    차수 등록
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 일괄 제출기한 설정 영역 */}
        {showBulkSetting && (
          <div className="p-3 bg-orange-50 border border-orange-200">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-orange-800">
                일괄 제출기한 설정:
              </span>
              <Input
                type="date"
                value={bulkDeadline}
                onChange={(e) => setBulkDeadline(e.target.value)}
                className="h-8 w-40"
              />
              <Button 
                onClick={handleBulkDeadlineSet}
                disabled={!bulkDeadline || selectedRows.size === 0}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 text-sm"
              >
                일괄 설정 ({selectedRows.size}개)
              </Button>
            </div>
          </div>
        )}

        {/* 테이블 영역 */}
        {generationData.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableColumns.map((column) => (
                    <TableHead key={column.key} className={column.width}>
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {generationData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50">
                    {tableColumns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render 
                          ? column.render(row[column.key], row)
                          : row[column.key]
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* 안내 메시지 */}
        {generationData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>대상연도와 대상월을 선택하고 "차수 생성" 버튼을 클릭하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
