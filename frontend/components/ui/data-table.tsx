"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { MoreHorizontal, ChevronDown, Search } from "lucide-react"

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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StartDateFilter, EndDateFilter } from "@/components/ui/DateFilter"
import { cn } from "@/lib/utils"

/* ----------------------------- Types & Helpers ---------------------------- */

export interface Column<T> {
  key: keyof T
  header: string
  visible: boolean
  width?: string
  render?: (value: any, row: T) => React.ReactNode
}

type FilterType = "dropdown" | "input" | "date"

export interface FilterConfig {
  key: string
  label: string
  type: FilterType
  placeholder?: string
  width?: string
  dateRange?: boolean // 날짜 범위 여부
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  columns: Column<T>[]
  onColumnsChange: (columns: Column<T>[]) => void
  className?: string
  isLoading?: boolean

  // Filters
  searchFilters?: Record<string, string>
  onFilterChange?: (key: string, value: string) => void
  filterOptions?: Record<string, Array<{ value: string; label: string }>>
  filters?: Array<FilterConfig>

  // Bulk delete / selection
  onBulkDelete?: (selectedIds: string[]) => void
  onSelectionReset?: () => void
  enableBulkDelete?: boolean
  enableRowSelection?: boolean

  // Add form (v1)
  enableAddForm?: boolean
  showAddForm?: boolean
  onShowAddForm?: () => void
  formData?: Record<string, string>
  formFields?: Array<{
    key: string
    label: string
    type: "text" | "email" | "tel" | "date" | "number"
    placeholder?: string
    required?: boolean
  }>
  onFormDataChange?: (field: string, value: string) => void
  onAdd?: () => void
  isAddLoading?: boolean
  isNameValid?: boolean

  // Add form (v2)
  enableAddFormV2?: boolean
  addFormV2Modal?: React.ReactNode
  onShowAddFormV2?: () => void

  // Actions column
  showActionColumn?: boolean
}

interface ActionDropdownProps {
  onCopyId: () => void
  onViewCustomer: () => void
  onViewDetails: () => void
}

/** Resolve row unique id from common fields (id | code | name) */
const getRowId = (row: Record<string, any>): string =>
  String(row.id ?? row.code ?? row.name ?? "")

/* ------------------------------ UI Subparts ------------------------------- */

const ActionDropdown = React.memo(function ActionDropdown({
  onCopyId,
  onViewCustomer,
  onViewDetails,
}: ActionDropdownProps) {
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
})

