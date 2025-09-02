"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Plus, X, Search, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import { organizationSampleData } from '@/data/organization-data';

interface ExecutivePosition {
  id: string;
  positionCode: string;
  positionName: string;
  positionStartDate: string;
  positionEndDate: string;
}

interface AddExecutivePositionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
  initialData?: any;
}

// 임시 직원 데이터 (실제로는 API에서 가져와야 함)
const employeeSampleData = [
  { employeeId: 'A05001', name: '이도현', jobTitle: '대표이사' },
  { employeeId: 'A05002', name: '김민준', jobTitle: '상무' },
  { employeeId: 'A05003', name: '박서연', jobTitle: '실장' },
  { employeeId: 'A05004', name: '최우진', jobTitle: '실장' },
  { employeeId: 'A05005', name: '정수빈', jobTitle: '상무' },
  { employeeId: 'A05006', name: '강지우', jobTitle: '실장' },
  { employeeId: 'A05007', name: '윤하은', jobTitle: '상무' },
  { employeeId: 'A05008', name: '송민호', jobTitle: '실장' },
  { employeeId: 'A05009', name: '한소영', jobTitle: '상무' },
  { employeeId: 'A05010', name: '임재혁', jobTitle: '실장' }
];

// 직책(조직) Master 데이터에서 고유한 직책만 추출
const getUniquePositions = () => {
  const uniquePositions = new Map();
  organizationSampleData.forEach(org => {
    if (!uniquePositions.has(org.jobCode)) {
      uniquePositions.set(org.jobCode, {
        positionCode: org.jobCode,
        positionName: org.jobTitle
      });
    }
  });
  return Array.from(uniquePositions.values());
};

const positionSampleData = getUniquePositions();

