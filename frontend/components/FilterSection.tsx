import { Filter, Search } from 'lucide-react';

interface FilterSectionProps {
  // 검색 필터 상태
  searchFilters: {
    keyword: string;
    evaluationStatus: 'NOT_STARTED' | 'STARTED' | 'IN_PROGRESS' | '';
    sortBy: 'name' | 'positionLabel' | 'email' | 'createdAt';
    order: 'asc' | 'desc';
  };
  // 필터 변경 핸들러
  onFilterChange: (key: 'keyword' | 'evaluationStatus' | 'order' | 'sortBy', value: string) => void;
  // 정렬 변경 핸들러
  onSortChange: (sortBy: 'name' | 'createdAt') => void;
}

export default function FilterSection({ 
  searchFilters, 
  onFilterChange, 
  onSortChange 
}: FilterSectionProps) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center space-x-4 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-medium text-gray-900">검색 및 필터</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 키워드 검색 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="이름/이메일 검색..."
            value={searchFilters.keyword}
            onChange={(e) => onFilterChange('keyword', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 평가상태 필터 */}
        <div>
          <select
            value={searchFilters.evaluationStatus}
            onChange={(e) => onFilterChange('evaluationStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">모든 상태</option>
            <option value="NOT_STARTED">미시작</option>
            <option value="STARTED">시작</option>
            <option value="IN_PROGRESS">진행중</option>
          </select>
        </div>

        {/* 정렬 기준 */}
        <div>
          <select
            value={searchFilters.sortBy}
            onChange={(e) => onSortChange(e.target.value as 'name' | 'createdAt')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt">생성일순</option>
            <option value="name">이름순</option>
          </select>
        </div>

        {/* 정렬 순서 */}
        <div>
          <button
            onClick={() => onFilterChange('order', searchFilters.order === 'asc' ? 'desc' : 'asc')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            {searchFilters.order === 'asc' ? '오름차순' : '내림차순'}
          </button>
        </div>
      </div>
    </div>
  );
}
