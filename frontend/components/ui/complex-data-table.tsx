"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { Search, ChevronDown } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Sub-column definition */
interface SubColumn {
  key: string
  header: string
  width?: string // e.g., "min-w-[180px]" or "w-[220px]"
}

/** Main column definition */
export interface Column<T> {
  key: keyof T
  header: string
  visible: boolean
  width?: string
  subColumns?: SubColumn[] // if present, will render as grouped header
  render?: (value: any, row: T) => React.ReactNode
}

/** Props */
interface ComplexDataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onColumnsChange: (columns: Column<T>[]) => void
  searchPlaceholder?: string
  className?: string
  isLoading?: boolean
  // 필터 관련 props 추가
  searchFilters?: Record<string, string>; // 동적 필터 데이터
  onFilterChange?: (key: string, value: string) => void;
  // 필터 옵션들
  filterOptions?: Record<string, Array<{ value: string; label: string }>>;
  // 필터 설정
  filters?: Array<{
    key: string;
    label: string;
    type: 'dropdown' | 'input' | 'date';
    placeholder?: string;
    width?: string;
  }>;
  // 선택 삭제 관련 props
  onBulkDelete?: (selectedIds: string[]) => void;
  onSelectionReset?: () => void; // 선택 상태 초기화 콜백
  enableBulkDelete?: boolean; // 선택 삭제 기능 활성화 여부
  enableRowSelection?: boolean; // 행 선택 체크박스 활성화 여부
  // 추가 폼 관련 props
  enableAddForm?: boolean; // 추가 폼 활성화 여부
  showAddForm?: boolean;
  onShowAddForm?: () => void;
  formData?: Record<string, string>; // 동적 폼 데이터
  formFields?: Array<{ // 폼 필드 정의
    key: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'date' | 'number';
    placeholder?: string;
    required?: boolean;
  }>;
  onFormDataChange?: (field: string, value: string) => void;
  onAdd?: () => void;
  isAddLoading?: boolean;
  isNameValid?: boolean;
  // 액션 열 표시 여부
  showActionColumn?: boolean;
  // 추가 폼 버전 2 관련 props
  enableAddFormV2?: boolean;
  addFormV2Modal?: React.ReactNode;
  onShowAddFormV2?: () => void;
}