export default function AddExecutivePositionForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isEditMode = false, 
  initialData 
}: AddExecutivePositionFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedExecutive, setSelectedExecutive] = useState<{
    employeeId: string;
    name: string;
    jobTitle: string;
  } | null>(null);
  
  const [positions, setPositions] = useState<ExecutivePosition[]>([]);
  const [showExecutiveSearch, setShowExecutiveSearch] = useState(false);
  const [showPositionSearch, setShowPositionSearch] = useState(false);
  const [executiveSearchQuery, setExecutiveSearchQuery] = useState('');
  const [positionSearchQuery, setPositionSearchQuery] = useState('');
  const [filteredExecutives, setFilteredExecutives] = useState(employeeSampleData);
  const [filteredPositions, setFilteredPositions] = useState(positionSampleData);

  // 유틸: 공통 라벨 클래스
  const labelCls = "block text-base font-medium text-gray-600 mb-1";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 초기 데이터 설정
  useEffect(() => {
    if (isEditMode && initialData) {
      setSelectedExecutive({
        employeeId: initialData.employeeId || '',
        name: initialData.name || '',
        jobTitle: initialData.jobTitle || ''
      });
      // 초기 직책 데이터
      if (initialData.positionCode && initialData.position) {
        setPositions([{
          id: '1',
          positionCode: initialData.positionCode,
          positionName: initialData.position,
          positionStartDate: initialData.positionStartDate || '',
          positionEndDate: initialData.positionEndDate || ''
        }]);
      }
    } else {
      // 신규 추가 시 초기화
      setSelectedExecutive(null);
      setPositions([]);
    }
  }, [isEditMode, initialData, isOpen]);

  // 직원 검색 필터링
  useEffect(() => {
    if (executiveSearchQuery.trim() === '') {
      setFilteredExecutives(employeeSampleData);
    } else {
      const filtered = employeeSampleData.filter(emp => 
        emp.employeeId.toLowerCase().includes(executiveSearchQuery.toLowerCase()) ||
        emp.name.toLowerCase().includes(executiveSearchQuery.toLowerCase())
      );
      setFilteredExecutives(filtered);
    }
  }, [executiveSearchQuery]);

  // 직책 검색 필터링
  useEffect(() => {
    if (positionSearchQuery.trim() === '') {
      setFilteredPositions(positionSampleData);
    } else {
      const filtered = positionSampleData.filter(pos => 
        pos.positionCode.toLowerCase().includes(positionSearchQuery.toLowerCase()) ||
        pos.positionName.toLowerCase().includes(positionSearchQuery.toLowerCase())
      );
      setFilteredPositions(filtered);
    }
  }, [positionSearchQuery]);

  const handleSelectExecutive = (executive: { employeeId: string; name: string; jobTitle: string }) => {
    setSelectedExecutive(executive);
    setExecutiveSearchQuery('');
    setShowExecutiveSearch(false);
  };

  const handleAddPosition = (position: { positionCode: string; positionName: string }) => {
    console.log('Adding position:', position); // 디버깅용
    
    // 이미 추가된 직책인지 확인
    const alreadyExists = positions.some(pos => pos.positionCode === position.positionCode);
    if (alreadyExists) {
      alert('이미 추가된 직책입니다.');
      return;
    }

    const newPosition: ExecutivePosition = {
      id: Date.now().toString(),
      positionCode: position.positionCode,
      positionName: position.positionName,
      positionStartDate: '',
      positionEndDate: ''
    };

    setPositions(prev => [...prev, newPosition]);
    setPositionSearchQuery('');
    setShowPositionSearch(false);
    
    console.log('Position added successfully'); // 디버깅용
  };

  const handleRemovePosition = (positionId: string) => {
    setPositions(prev => prev.filter(pos => pos.id !== positionId));
  };

  const handlePositionDateChange = (positionId: string, field: 'positionStartDate' | 'positionEndDate', value: string) => {
    setPositions(prev => prev.map(pos => 
      pos.id === positionId 
        ? { ...pos, [field]: value }
        : pos
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!selectedExecutive) {
      alert('임원을 선택해주세요.');
      return;
    }
    if (positions.length === 0) {
      alert('최소 1개의 직책을 추가해주세요.');
      return;
    }
    
    // 직책 시작일 검증
    for (const position of positions) {
      if (!position.positionStartDate) {
        alert('모든 직책의 시작일을 입력해주세요.');
        return;
      }
    }

    // 폼 데이터 제출
    const submitData = {
      executive: selectedExecutive,
      positions: positions
    };

    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div 
        className={`border border-warm-grey-600/50 shadow-2xl transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh]' 
            : 'max-w-3xl max-h-[85vh] w-[80vw] h-[85vh]'
        } flex flex-col`}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center flex-shrink-0">
          {/* 헤더 내용 */}
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
                onClick={onClose}
                className="h-7 w-7 p-0 text-white bg-gray-700/30 cursor-pointer hover:bg-gray-700/40"
              >
                <X className="h-5 w-5 text-white font-semibold" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* =============== 제목 =============== */}
          <div className="py-4 bg-[#f7f7f8] border-b border-gray-200">
            <div className="px-6 border-l-4 border-[#EC6437]">
              <h2 className="text-xl font-bold text-[#EC6437]">
                {isEditMode ? '임원별 직책정보 수정' : '임원별 직책정보 등록'}
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 bg-white px-2">
            {/* =============== 임원 선택 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                임원 선택
              </h3>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <div className="flex justify-between items-center mb-3">
                    <label className={labelCls}>
                      임원 정보 <span className="text-red-500">*</span>
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowExecutiveSearch(true)}
                      className="flex items-center space-x-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>임원 찾기</span>
                    </Button>
                  </div>

                  {selectedExecutive ? (
                    <div className="p-4 rounded-lg border border-orange-200" style={{ backgroundColor: '#FEE8D6' }}>
                      <div className="flex items-center justify-between">
                        <div className="grid grid-cols-3 gap-4 flex-1">
                          <div>
                            <span className="text-sm text-gray-600">사번</span>
                            <div className="text-sm font-medium">{selectedExecutive.employeeId}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">성명</span>
                            <div className="text-sm font-medium">{selectedExecutive.name}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">직위</span>
                            <div className="text-sm font-medium">{selectedExecutive.jobTitle}</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedExecutive(null)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      임원을 선택해주세요.
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 임원 검색 모달 */}
            {showExecutiveSearch && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-60">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">임원 검색</h3>
                    <button
                      onClick={() => setShowExecutiveSearch(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="사번 또는 성명으로 검색"
                        value={executiveSearchQuery}
                        onChange={(e) => setExecutiveSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {filteredExecutives.map((executive) => (
                      <div
                        key={executive.employeeId}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer border"
                        onClick={() => handleSelectExecutive(executive)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">{executive.employeeId}</span>
                          <span className="text-sm">{executive.name}</span>
                          <span className="text-sm text-gray-500">{executive.jobTitle}</span>
                        </div>
                        <Plus className="w-4 h-4 text-blue-500" />
                      </div>
                    ))}
                    {filteredExecutives.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        검색 결과가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* =============== 직책 관리 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                직책 관리
              </h3>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <div className="flex justify-between items-center mb-3">
                    <label className={labelCls}>
                      직책 정보 <span className="text-red-500">*</span>
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!selectedExecutive) {
                          alert('먼저 임원을 선택해주세요.');
                          return;
                        }
                        console.log('Available positions:', positionSampleData); // 디버깅용
                        setShowPositionSearch(true);
                      }}
                      className="flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>직책 추가</span>
                    </Button>
                  </div>

                  {/* 추가된 직책 목록 */}
                  <div className="space-y-3 mb-4">
                    {positions.map((position) => (
                      <div
                        key={position.id}
                        className="p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="grid grid-cols-6 gap-4 items-center">
                          <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-600 mb-1">직책코드</label>
                            <span className="text-sm font-medium">{position.positionCode}</span>
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">직책명</label>
                            <span className="text-sm">{position.positionName}</span>
                          </div>
                          <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-600 mb-1">시작일 <span className="text-red-500">*</span></label>
                            <Input
                              type="date"
                              value={position.positionStartDate}
                              onChange={(e) => handlePositionDateChange(position.id, 'positionStartDate', e.target.value)}
                              className="w-full h-8 text-sm"
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-600 mb-1">종료일</label>
                            <Input
                              type="date"
                              value={position.positionEndDate}
                              onChange={(e) => handlePositionDateChange(position.id, 'positionEndDate', e.target.value)}
                              className="w-full h-8 text-sm"
                            />
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleRemovePosition(position.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {positions.length === 0 && (
                      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                        직책을 추가해주세요.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 직책 검색 모달 */}
            {showPositionSearch && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-60">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">직책 검색</h3>
                    <button
                      onClick={() => setShowPositionSearch(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="직책코드 또는 직책명으로 검색"
                        value={positionSearchQuery}
                        onChange={(e) => setPositionSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {filteredPositions.map((position) => (
                      <div
                        key={position.positionCode}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer border"
                        onClick={() => handleAddPosition(position)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">{position.positionCode}</span>
                          <span className="text-sm">{position.positionName}</span>
                        </div>
                        <Plus className="w-4 h-4 text-blue-500" />
                      </div>
                    ))}
                    {filteredPositions.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        검색 결과가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="py-1.5 w-21 text-sm font-semibold text-gray-800 border-gray-800 hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
              >
                취소
              </Button>
              <Button 
                type="submit"
                className="py-1.5 w-21 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 hover:text-white cursor-pointer"
              >
                {isEditMode ? '수정' : '등록'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
