"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "" 
}: PaginationProps) {
  // 전체 페이지가 1 이하면 렌더링하지 않음
  if (totalPages <= 1) {
    return null;
  }

  // 표시할 페이지 번호들을 계산
  const getVisiblePages = () => {
    const delta = 2; // 현재 페이지 양쪽으로 보여줄 페이지 수
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-1">
        {/* 첫 페이지로 이동 */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
          title="첫 페이지"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* 이전 페이지 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
          title="이전 페이지"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* 페이지 번호들 */}
        <div className="flex items-center space-x-1 mx-2">
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-2 py-1 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`px-2 py-1 text-sm font-medium transition-colors duration-200 min-w-[32px] cursor-pointer border-b-2 ${
                    currentPage === page
                      ? 'text-orange-600 border-orange-600'
                      : 'text-gray-600 border-transparent hover:text-orange-600 hover:border-orange-600'
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 다음 페이지 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
          title="다음 페이지"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* 마지막 페이지로 이동 */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
          title="마지막 페이지"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
