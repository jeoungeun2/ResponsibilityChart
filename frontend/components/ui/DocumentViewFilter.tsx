"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RotateCcw } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { StartDateFilter } from '@/components/ui/DateFilter';

interface FilterConfig {
  key: string;
  label: string;
  type: 'dropdown' | 'input' | 'date';
  placeholder?: string;
  required?: boolean;
  width?: string;
}

interface FilterOption {
  value: string;
  label: string;
}

interface DocumentViewFilterProps {
  searchFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  filters: FilterConfig[];
  filterOptions: Record<string, FilterOption[]>;
}

export default function DocumentViewFilter({
  searchFilters,
  onFilterChange,
  filters,
  filterOptions
}: DocumentViewFilterProps) {
  const [dropdownSearches, setDropdownSearches] = useState<Record<string, string>>({});

  const getFilteredOptions = (filterKey: string) => {
    const options = filterOptions[filterKey] || [];
    const searchTerm = dropdownSearches[filterKey] || '';
    
    if (!searchTerm) return options;
    
    return options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="p-3 bg-brand-grey-100 border border-brand-grey-200">
      <div className="grid gap-3">
        {/* Group 1: Search & Filters */}
        <div className="space-y-4 border-b border-gray-300 pb-3">
          
          <div className="flex items-end gap-4">
            <div className="flex-1 grid grid-cols-4 gap-4">
              {filters?.map((filter) => {
                const filterValue = searchFilters[filter.key] || "";

                if (filter.type === "dropdown") {
                  const options = filterOptions?.[filter.key] || [];
                  const selectedLabel =
                    options.find((opt) => opt.value === filterValue)?.label || filterValue;
                  const isSelected = filterValue && filterValue !== "";

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
                              className={`w-full justify-between text-left font-normal ${
                                isSelected 
                                  ? "border-brand-500/80 focus:ring-brand-500/20 focus:border-brand-500" 
                                  : ""
                              }`}
                            >
                              <span className="truncate">
                                {selectedLabel || filter.placeholder || `${filter.label}을 선택하세요`}
                              </span>
                              <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full min-w-[200px] max-h-[300px] overflow-y-auto">
                            <div className="p-2">
                              <Input
                                placeholder={`${filter.label} 검색...`}
                                value={dropdownSearches[filter.key] || ""}
                                onChange={(e) => setDropdownSearches(prev => ({
                                  ...prev,
                                  [filter.key]: e.target.value
                                }))}
                                className="h-8 text-sm"
                              />
                            </div>
                            <DropdownMenuSeparator />
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
                  );
                }

                if (filter.type === "input") {
                  const isSelected = filterValue && filterValue !== "";
                  
                  return (
                    <div key={filter.key} className="grid grid-cols-3 items-center space-x-3">
                      <label className={`text-sm font-medium whitespace-nowrap col-span-1 ${
                        isSelected ? "text-brand-500" : "text-gray-700"
                      }`}>
                        {filter.label}
                      </label>
                      <div className="col-span-2">
                        <Input
                          type="text"
                          placeholder={filter.placeholder || `${filter.label}을 입력하세요`}
                          value={filterValue}
                          onChange={(e) => onFilterChange(filter.key, e.target.value)}
                          className={`h-10 w-full ${
                            isSelected 
                              ? "border-brand-500/80 focus:ring-brand-500/20 focus:border-brand-500" 
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  );
                }

                if (filter.type === "date") {
                  const isSelected = filterValue && filterValue !== "";
                  
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
                  );
                }

                // date 타입은 현재 UI 없음(기능 변화 없이 그대로 무시)
                return null;
              })}
            </div>
            
            {/* 조회, 초기화 버튼을 오른쪽 끝으로 배치 */}
            <div className="col-span-1 flex justify-end space-x-2">
              <Button 
                onClick={() => console.log("조회 실행:", searchFilters)}
                variant="outline"
                className="flex items-center space-x-2 border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500"
              >
                <Search className="h-4 w-4" />
                <span>조회</span>
              </Button>
              <Button 
                onClick={() => {
                  Object.keys(searchFilters || {}).forEach(key => {
                    onFilterChange(key, "")
                  })
                  setDropdownSearches({})
                  console.log("필터 초기화 완료")
                }}
                variant="outline"
                className="flex items-center space-x-2 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                <span>초기화</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
