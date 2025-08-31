import { ResponsibilityAllocationData } from '@/data/responsibility-allocation-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Maximize2, Minimize2, X } from 'lucide-react';
import ApprovalRequestButton from '@/app/master/department/_components/ApprovalRequestButton';
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  책무 배분 임원
                </h3>
                <button className="py-1 px-2 text-sm border-brand-gray-500 border font-medium transition-colors flex items-center gap-1 text-brand-gray-500 cursor-pointer hover:text-brand-gray-600 hover:border-border-brand-gray-600">
                  조회
                  <Search className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <label className="block text-base font-medium text-gray-600 mb-1">직책 (Position)</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full px-4 justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          전체
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full">
                      <DropdownMenuItem className="cursor-pointer">
                        전체
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        CEO
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        CFO
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        CTO
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        COO
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="col-span-12 md:col-span-4">
                  <label className="block text-base font-medium text-gray-600 mb-1">사번 (Employee ID)</label>
                  <Input
                    type="text"
                    placeholder="사번을 입력하세요"
                  />
                </div>
                
                <div className="col-span-12 md:col-span-4">
                  <label className="block text-base font-medium text-gray-600 mb-1">성명 (Name)</label>
                  <Input
                    type="text"
                    placeholder="성명을 입력하세요"
                  />
                </div>
              </div>
              
              
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <ApprovalRequestButton 
                onClick={() => console.log('책무배분 승인요청')}
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