/* --------------------------------- Main ---------------------------------- */

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onColumnsChange,
  className,
  isLoading,

  // Filters
  searchFilters,
  onFilterChange,
  filterOptions,
  filters,

  // Bulk delete / selection
  onBulkDelete,
  onSelectionReset,
  enableBulkDelete = true,
  enableRowSelection = true,

  // Add form (v1)
  enableAddForm,
  showAddForm,
  onShowAddForm,
  formData,
  formFields,
  onFormDataChange,
  onAdd,
  isAddLoading,
  isNameValid,

  // Add form (v2)
  enableAddFormV2,
  addFormV2Modal,
  onShowAddFormV2,

  // Actions
  showActionColumn = true,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [dropdownSearches, setDropdownSearches] = useState<Record<string, string>>({})

  // Keep behavior: no client-side filtering
  const filteredData = data

  const visibleColumns = useMemo(
    () => columns.filter((c) => c.visible),
    [columns]
  )

  const allRowIds = useMemo(
    () => filteredData.map((row) => getRowId(row)),
    [filteredData]
  )

  const updateDropdownSearch = useCallback((filterKey: string, searchTerm: string) => {
    setDropdownSearches((prev) => ({ ...prev, [filterKey]: searchTerm }))
  }, [])

  const getFilteredOptions = useCallback(
    (filterKey: string) => {
      const searchTerm = (dropdownSearches[filterKey] || "").toLowerCase()
      const options = filterOptions?.[filterKey] ?? []
      if (!searchTerm) return options
      return options.filter((opt) => opt.label.toLowerCase().includes(searchTerm))
    },
    [dropdownSearches, filterOptions]
  )

  const handleSelectAll = useCallback(
    (checked: boolean | "indeterminate") => {
      if (checked === true) {
        setSelectedRows(new Set(allRowIds))
      } else {
        setSelectedRows(new Set())
      }
    },
    [allRowIds]
  )

  const handleRowSelect = useCallback((rowId: string, checked: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (checked) next.add(rowId)
      else next.delete(rowId)
      return next
    })
  }, [])

  const toggleColumnVisibility = useCallback(
    (columnKey: keyof T) => {
      const updated = columns.map((col) =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
      onColumnsChange(updated)
    },
    [columns, onColumnsChange]
  )

  const handleBulkDeleteClick = useCallback(() => {
    if (!onBulkDelete) return
    const ids = Array.from(selectedRows)
    if (ids.length === 0) return
    onBulkDelete(ids)
    setSelectedRows(new Set())
    onSelectionReset?.()
  }, [onBulkDelete, selectedRows, onSelectionReset])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filters & Columns Toolbar */}
      <div className="p-3 bg-brand-grey-100 border border-brand-grey-200">
        <div className="grid gap-3">
          {/* Group 1: Search & Filters */}
          <div className="space-y-4 border-b border-gray-300 pb-3">
            {searchFilters && onFilterChange && (
              <div className="grid grid-cols-4 gap-6">
                {filters?.map((filter) => {
                  const filterValue = searchFilters[filter.key] || ""

                  if (filter.type === "dropdown") {
                    const options = filterOptions?.[filter.key] || []
                    const selectedLabel =
                      options.find((opt) => opt.value === filterValue)?.label || filterValue
                    const isSelected = filterValue && filterValue !== ""

                    return (
                      <div key={filter.key} className="grid grid-cols-3 items-center space-x-3">
                        <label className={`text-sm font-medium whitespace-nowrap col-span-1 ${
                          isSelected ? "text-brand-500" : "text-gray-700"
                        }`}>
                          {filter.label}
                        </label>
                        <div className="col-span-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className={`h-10 px-4 w-full justify-between ${
                                  isSelected 
                                    ? "border-brand-500/80 text-brand-500 hover:bg-brand-50" 
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                <span className="truncate flex-1 text-left">
                                  {filterValue ? selectedLabel : "전체선택"}
                                </span>
                                <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48 max-h-60 overflow-y-auto">
                              {/* Search-in-dropdown */}
                              <div className="p-2 border-b">
                                <Input
                                  type="text"
                                  placeholder={`${filter.label} 검색...`}
                                  className="h-8 text-sm"
                                  value={dropdownSearches[filter.key] || ""}
                                  onChange={(e) => updateDropdownSearch(filter.key, e.target.value)}
                                />
                              </div>

                              <DropdownMenuItem
                                onClick={() => onFilterChange(filter.key, "")}
                                className="cursor-pointer"
                              >
                                <div className="w-full truncate">전체선택</div>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {getFilteredOptions(filter.key).map((option) => (
                                <DropdownMenuItem
                                  key={option.value}
                                  onClick={() => onFilterChange(filter.key, option.value)}
                                  className="cursor-pointer"
                                >
                                  <div className="w-full truncate">{option.label}</div>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )
                  }

                  if (filter.type === "input") {
                    const isSelected = filterValue && filterValue !== ""
                    
                    return (
                      <div key={filter.key} className="flex items-center space-x-3">
                        <label className={`text-sm font-medium whitespace-nowrap ${
                          isSelected ? "text-brand-500" : "text-gray-700"
                        }`}>
                          {filter.label}
                        </label>
                        <Input
                          type="text"
                          placeholder={filter.placeholder || `${filter.label}을 입력하세요`}
                          value={filterValue}
                          onChange={(e) => onFilterChange(filter.key, e.target.value)}
                          className={`h-10 w-32 ${
                            isSelected 
                              ? "border-brand-500/80 focus:ring-brand-500/20 focus:border-brand-500" 
                              : ""
                          }`}
                        />
                      </div>
                    )
                  }

                  if (filter.type === "date") {
                    const isSelected = filterValue && filterValue !== ""
                    
                    return (
                      <div key={filter.key} className="flex items-center space-x-3">
                        <label className={`text-sm font-medium whitespace-nowrap ${
                          isSelected ? "text-brand-500" : "text-gray-700"
                        }`}>
                          {filter.label}
                        </label>
                        <StartDateFilter
                          startDate={filterValue}
                          onStartDateChange={(date) => onFilterChange(filter.key, date)}
                          placeholder={filter.placeholder || "연도-월-일"}
                        />
                      </div>
                    )
                  }

                  // date 타입은 현재 UI 없음(기능 변화 없이 그대로 무시)
                  return null
                })}
                
                {/* 조회 버튼 - 그리드의 4번째 컬럼으로 배치 */}
                <div className={`hover:bg-gray-200 flex items-center justify-center ${
                  Object.values(searchFilters || {}).some(value => value && value !== "") 
                    ? "bg-brand-500/20" 
                    : "bg-gray-100"
                }`}>
                  <Button 
                    onClick={() => console.log("조회 실행:", searchFilters)}
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer hover:bg-gray-200"
                    title="조회"
                  >
                    <div className="space-x-2 flex items-center">
                      <div className=" text-brand-500 font-bold text-sm">조회</div>
                      <Search className="h-4 w-4 text-brand-500 font-bold" />
                    </div>
                  </Button>
                </div>

                {/* 초기화 버튼 - 그리드의 5번째 컬럼으로 배치 */}
                <div className="bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <Button 
                    onClick={() => {
                      // 모든 필터 초기화
                      if (onFilterChange) {
                        Object.keys(searchFilters || {}).forEach(key => {
                          onFilterChange(key, "")
                        })
                      }
                      // 드롭다운 검색어 초기화
                      setDropdownSearches({})
                      console.log("필터 초기화 완료")
                    }}
                    variant="ghost"
                    size="icon"
                    className=" cursor-pointer hover:bg-gray-200"
                    title="초기화"
                  >
                    <div className="space-x-2 flex items-center">
                      <div className=" text-black font-bold text-sm">초기화</div>
                      <div className="h-4 w-4 text-black font-bold text-center">↺</div>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Group 2: Column toggles & Actions */}
          <div className="space-y-4">
                         <div className="grid grid-cols-4 gap-4">
               {/* Column visibility */}
               <div className="grid grid-cols-3 items-center space-x-3">
                 <label className="text-sm font-medium text-gray-700 whitespace-nowrap col-span-1">표시할 열</label>
                 <div className="col-span-2">
                   <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                       <Button
                         variant="outline"
                         className="h-10 px-4 border-gray-200 hover:bg-gray-50 w-full justify-between"
                       >
                         {visibleColumns.length === columns.length
                           ? "전체선택"
                           : visibleColumns.length === 1
                           ? visibleColumns[0].header
                           : `${visibleColumns.length}개 컬럼`}
                         <ChevronDown className="ml-2 h-4 w-4" />
                       </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="start" className="w-48">
                       <DropdownMenuCheckboxItem
                         checked={visibleColumns.length === columns.length}
                         onCheckedChange={(checked) => {
                           const v = checked === true
                           onColumnsChange(columns.map((col) => ({ ...col, visible: v })))
                         }}
                       >
                         전체선택
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

               {/* Empty space */}
               <div></div>

               {/* Action buttons */}
               <div className="col-span-2 grid grid-cols-2 gap-2">
                {/* Add buttons (v2 first, else v1) */}
                {enableAddFormV2 && onShowAddFormV2 ? (
                  <button
                    onClick={onShowAddFormV2}
                    className="bg-gray-900/60 border border-gray-900/70 hover:bg-gray-800 text-white px-4 py-2 transition-colors cursor-pointer"
                  >
                    추가
                  </button>
                ) : enableAddForm && onShowAddForm ? (
                  <button
                    onClick={onShowAddForm}
                    className="bg-gray-900/60 border border-gray-900/70 hover:bg-gray-800 text-white px-4 py-2 transition-colors cursor-pointer"
                  >
                    {showAddForm ? "취소" : "추가"}
                  </button>
                ) : null}

                {/* Bulk delete */}
                {enableBulkDelete && (
                  <button
                    onClick={handleBulkDeleteClick}
                    disabled={selectedRows.size === 0 || !onBulkDelete}
                    className={cn(
                      "px-4 py-2 transition-colors flex items-center justify-center space-x-2 border",
                      selectedRows.size > 0 && onBulkDelete
                        ? "text-[#FD5108] border-[#FD5108]/70 hover:bg-[#FD5108]/10 bg-[#FD5108]/20 cursor-pointer"
                        : "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                    )}
                  >
                    <span>삭제 ({selectedRows.size})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
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
                    className="cursor-pointer"
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
                <TableCell
                  colSpan={visibleColumns.length + (enableRowSelection ? 2 : 1)}
                  className="h-16 text-center text-gray-500"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    <span>데이터를 불러오는 중입니다...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length + (enableRowSelection ? 2 : 1)}
                  className="h-32 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-gray-400 text-4xl">📋</div>
                    <p className="text-gray-600 text-lg font-medium">표시할 데이터가 없습니다</p>
                    <p className="text-gray-500 text-sm">검색 조건을 변경해보세요</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, index) => {
                const rowId = getRowId(item)
                const isSelected = enableRowSelection && selectedRows.has(rowId)

                return (
                  <TableRow
                    key={rowId || index}
                    data-state={isSelected ? "selected" : undefined}
                    className={cn(
                      "hover:bg-gray-50 transition-colors",
                      isSelected && "bg-blue-50 hover:bg-blue-100"
                    )}
                  >
                    {enableRowSelection && (
                      <TableCell className="p-1.5">
                        <Checkbox
                          checked={selectedRows.has(rowId)}
                          onCheckedChange={(checked) => handleRowSelect(rowId, checked as boolean)}
                          aria-label={`${index + 1}번째 행 선택`}
                          className="cursor-pointer"
                        />
                      </TableCell>
                    )}

                    {visibleColumns.map((column) => (
                      <TableCell key={String(column.key)} className="p-2 text-gray-700 text-sm">
                        {column.render ? column.render(item[column.key], item) : String(item[column.key] ?? "")}
                      </TableCell>
                    ))}

                    {showActionColumn && (
                      <TableCell className="p-1.5">
                        {"actions" in item && item.actions ? (
                          item.actions
                        ) : (
                          <ActionDropdown
                            onCopyId={() => console.log("ID 복사:", item.id || item.code)}
                            onViewCustomer={() => console.log("고객 보기:", item)}
                            onViewDetails={() => console.log("상세 정보 보기:", item)}
                          />
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Form (v1) */}
      {enableAddForm && showAddForm && formData && formFields && onFormDataChange && onAdd && (
        <Dialog open={showAddForm} onOpenChange={onShowAddForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>새 항목 추가</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder || `${field.label}을 입력하세요`}
                      value={formData[field.key] || ""}
                      onChange={(e) => onFormDataChange(field.key, e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required={field.required}
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={onShowAddForm} disabled={isAddLoading}>
                  취소
                </Button>
                <Button onClick={onAdd} disabled={!!isAddLoading || !isNameValid}>
                  {isAddLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      추가 중...
                    </>
                  ) : (
                    "추가"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Form (v2) */}
      {enableAddFormV2 && addFormV2Modal}
    </div>
  )
}