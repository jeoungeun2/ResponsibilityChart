"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { MoreHorizontal, ChevronDown, Filter, Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// 컬럼 정의 인터페이스
interface Column<T> {
  key: keyof T
  header: string
  visible: boolean
  width?: string
  render?: (value: any, row: T) => React.ReactNode
}

// 데이터 테이블 프롭스 인터페이스
interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onColumnsChange: (columns: Column<T>[]) => void
  className?: string
  isLoading?: boolean
  // 필터 관련 props 추가
  searchFilters?: {
    keyword: string;
    evaluationStatus: 'NOT_STARTED' | 'STARTED' | 'IN_PROGRESS' | '';
    sortBy: 'name' | 'positionLabel' | 'email' | 'createdAt';
    order: 'asc' | 'desc';
  };
  onFilterChange?: (key: 'keyword' | 'evaluationStatus' | 'order' | 'sortBy', value: string) => void;
  onSortChange?: (sortBy: 'name' | 'createdAt') => void;
}

// 액션 드롭다운 프롭스 인터페이스
interface ActionDropdownProps {
  onCopyId: () => void
  onViewCustomer: () => void
  onViewDetails: () => void
}

// 액션 드롭다운 컴포넌트
function ActionDropdown({ onCopyId, onViewCustomer, onViewDetails }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">액션 메뉴 열기</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onCopyId} className="cursor-pointer">
          ID 복사
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onViewCustomer} className="cursor-pointer">
          고객 보기
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onViewDetails} className="cursor-pointer">
          상세 정보 보기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// 데이터 테이블 컴포넌트
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onColumnsChange,
  className,
  isLoading,
  searchFilters,
  onFilterChange,
  onSortChange
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  // 검색 기능 제거로 인해 데이터를 그대로 사용
  const filteredData = data

  // 모든 행 선택/해제
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(filteredData.map(item => String(item.id || item.code || item.name))))
    } else {
      setSelectedRows(new Set())
    }
  }

  // 개별 행 선택/해제
  const handleRowSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
  }

  // 컬럼 표시/숨김 토글
  const toggleColumnVisibility = (columnKey: keyof T) => {
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    )
    onColumnsChange(updatedColumns)
  }

  // 표시 가능한 컬럼들
  const visibleColumns = columns.filter(col => col.visible)

  return (
    <div className={cn("space-y-4", className)}>
      {/* 통합된 필터 및 컬럼 영역 */}
      <div className="flex items-center justify-between bg-white p-3 border">
        {/* 왼쪽: 검색 및 필터 */}
        {searchFilters && onFilterChange && onSortChange && (
          <div className="flex items-center space-x-3">
                         {/* 키워드 검색 */}
             <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                               <Input
                  type="text"
                  placeholder="이름/이메일 검색..."
                  value={searchFilters.keyword}
                  onChange={(e) => onFilterChange('keyword', e.target.value)}
                  className="w-64 pl-10"
                />
             </div>

            {/* 평가상태 필터 */}
            <DropdownMenu  >
              <DropdownMenuTrigger asChild >
                <Button variant="outline" className="h-10 px-4 border-gray-200 hover:bg-gray-50">
                  {searchFilters.evaluationStatus === '' ? '모든 상태' : 
                   searchFilters.evaluationStatus === 'NOT_STARTED' ? '미시작' :
                   searchFilters.evaluationStatus === 'STARTED' ? '시작' : '진행중'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32">
                <DropdownMenuItem 
                  onClick={() => onFilterChange('evaluationStatus', '')}
                  className="cursor-pointer"
                >
                  모든 상태
                </DropdownMenuItem>
               
                <DropdownMenuItem 
                  onClick={() => onFilterChange('evaluationStatus', 'NOT_STARTED')}
                  className="cursor-pointer"
                >
                  미시작
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onFilterChange('evaluationStatus', 'STARTED')}
                  className="cursor-pointer"
                >
                  시작
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onFilterChange('evaluationStatus', 'IN_PROGRESS')}
                  className="cursor-pointer"
                >
                  진행중
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 정렬 기준 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 px-4 border-gray-200 hover:bg-gray-50">
                  {searchFilters.sortBy === 'createdAt' ? '생성일순' : '이름순'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32">
                <DropdownMenuItem 
                  onClick={() => onSortChange('createdAt')}
                  className="cursor-pointer"
                >
                  생성일순
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onSortChange('name')}
                  className="cursor-pointer"
                >
                  이름순
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 정렬 순서 */}
            <button
              onClick={() => onFilterChange('order', searchFilters.order === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              {searchFilters.order === 'asc' ? '오름차순' : '내림차순'}
            </button>
          </div>
        )}

        {/* 오른쪽: 컬럼 필터 */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 px-4 border-gray-200 hover:bg-gray-50">
                컬럼
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuCheckboxItem
                checked={visibleColumns.length === columns.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onColumnsChange(columns.map(col => ({ ...col, visible: true })))
                  } else {
                    onColumnsChange(columns.map(col => ({ ...col, visible: false })))
                  }
                }}
              >
                모든 컬럼
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={String(column.key)}
                  checked={column.visible}
                  onCheckedChange={() => toggleColumnVisibility(column.key)}
                >
                  {column.header}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 테이블 */}
      <div className="border-t border-b bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-12 p-2">
                <Checkbox
                  checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="모든 행 선택"
                />
              </TableHead>
              {visibleColumns.map((column) => (
                <TableHead key={String(column.key)} className="p-2 font-semibold text-gray-900">
                  {column.header}
                </TableHead>
              ))}
              <TableHead className="w-12 p-2">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 2} className="h-16 text-center text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    <span>데이터를 불러오는 중입니다...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                              <TableCell colSpan={visibleColumns.length + 2} className="h-16 text-center text-gray-500">
                데이터가 없습니다.
              </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, index) => (
                <TableRow 
                  key={index} 
                  data-state={selectedRows.has(String(item.id || item.code || item.name)) ? "selected" : undefined}
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    selectedRows.has(String(item.id || item.code || item.name)) && "bg-blue-50 hover:bg-blue-100"
                  )}
                >
                  <TableCell className="p-1.5">
                    <Checkbox
                      checked={selectedRows.has(String(item.id || item.code || item.name))}
                      onCheckedChange={(checked) => handleRowSelect(String(item.id || item.code || item.name), checked as boolean)}
                      aria-label={`${index + 1}번째 행 선택`}
                    />
                  </TableCell>
                  {visibleColumns.map((column) => (
                    <TableCell key={String(column.key)} className="p-2 text-gray-700">
                      {column.render ? column.render(item[column.key], item) : String(item[column.key] || '')}
                    </TableCell>
                  ))}
                  <TableCell className="p-1.5">
                    {/* 사용자 정의 액션이 있으면 렌더링, 없으면 기본 액션 드롭다운 */}
                    {item.actions ? (
                      item.actions
                    ) : (
                      <ActionDropdown
                        onCopyId={() => console.log('ID 복사:', item.id || item.code)}
                        onViewCustomer={() => console.log('고객 보기:', item)}
                        onViewDetails={() => console.log('상세 정보 보기:', item)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 선택된 행 정보 및 페이지네이션 */}
      <div className="flex items-center justify-between text-sm bg-white ">
        <div className="text-gray-600 font-medium">
          {selectedRows.size} / {filteredData.length} 행 선택됨
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled className="h-8 px-3 text-gray-400 border-gray-200">
            이전
          </Button>
          <Button variant="outline" size="sm" disabled className="h-8 px-3 text-gray-400 border-gray-200">
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}