/** Component */
export function ComplexDataTable<T extends Record<string, any>>({
  data,
  columns,
  onColumnsChange,
  searchPlaceholder = "검색...",
  className,
  isLoading,
  searchFilters,
  onFilterChange,
  filterOptions,
  filters,
  onBulkDelete,
  onSelectionReset,
  enableBulkDelete = true,
  enableRowSelection = true,
  enableAddForm,
  showAddForm,
  onShowAddForm,
  formData,
  formFields,
  onFormDataChange,
  onAdd,
  isAddLoading,
  isNameValid,
  showActionColumn = true,
  enableAddFormV2,
  addFormV2Modal,
  onShowAddFormV2
}: ComplexDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  // 드롭다운 검색 상태 관리
  const [dropdownSearches, setDropdownSearches] = useState<Record<string, string>>({})

  // Visible columns only
  const visibleColumns = useMemo(() => columns.filter(c => c.visible), [columns])

  // Flattened columns for body cells (true table columns)
  const flattenedColumns = useMemo(() => {
    const arr: Array<{
      parentKey: keyof T
      subKey?: string
      key: string
      header: string
      width?: string
      render?: (value: any, row: T) => React.ReactNode
      isFromSub?: boolean
    }> = []

    visibleColumns.forEach(col => {
      if (col.subColumns && col.subColumns.length > 0) {
        col.subColumns.forEach(sc => {
          arr.push({
            parentKey: col.key,
            subKey: sc.key,
            key: `${String(col.key)}.${sc.key}`,
            header: sc.header,
            width: sc.width ?? "min-w-[160px]",
            render: col.render,
            isFromSub: true,
          })
        })
      } else {
        arr.push({
          parentKey: col.key,
          key: String(col.key),
          header: col.header,
          width: col.width ?? "min-w-[160px]",
          render: col.render,
          isFromSub: false,
        })
      }
    })
    return arr
  }, [visibleColumns])

  // Search filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    const needle = searchTerm.toLowerCase()
    return data.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(needle))
    )
  }, [data, searchTerm])

  // 드롭다운 검색 상태 업데이트
  const updateDropdownSearch = (filterKey: string, searchTerm: string) => {
    setDropdownSearches(prev => ({
      ...prev,
      [filterKey]: searchTerm
    }))
  }

  // 필터링된 옵션 가져오기
  const getFilteredOptions = (filterKey: string) => {
    const searchTerm = dropdownSearches[filterKey] || ''
    const options = filterOptions?.[filterKey] || []
    
    if (!searchTerm) return options
    
    return options.filter(opt => 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(filteredData.map(item => String(item.id || item.code || item.name))))
    } else {
      setSelectedRows(new Set())
    }
  }

  const handleRowSelect = (id: string, checked: boolean) => {
    const next = new Set(selectedRows)
    if (checked) next.add(id)
    else next.delete(id)
    setSelectedRows(next)
  }

  // Column visibility toggle
  const toggleColumnVisibility = (columnKey: keyof T) => {
    const updated = columns.map(col =>
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    )
    onColumnsChange(updated)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* 통합된 필터 및 컬럼 영역 */}
      <div className="flex items-center justify-between p-3 bg-brand-grey-100 border border-brand-grey-200">
        {/* 왼쪽: 검색 및 필터 */}
        <div className="flex-1">
          {/* 검색 및 필터들 */}
          {searchFilters && onFilterChange && (
            <div className="grid grid-cols-3 gap-4 max-w-3xl">
              {/* 동적 필터들 */}
              {filters?.map((filter) => {
                const filterValue = searchFilters[filter.key] || '';
                
                if (filter.type === 'dropdown') {
                  const options = filterOptions?.[filter.key] || [];
                  return (
                    <div key={filter.key} className="flex items-center space-x-2">
                      <label className="text-base text-gray-700 whitespace-nowrap">
                        {filter.label}
                      </label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="h-10 px-4 border-gray-200 hover:bg-gray-50 w-32 justify-between"
                          >
                            {filterValue ? 
                              (filterOptions?.[filter.key]?.find(opt => opt.value === filterValue)?.label || filterValue) 
                              : "전체선택"}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48 max-h-60 overflow-y-auto">
                          {/* 검색 입력 필드 */}
                          <div className="p-2 border-b">
                            <Input
                              type="text"
                              placeholder={`${filter.label} 검색...`}
                              className="h-8 text-sm"
                              value={dropdownSearches[filter.key] || ''}
                              onChange={(e) => updateDropdownSearch(filter.key, e.target.value)}
                            />
                          </div>
                          
                          <DropdownMenuItem 
                            onClick={() => onFilterChange(filter.key, '')}
                            className="cursor-pointer"
                          >
                            전체선택
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {getFilteredOptions(filter.key).map((option) => (
                            <DropdownMenuItem 
                              key={option.value}
                              onClick={() => onFilterChange(filter.key, option.value)}
                              className="cursor-pointer"
                            >
                              {option.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                }
                
                if (filter.type === 'input') {
                  return (
                    <div key={filter.key} className="flex items-center space-x-2">
                      <label className="text-base text-gray-700 whitespace-nowrap">
                        {filter.label}
                      </label>
                      <Input
                        type="text"
                        placeholder={filter.placeholder || `${filter.label}을 입력하세요`}
                        value={filterValue}
                        onChange={(e) => onFilterChange(filter.key, e.target.value)}
                        className="h-10 w-32"
                      />
                    </div>
                  );
                }
                
                return null;
              })}
            </div>
          )}
        </div>

        {/* 오른쪽: 컬럼 필터, 추가 버튼, 선택 삭제 */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <label className="font-medium text-gray-700 whitespace-nowrap">
              컬럼
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 px-4 border-gray-200 hover:bg-gray-50">
                   {visibleColumns.length === columns.length 
                     ? "전체선택" 
                     : visibleColumns.length === 1 
                       ? visibleColumns[0].header 
                       : `${visibleColumns.length}개 컬럼`}
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

                      {/* 추가/삭제 버튼 그룹 */}
          <div className="flex items-center space-x-2">
            {/* 추가 버튼 */}
            {(enableAddFormV2 ? onShowAddFormV2 : enableAddForm && onShowAddForm) && (
              <button
                onClick={enableAddFormV2 ? onShowAddFormV2 : onShowAddForm}
                className="bg-gray-900/60 border border-gray-900/70 hover:bg-gray-800 text-white px-4 py-1 rounded-sm transition-colors cursor-pointer"
              >
                {showAddForm ? '취소' : '추가'}
              </button>
            )}

            {/* 선택 삭제 버튼 */}
            {enableBulkDelete && selectedRows.size > 0 && (
              <button
                onClick={() => {
                  onBulkDelete?.(Array.from(selectedRows));
                  // 선택 상태 초기화
                  setSelectedRows(new Set());
                  // 부모 컴포넌트에도 알림
                  onSelectionReset?.();
                }}
                className="text-brand-500 px-2 py-1 rounded-sm transition-colors flex items-center space-x-2 border border-brand-500/70 cursor-pointer hover:bg-brand-500/10 bg-brand-200/30"
              >
                <span>삭제 ({selectedRows.size})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border-t border-b bg-white overflow-x-auto">
        <Table className="min-w-full table-auto">
          <TableHeader>
            {/* Row 1: Parent headers */}
            <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200/70">
              {/* Select all header spans two rows */}
              <TableHead className="w-12 py-2 px-3" rowSpan={2}>
                <Checkbox
                  checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="모든 행 선택"
                />
              </TableHead>

              {visibleColumns.map((col) => {
                if (col.subColumns && col.subColumns.length > 0) {
                  return (
                    <TableHead
                      key={String(col.key)}
                      className="py-2 px-4 font-semibold text-gray-900 text-center"
                      colSpan={col.subColumns.length}
                    >
                      {col.header}
                    </TableHead>
                  )
                }
                return (
                  <TableHead
                    key={String(col.key)}
                    className="py-2 px-3 font-semibold text-gray-900"
                    rowSpan={2}
                  >
                    {col.header}
                  </TableHead>
                )
              })}
            </TableRow>

            {/* Row 2: Sub headers */}
            <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200/70">
              {visibleColumns.flatMap(col => {
                if (col.subColumns && col.subColumns.length > 0) {
                  return col.subColumns.map(sc => (
                    <TableHead
                      key={`${String(col.key)}.${sc.key}`}
                      className={cn(
                        "py-2 px-3 text-sm font-medium text-gray-700 text-center whitespace-nowrap",
                        sc.width ?? "min-w-[160px]"
                      )}
                      title={sc.header}
                    >
                      {sc.header}
                    </TableHead>
                  ))
                }
                return []
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={flattenedColumns.length + 1} className="h-16 text-center text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
                    <span>데이터를 불러오는 중입니다...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={flattenedColumns.length + 1} className="h-16 text-center text-gray-500">
                  {searchTerm ? "검색 결과가 없습니다." : "데이터가 없습니다."}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, idx) => {
                const rowId = String(item.id || item.code || item.name)
                return (
                  <TableRow
                    key={idx}
                    data-state={selectedRows.has(rowId) ? "selected" : undefined}
                    className={cn(
                      "hover:bg-gray-50 transition-colors",
                      selectedRows.has(rowId) && "bg-blue-50 hover:bg-blue-100"
                    )}
                  >
                    {/* Row checkbox */}
                    <TableCell className="py-2 px-3">
                      <Checkbox
                        checked={selectedRows.has(rowId)}
                        onCheckedChange={(checked) => handleRowSelect(rowId, checked as boolean)}
                        aria-label={`${idx + 1}번째 행 선택`}
                      />
                    </TableCell>

                    {/* Body cells: flattened columns (true table columns) */}
                    {flattenedColumns.map((fc) => {
                      const raw = fc.subKey ? item[fc.parentKey]?.[fc.subKey] : item[fc.parentKey]
                      const value = raw ?? "-"

                      return (
                        <TableCell
                          key={fc.key}
                          className={cn(
                            "py-2 px-3 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis",
                            fc.width ?? "min-w-[160px]"
                          )}
                          title={typeof value === "string" ? value : undefined}
                        >
                          {typeof value === "boolean"
                            ? value
                              ? <span className="w-2 h-2 bg-black rounded-full inline-block" />
                              : <span className="w-2 h-2 inline-block" />
                            : (fc.render ? fc.render(value, item) : value)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>


    </div>
  )
}
