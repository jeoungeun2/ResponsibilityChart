"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StartDateFilter } from "@/components/ui/DateFilter"

/* ----------------------------- Types & Helpers ---------------------------- */

type FilterType = "dropdown" | "input" | "date"

export interface FilterConfig {
  key: string
  label: string
  type: FilterType
  placeholder?: string
  width?: string
  dateRange?: boolean // 날짜 범위 여부
}

export interface SearchFilterProps {
  // Filters
  searchFilters?: Record<string, string>
  onFilterChange?: (key: string, value: string) => void
  filterOptions?: Record<string, Array<{ value: string; label: string }>>
  filters?: Array<FilterConfig>
}

/* --------------------------------- Main ---------------------------------- */

export function SearchFilter({
  searchFilters,
  onFilterChange,
  filterOptions,
  filters,
}: SearchFilterProps) {
  const [dropdownSearches, setDropdownSearches] = useState<Record<string, string>>({})

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

  return (
    <div className="p-3 bg-brand-grey-100 border border-brand-grey-200">
      <div className="grid gap-3">
        {/* Group 1: Search & Filters */}
        <div className="space-y-4 pb-1">
          {/* 필터 제목 추가 */}
          <div className="grid grid-cols-7 gap-2 items-center">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-semibold text-gray-900">필터</h3>
            </div>
            
            {/* 빈 공간 */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            
            {/* 조회 버튼 */}
            <div className={`hover:bg-gray-200 flex items-center justify-center border border-gray-200 ${
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

            {/* 초기화 버튼 */}
            <div className="bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-200">
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
          
          {searchFilters && onFilterChange && (
            <div className="grid grid-cols-5 gap-4">
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
                    <div key={filter.key} className="grid grid-cols-3 items-center gap-3">
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
                        className={`h-10 col-span-2 ${
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
