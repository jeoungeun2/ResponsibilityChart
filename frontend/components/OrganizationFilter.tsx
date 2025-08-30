"use client";

import { useState } from 'react';

interface OrganizationFilterProps {
  searchFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  filterOptions: {
    orgStatus: Array<{ value: string; label: string }>;
    orgType: Array<{ value: string; label: string }>;
    organizationLv1: Array<{ value: string; label: string }>;
    organizationLv2: Array<{ value: string; label: string }>;
    organizationLv3: Array<{ value: string; label: string }>;
  };
}

export default function OrganizationFilter({
  searchFilters,
  onFilterChange,
  filterOptions
}: OrganizationFilterProps) {
  return (
    <div className="flex items-center space-x-4">
      {/* 기준일자 필터 */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          기준일자
        </label>
        <input
          type="date"
          value={searchFilters.baselineDate || ''}
          onChange={(e) => onFilterChange('baselineDate', e.target.value)}
          className="h-9 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* 조직상태 필터 */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          조직상태
        </label>
        <select
          value={searchFilters.orgStatus || ''}
          onChange={(e) => onFilterChange('orgStatus', e.target.value)}
          className="h-9 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">전체</option>
          {filterOptions.orgStatus?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 조직유형 필터 */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          조직유형
        </label>
        <select
          value={searchFilters.orgType || ''}
          onChange={(e) => onFilterChange('orgType', e.target.value)}
          className="h-9 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">전체</option>
          {filterOptions.orgType?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 필터 초기화 버튼 */}
      <button
        onClick={() => {
          onFilterChange('baselineDate', '');
          onFilterChange('orgStatus', '');
          onFilterChange('orgType', '');
        }}
        className="h-9 px-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors"
      >
        초기화
      </button>
    </div>
  );
}
