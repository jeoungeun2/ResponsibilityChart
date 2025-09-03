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
  required?: boolean // 필수 필터 여부
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
          {searchFilters && onFilterChange && (
            <div className="grid grid-cols-6 gap-4">
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
                        filter.required
                          ? "text-orange-600"
                          : isSelected 
                          ? "text-brand-500" 
                          : "text-gray-700"
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
                                {filterValue ? selectedLabel : (filter.required ? "선택하세요" : "전체선택")}
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

                            {!filter.required && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => onFilterChange(filter.key, "")}
                                  className="cursor-pointer"
                                >
                                  <div className="w-full truncate">전체선택</div>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            )}
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
                        filter.required
                          ? "text-orange-600"
                          : isSelected 
                          ? "text-brand-500" 
                          : "text-gray-700"
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
                    <div key={filter.key} className="grid grid-cols-3 items-center space-x-3">
                      <label className={`text-sm font-medium whitespace-nowrap col-span-1 ${
                        (filter as any).required
                          ? "text-orange-600"
                          : isSelected
                          ? "text-brand-500"
                          : "text-gray-700"
                      }`}>
                        {filter.label}
                      </label>
                      <div className="col-span-2">
                        <StartDateFilter
                          startDate={filterValue}
                          onStartDateChange={(date) => onFilterChange(filter.key, date)}
                          placeholder={filter.placeholder || "연도-월-일"}
                        />
                      </div>
                    </div>
                  )
                }

                // date 타입은 현재 UI 없음(기능 변화 없이 그대로 무시)
                return null
              })}
              
              {/* 조회, 초기화 버튼을 세 칸 앞으로 배치 */}
              <div className="col-span-3 flex justify-end space-x-2">
                <Button 
                  onClick={() => console.log("조회 실행:", searchFilters)}
                  variant="outline"
                  className="flex items-center space-x-2 border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500"
                >
                  <Search className="h-4 w-4 text-orange-600" />
                  <span>조회</span>
                </Button>
                <Button 
                  onClick={() => {
                    // 필수 필터를 제외한 모든 필터 초기화
                    if (onFilterChange) {
                      Object.keys(searchFilters || {}).forEach(key => {
                        const filter = filters?.find(f => f.key === key)
                        if (!filter?.required) {
                          onFilterChange(key, "")
                        }
                      })
                    }
                    // 드롭다운 검색어 초기화
                    setDropdownSearches({})
                    console.log("필터 초기화 완료")
                  }}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <span>초기화</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
