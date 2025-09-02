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
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Search, ChevronDown } from 'lucide-react';

interface Member {
  id: string;
  employeeId: string;
  name: string;
  roleType: string; // '위원장' 또는 '위원'
}

interface AddMeetingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
  initialData?: any;
}

// 임시 직원 데이터 (실제로는 API에서 가져와야 함)
const employeeSampleData = [
  { employeeId: 'A05001', name: '이도현' },
  { employeeId: 'A05002', name: '김민준' },
  { employeeId: 'A05003', name: '박서연' },
  { employeeId: 'A05004', name: '최우진' },
  { employeeId: 'A05005', name: '정수빈' },
  { employeeId: 'A05006', name: '강지우' },
  { employeeId: 'A05007', name: '윤하은' },
  { employeeId: 'A05008', name: '송민호' },
  { employeeId: 'A05009', name: '한소영' },
  { employeeId: 'A05010', name: '임재혁' }
];

export default function AddMeetingForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isEditMode = false, 
  initialData 
}: AddMeetingFormProps) {
  const [formData, setFormData] = useState({
    meetingBody: '',
    meetingFrequency: '',
    mainDecisions: '',
    effectiveStartDate: '',
    effectiveEndDate: ''
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(employeeSampleData);

  // 위원장/위원 옵션
  const roleOptions = [
    { value: '위원장', label: '위원장' },
    { value: '위원', label: '위원' }
  ];

  // 개최주기 옵션
  const frequencyOptions = [
    { value: '월 1회', label: '월 1회' },
    { value: '월 2회', label: '월 2회' },
    { value: '분기 1회', label: '분기 1회' },
    { value: '반기 1회', label: '반기 1회' },
    { value: '연 1회', label: '연 1회' },
    { value: '수시', label: '수시' }
  ];

  // 초기 데이터 설정
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        meetingBody: initialData.meetingBody || '',
        meetingFrequency: initialData.meetingFrequency || '',
        mainDecisions: initialData.mainDecisions || '',
        effectiveStartDate: initialData.effectiveStartDate || '',
        effectiveEndDate: initialData.effectiveEndDate || ''
      });
      // 초기 멤버 데이터 (기존 데이터에서 추출)
      if (initialData.employeeId && initialData.name) {
        setMembers([{
          id: '1',
          employeeId: initialData.employeeId,
          name: initialData.name,
          roleType: initialData.roleType || '위원'
        }]);
      }
    } else {
      // 신규 추가 시 초기화
      setFormData({
        meetingBody: '',
        meetingFrequency: '',
        mainDecisions: '',
        effectiveStartDate: '',
        effectiveEndDate: ''
      });
      setMembers([]);
    }
  }, [isEditMode, initialData, isOpen]);

  // 직원 검색 필터링
  useEffect(() => {
    if (memberSearchQuery.trim() === '') {
      setFilteredEmployees(employeeSampleData);
    } else {
      const filtered = employeeSampleData.filter(emp => 
        emp.employeeId.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
        emp.name.toLowerCase().includes(memberSearchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [memberSearchQuery]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddMember = (employee: { employeeId: string; name: string }) => {
    // 이미 추가된 멤버인지 확인
    const alreadyExists = members.some(member => member.employeeId === employee.employeeId);
    if (alreadyExists) {
      alert('이미 추가된 멤버입니다.');
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      employeeId: employee.employeeId,
      name: employee.name,
      roleType: '위원' // 기본값으로 '위원' 설정
    };

    setMembers(prev => [...prev, newMember]);
    setMemberSearchQuery('');
    setShowMemberSearch(false);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleMemberRoleChange = (memberId: string, roleType: string) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, roleType }
        : member
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.meetingBody.trim()) {
      alert('주관회의체를 입력해주세요.');
      return;
    }
    if (!formData.meetingFrequency) {
      alert('개최주기를 선택해주세요.');
      return;
    }
    if (!formData.effectiveStartDate) {
      alert('적용시작일자를 입력해주세요.');
      return;
    }
    if (members.length === 0) {
      alert('최소 1명의 멤버를 추가해주세요.');
      return;
    }
    
    // 위원장이 있는지 확인
    const hasChairman = members.some(member => member.roleType === '위원장');
    if (!hasChairman) {
      alert('최소 1명의 위원장을 지정해주세요.');
      return;
    }

    // 폼 데이터 제출
    const submitData = {
      ...formData,
      members: members
    };

    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isEditMode ? '회의체 정보 수정' : '회의체 정보 추가'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                주관회의체 <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.meetingBody}
                onChange={(e) => handleInputChange('meetingBody', e.target.value)}
                placeholder="주관회의체를 입력하세요"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                개최주기 <span className="text-red-500">*</span>
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between h-10"
                  >
                    {formData.meetingFrequency || "선택하세요"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {frequencyOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleInputChange('meetingFrequency', option.value)}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                적용시작일자 <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={formData.effectiveStartDate}
                onChange={(e) => handleInputChange('effectiveStartDate', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                적용종료일자
              </label>
              <Input
                type="date"
                value={formData.effectiveEndDate}
                onChange={(e) => handleInputChange('effectiveEndDate', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주요심의의결사항
            </label>
            <Textarea
              value={formData.mainDecisions}
              onChange={(e) => handleInputChange('mainDecisions', e.target.value)}
              placeholder="주요심의의결사항을 입력하세요"
              rows={4}
              className="w-full"
            />
          </div>

          {/* 멤버 관리 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                멤버 <span className="text-red-500">*</span>
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowMemberSearch(true)}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>멤버 추가</span>
              </Button>
            </div>

            {/* 추가된 멤버 목록 */}
            <div className="space-y-3 mb-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="text-sm font-medium w-20">{member.employeeId}</span>
                    <span className="text-sm w-24">{member.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">역할:</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 px-3"
                          >
                            {member.roleType}
                            <ChevronDown className="h-3 w-3 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {roleOptions.map((option) => (
                            <DropdownMenuItem
                              key={option.value}
                              onClick={() => handleMemberRoleChange(member.id, option.value)}
                              className="cursor-pointer"
                            >
                              {option.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {members.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  추가된 멤버가 없습니다.
                </div>
              )}
            </div>

            {/* 멤버 검색 모달 */}
            {showMemberSearch && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-60">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">멤버 검색</h3>
                    <button
                      onClick={() => setShowMemberSearch(false)}
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
                        value={memberSearchQuery}
                        onChange={(e) => setMemberSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {filteredEmployees.map((employee) => (
                      <div
                        key={employee.employeeId}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => handleAddMember(employee)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">{employee.employeeId}</span>
                          <span className="text-sm">{employee.name}</span>
                        </div>
                        <Plus className="w-4 h-4 text-blue-500" />
                      </div>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        검색 결과가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              취소
            </Button>
            <Button type="submit">
              {isEditMode ? '수정' : '추가'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
