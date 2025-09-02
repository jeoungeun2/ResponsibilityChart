import { ResponsibilityAllocationData } from '@/data/responsibility-allocation-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Maximize2, Minimize2, X } from 'lucide-react';

import { useState } from 'react';

interface DutyDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dutyData: ResponsibilityAllocationData | null;
}

export default function DutyDetailModal({ 
  open, 
  onOpenChange, 
  dutyData 
}: DutyDetailModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 임원관리 Master 데이터 (실제로는 API에서 가져올 데이터)
  const executiveData = [
    { position: '대표이사', employeeId: 'EMP001', employeeName: '김대표' },
    { position: '부사장', employeeId: 'EMP002', employeeName: '이부사' },
    { position: '전무', employeeId: 'EMP003', employeeName: '박전무' },
    { position: '상무', employeeId: 'EMP004', employeeName: '최상무' },
    { position: '이사', employeeId: 'EMP005', employeeName: '정이사' },
    { position: '감사', employeeId: 'EMP006', employeeName: '한감사' },
    { position: '사외이사', employeeId: 'EMP007', employeeName: '조사외' },
  ];
  
  const handlePositionSelect = (executive: { position: string; employeeId: string; employeeName: string }) => {
    setSelectedPosition(executive.position);
    setEmployeeId(executive.employeeId);
    setEmployeeName(executive.employeeName);
    setIsPositionModalOpen(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setSelectedPosition(value);
  };

  // 검색어에 따라 필터링된 임원 목록
  const filteredExecutives = executiveData.filter(executive =>
    executive.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    executive.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    executive.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!open || !dutyData) return null;
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div 
        className={`border border-warm-grey-600/50 shadow-2xl transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-w-[95vw] max-h-[80vh] w-[95vw] h-[80vh] ' 
            : ' max-w-3xl max-h-[80vh] w-[80vw] h-[80vh]'
        } flex flex-col`}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center flex-shrink-0">
          <div className="flex justify-between items-center w-full relative z-50 border-b border-white/20 py-1 px-2 relative bg-white/10 backdrop-blur-md">
            <div className="flex items-center">
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40"
              >
                {isExpanded ? (
                  <Minimize2 className="h-5 w-5 text-white font-semibold" />
                ) : (
                  <Maximize2 className="h-5 w-5 text-white font-semibold" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40"
              >
                <X className="h-5 w-5 text-white font-semibold" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* 제목 */}
          <div className="py-4 bg-[#f7f7f8] border-b border-gray-200">
            <div className="px-6 border-l-4 border-[#EC6437]">
              <h2 className="text-xl font-bold text-[#EC6437]">
                책무 배분
              </h2>
            </div>
          </div>
          
          <div className="space-y-2 bg-white px-2">
            {/* 책무 상세 정보 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                책무 상세 정보
              </h3>
              
                             <div className="border border-gray-200 overflow-hidden">
                                   <div className="flex border-b border-gray-300 last:border-b-0">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무코드</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                      {dutyData.code}
                    </div>
                  </div>
                  
                  <div className="flex border-b border-gray-300 last:border-b-0">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무명</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                      {dutyData.name}
                    </div>
                  </div>
                  
                  <div className="flex border-b border-gray-300 last:border-b-0">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무세부코드</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                      {dutyData.code}-A
                    </div>
                  </div>
                  
                  <div className="flex border-b border-gray-300 last:border-b-0">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">책무세부내용</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                      {dutyData.detailContent}
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-32 flex-shrink-0 text-[14px] font-medium text-gray-700 px-4 py-1.5 bg-[#f6efed] flex items-center">관리의무</div>
                    <div className="flex-1 px-4 py-1.5 text-gray-800 border-l border-gray-300 flex items-center text-[14px]">
                      {dutyData.managementObligation}
                    </div>
                  </div>
               </div>
            </section>

            {/* 책무 배분 임원 */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  책무 배분 임원
                </h3>
              </div>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <label className="block text-base font-medium text-gray-600 mb-1">직책 (Position)</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="직책을 검색하세요"
                      className="w-full pr-10"
                      value={selectedPosition}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      readOnly
                    />
                    <button
                      onClick={() => setIsPositionModalOpen(true)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-12 md:col-span-4">
                  <label className="block text-base font-medium text-gray-600 mb-1">사번 (Employee ID)</label>
                  <Input
                    type="text"
                    value={employeeId}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                    placeholder="직책 선택 시 자동 입력"
                  />
                </div>
                
                <div className="col-span-12 md:col-span-4">
                  <label className="block text-base font-medium text-gray-600 mb-1">성명 (Name)</label>
                  <Input
                    type="text"
                    value={employeeName}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                    placeholder="직책 선택 시 자동 입력"
                  />
                </div>
              </div>
              
              
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <Button 
                onClick={() => console.log('책무배분 등록')}
                disabled={false}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
              >
                등록
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 직책 선택 팝업 */}
      {isPositionModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-[90vw] max-h-[80vh] flex flex-col">
            {/* 팝업 헤더 */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">직책 선택</h3>
              <button
                onClick={() => setIsPositionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* 검색 필드 */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="직책, 사번, 성명으로 검색하세요"
                  className="w-full pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* 임원 목록 */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {filteredExecutives.map((executive, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handlePositionSelect(executive)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{executive.position}</div>
                        <div className="text-sm text-gray-500">{executive.employeeName}</div>
                      </div>
                      <div className="text-sm text-gray-500">{executive.employeeId}</div>
                    </div>
                  </div>
                ))}
                {filteredExecutives.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
