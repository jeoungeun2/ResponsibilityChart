"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { MoreHorizontal, ChevronDown, Filter } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  showActionColumn = true
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  // 드롭다운 검색 상태 관리
  const [dropdownSearches, setDropdownSearches] = useState<Record<string, string>>({})

  // 검색 기능 제거로 인해 데이터를 그대로 사용
  const filteredData = data

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
      <div className="flex items-center justify-between p-3 bg-brand-grey-50">
        {/* 왼쪽: 검색 및 필터 */}
        <div className="flex items-center space-x-6">
          {/* 검색 및 필터들 */}
          {searchFilters && onFilterChange && (
            <>
              {/* 동적 필터들 */}
              {filters?.map((filter) => {
                const filterValue = searchFilters[filter.key] || '';
                
                if (filter.type === 'dropdown') {
                  const options = filterOptions?.[filter.key] || [];
                  return (
                    <div key={filter.key} className="flex items-center space-x-2">
                      <label className=" font-medium text-gray-700 whitespace-nowrap">
                        {filter.label}
                      </label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={`h-10 px-4 border-gray-200 hover:bg-gray-50 ${filter.width ? filter.width : 'w-auto'}`}
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
                      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {filter.label}
                      </label>
                      <Input
                        type="text"
                        placeholder={filter.placeholder || `${filter.label}을 입력하세요`}
                        value={filterValue}
                        onChange={(e) => onFilterChange(filter.key, e.target.value)}
                        className={`h-10 ${filter.width ? filter.width : 'w-32'}`}
                      />
                    </div>
                  );
                }
                
                return null;
              })}
            </>
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

          {/* 추가 버튼 */}
          {enableAddForm && onShowAddForm && (
            <button
              onClick={onShowAddForm}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-1.5 rounded-md transition-colors cursor-pointer"
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
               className="text-brand-500 px-2 py-1.5 rounded-sm transition-colors flex items-center space-x-2 border border-brand-500/70 cursor-pointer hover:bg-brand-500/10 bg-[#fff5ed]"
               
             >
               <span>삭제 ({selectedRows.size})</span>
             </button>
           )}
        </div>
      </div>

      {/* 테이블 */}
      <div className="border-t border-b bg-white">
        <Table>
                     <TableHeader>
             <TableRow className="bg-gray-50 hover:bg-gray-50">
               {enableRowSelection && (
                 <TableHead className="w-12 p-2">
                   <Checkbox
                     checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                     onCheckedChange={handleSelectAll}
                     aria-label="모든 행 선택"
                   />
                 </TableHead>
               )}
               {visibleColumns.map((column) => (
                 <TableHead key={String(column.key)} className="p-2 font-semibold text-gray-900">
                   {column.header}
                 </TableHead>
               ))}
               {showActionColumn && <TableHead className="w-12 p-2">액션</TableHead>}
             </TableRow>
           </TableHeader>
          <TableBody>
                         {isLoading ? (
               <TableRow>
                 <TableCell colSpan={visibleColumns.length + (enableRowSelection ? 2 : 1)} className="h-16 text-center text-gray-500">
                   <div className="flex items-center justify-center space-x-2">
                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                     <span>데이터를 불러오는 중입니다...</span>
                   </div>
                 </TableCell>
               </TableRow>
             ) : filteredData.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={visibleColumns.length + (enableRowSelection ? 2 : 1)} className="h-16 text-center text-gray-500">
                   데이터가 없습니다.
                 </TableCell>
               </TableRow>
                         ) : (
               filteredData.map((item, index) => (
                 <TableRow 
                   key={index} 
                   data-state={enableRowSelection && selectedRows.has(String(item.id || item.code || item.name)) ? "selected" : undefined}
                   className={cn(
                     "hover:bg-gray-50 transition-colors",
                     enableRowSelection && selectedRows.has(String(item.id || item.code || item.name)) && "bg-blue-50 hover:bg-blue-100"
                   )}
                 >
                   {enableRowSelection && (
                     <TableCell className="p-1.5">
                       <Checkbox
                         checked={selectedRows.has(String(item.id || item.code || item.name))}
                         onCheckedChange={(checked) => handleRowSelect(String(item.id || item.code || item.name), checked as boolean)}
                         aria-label={`${index + 1}번째 행 선택`}
                       />
                     </TableCell>
                   )}
                   {visibleColumns.map((column) => (
                     <TableCell key={String(column.key)} className="p-2 text-gray-700">
                       {column.render ? column.render(item[column.key], item) : String(item[column.key] || '')}
                     </TableCell>
                   ))}
                   {showActionColumn && (
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
                   )}
                 </TableRow>
               ))
             )}
          </TableBody>
        </Table>
      </div>

      {/* 추가 폼 다이얼로그 */}
      {enableAddForm && showAddForm && formData && formFields && onFormDataChange && onAdd && (
        <Dialog open={showAddForm} onOpenChange={onShowAddForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>새 항목 추가</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* 폼 필드들 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder || `${field.label}을 입력하세요`}
                      value={formData[field.key] || ''}
                      onChange={(e) => onFormDataChange(field.key, e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required={field.required}
                    />
                  </div>
                ))}
              </div>
              
              {/* 버튼들 */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={onShowAddForm}
                  disabled={isAddLoading}
                >
                  취소
                </Button>
                <Button
                  onClick={onAdd}
                  disabled={isAddLoading || !isNameValid}
                >
                  {isAddLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      추가 중...
                    </>
                  ) : (
                    '추가'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
