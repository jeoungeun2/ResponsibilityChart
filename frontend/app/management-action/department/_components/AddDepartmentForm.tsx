"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Maximize2, Minimize2, X, Search, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';



interface AddDepartmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Record<string, any>;
  onFormDataChange: (field: string, value: any) => void;
  onAdd: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isEdit?: boolean;
}

export default function AddDepartmentForm({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onAdd,
  isLoading = false,
  disabled = false,
  isEdit = false
}: AddDepartmentFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isManagementActionModalOpen, setIsManagementActionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamSearchTerm, setTeamSearchTerm] = useState("");
  const [teams, setTeams] = useState<Array<{
    id: string;
    managementTargetOrgCode: string;
    managementTargetOrgName: string;
    departmentCode: string;
    departmentName: string;
    teamCode: string;
    teamName: string;
    manager: string;
    reviewer: string;
  }>>([]);
  
  // 유틸: 공통 인풋 클래스
  const labelCls = "block text-base font-medium text-gray-600 mb-1";

  // 관리조치 검색용 샘플 데이터
  const managementActionSearchData = [
    {
      dutyCode: "ET-금융영업-B1",
      duty: "집합투자업무와 관련된 책무",
      dutyDetailCode: "ET-금융영업-B1-A",
      dutyDetail: "집합투자 운용준칙 수립 및 리스크관리 업무를 관리·감독할 책임",
      managementObligationCode: "MO-001",
      managementObligation: "관리감독의무",
      managementActionCode: "MA-001",
      managementAction: "기준마련여부 점검"
    },
    {
      dutyCode: "ET-금융영업-B1",
      duty: "집합투자업무와 관련된 책무",
      dutyDetailCode: "ET-금융영업-B1-B",
      dutyDetail: "집합투자 운용 및 운용지시 업무를 관리·감독할 책임",
      managementObligationCode: "MO-001",
      managementObligation: "관리감독의무",
      managementActionCode: "MA-002",
      managementAction: "효과적집행운영여부 점검"
    },
    {
      dutyCode: "ET-금융영업-B1",
      duty: "집합투자업무와 관련된 책무",
      dutyDetailCode: "ET-금융영업-B1-C",
      dutyDetail: "집합투자 외부감응 모니터링 및 보고업무를 관리·감독할 책임",
      managementObligationCode: "MO-001",
      managementObligation: "관리감독의무",
      managementActionCode: "MA-003",
      managementAction: "임직원 준수여부 점검"
    },
    {
      dutyCode: "AU-지정책임-A2",
      duty: "내부감사업무와 관련된 책무",
      dutyDetailCode: "AU-지정책임-A2-A",
      dutyDetail: "내부감사체계 구축 및 운영을 관리·감독할 책임",
      managementObligationCode: "MO-002",
      managementObligation: "준법감시의무",
      managementActionCode: "MA-004",
      managementAction: "관리사항 및 미흡사항 조치"
    },
    {
      dutyCode: "AM-경영관리-C2",
      duty: "인사업무와 관련된 책무",
      dutyDetailCode: "AM-경영관리-C2-A",
      dutyDetail: "인사업무 기준 수립 및 운영을 관리·감독할 책임",
      managementObligationCode: "MO-003",
      managementObligation: "내부통제의무",
      managementActionCode: "MA-005",
      managementAction: "조치이행여부 점검"
    }
  ];

  // 검색된 데이터 필터링
  const filteredData = managementActionSearchData.filter(item =>
    item.dutyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.duty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dutyDetailCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dutyDetail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.managementObligationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.managementObligation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.managementActionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.managementAction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 관리조치 선택 핸들러
  const handleManagementActionSelect = (item: any) => {
    onFormDataChange("managementAction", item.managementAction);
    onFormDataChange("managementActionCode", item.managementActionCode);
    setIsManagementActionModalOpen(false);
    setSearchTerm("");
  };

  // 수행팀 검색용 샘플 데이터
  const teamSearchData = [
    {
      managementTargetOrgCode: "ORG-001",
      managementTargetOrgName: "ETF투자부문",
      departmentCode: "DEPT-001",
      departmentName: "금융영업부",
      teamCode: "TEAM-001",
      teamName: "금융영업팀"
    },
    {
      managementTargetOrgCode: "ORG-001",
      managementTargetOrgName: "ETF투자부문",
      departmentCode: "DEPT-002",
      departmentName: "운용부",
      teamCode: "TEAM-002",
      teamName: "운용팀"
    },
    {
      managementTargetOrgCode: "ORG-001",
      managementTargetOrgName: "ETF투자부문",
      departmentCode: "DEPT-003",
      departmentName: "리스크관리부",
      teamCode: "TEAM-003",
      teamName: "리스크관리팀"
    },
    {
      managementTargetOrgCode: "ORG-002",
      managementTargetOrgName: "감사실",
      departmentCode: "DEPT-004",
      departmentName: "내부감사부",
      teamCode: "TEAM-004",
      teamName: "내부감사팀"
    },
    {
      managementTargetOrgCode: "ORG-003",
      managementTargetOrgName: "경영관리부문",
      departmentCode: "DEPT-005",
      departmentName: "인사부",
      teamCode: "TEAM-005",
      teamName: "인사팀"
    },
    {
      managementTargetOrgCode: "ORG-003",
      managementTargetOrgName: "경영관리부문",
      departmentCode: "DEPT-006",
      departmentName: "재무부",
      teamCode: "TEAM-006",
      teamName: "재무팀"
    },
    {
      managementTargetOrgCode: "ORG-003",
      managementTargetOrgName: "경영관리부문",
      departmentCode: "DEPT-007",
      departmentName: "회계부",
      teamCode: "TEAM-007",
      teamName: "회계팀"
    },
    {
      managementTargetOrgCode: "ORG-004",
      managementTargetOrgName: "공통",
      departmentCode: "DEPT-008",
      departmentName: "개인정보보호부",
      teamCode: "TEAM-008",
      teamName: "개인정보보호팀"
    },
    {
      managementTargetOrgCode: "ORG-004",
      managementTargetOrgName: "공통",
      departmentCode: "DEPT-009",
      departmentName: "내부통제부",
      teamCode: "TEAM-009",
      teamName: "내부통제팀"
    }
  ];

  // 검색된 수행팀 데이터 필터링
  const filteredTeamData = teamSearchData.filter(item =>
    item.managementTargetOrgCode.toLowerCase().includes(teamSearchTerm.toLowerCase()) ||
    item.managementTargetOrgName.toLowerCase().includes(teamSearchTerm.toLowerCase()) ||
    item.departmentCode.toLowerCase().includes(teamSearchTerm.toLowerCase()) ||
    item.departmentName.toLowerCase().includes(teamSearchTerm.toLowerCase()) ||
    item.teamCode.toLowerCase().includes(teamSearchTerm.toLowerCase()) ||
    item.teamName.toLowerCase().includes(teamSearchTerm.toLowerCase())
  );

  // 담당자 및 리뷰어 옵션 데이터
  const managerOptions = [
    "김영수", "이지현", "정수진", "최동현", "한미영", "송태호", "윤서연", 
    "강민호", "조현우", "임소영", "배준호", "신예린", "오세훈", "류지은", "홍길동"
  ];

  const reviewerOptions = [
    "박민정", "김철수", "이영희", "정민수", "최수진", "한지훈", "송미영", 
    "윤태호", "강서연", "조민호", "임현우", "배소영", "신준호", "오예린", "류세훈"
  ];

  // 수행팀 선택 핸들러
  const handleTeamSelect = (item: any) => {
    const newTeam = {
      id: Date.now().toString(),
      ...item,
      manager: "",
      reviewer: ""
    };
    setTeams(prev => [...prev, newTeam]);
    setIsTeamModalOpen(false);
    setTeamSearchTerm("");
  };

  // 수행팀 삭제 핸들러
  const handleTeamRemove = (id: string) => {
    setTeams(prev => prev.filter(team => team.id !== id));
  };

  // 담당자 변경 핸들러
  const handleManagerChange = (teamId: string, manager: string) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, manager } : team
    ));
  };

  // 리뷰어 변경 핸들러
  const handleReviewerChange = (teamId: string, reviewer: string) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, reviewer } : team
    ));
  };

  const handleAdd = () => {
    onAdd();
    if (!isLoading && !disabled) {
      onOpenChange(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!open) return null;

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
          {/* =============== 제목 =============== */}
          <div className="py-4 bg-[#f7f7f8] border-b border-gray-200">
            <div className="px-6 border-l-4 border-[#EC6437]">
              <h2 className="text-xl font-bold text-[#EC6437]">
                {isEdit ? '관리조치 수행팀정보 수정등록' : '관리조치 수행팀정보 등록'}
              </h2>
            </div>
          </div>

          <div className="space-y-2 bg-white px-2">
            {/* =============== 관리조치 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                관리조치
              </h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>
                    관리조치 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="관리조치를 검색하세요"
                      value={formData.managementAction || ""}
                      readOnly
                      className="pr-10 cursor-pointer"
                      onClick={() => setIsManagementActionModalOpen(true)}
                    />
                    <Search 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" 
                      onClick={() => setIsManagementActionModalOpen(true)}
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <label className={labelCls}>관리조치코드</label>
                  <Input 
                    type="text" 
                    value={formData.managementActionCode || "조회 시 자동표시"}
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed" 
                  />
                </div>
              </div>
            </section>

            {/* =============== 수행팀 =============== */}
            <section className="p-4 border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  수행팀
                </h3>
                {!isEdit && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTeamModalOpen(true)}
                    className="flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>수행팀 추가</span>
                  </Button>
                )}
              </div>

              {/* 선택된 수행팀 목록 */}
              {teams.length > 0 ? (
                <div className="space-y-3">
                  {teams.map((team) => (
                    <div key={team.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="space-y-4">
                        {/* 첫 번째 줄: 관리대상조직, 소관부서명, 소관팀명 */}
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-4">
                            <label className={labelCls}>관리대상조직</label>
                            <Input 
                              type="text" 
                              value={team.managementTargetOrgName}
                              readOnly 
                              className="bg-white text-gray-700" 
                            />
                          </div>
                          <div className="col-span-4">
                            <label className={labelCls}>소관부서명</label>
                            <Input 
                              type="text" 
                              value={team.departmentName}
                              readOnly 
                              className="bg-white text-gray-700" 
                            />
                          </div>
                          <div className="col-span-4">
                            <label className={labelCls}>소관팀명</label>
                            <Input 
                              type="text" 
                              value={team.teamName}
                              readOnly 
                              className="bg-white text-gray-700" 
                            />
                          </div>
                        </div>
                        
                        {/* 두 번째 줄: 담당자, 리뷰어 */}
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-6">
                            <label className={labelCls}>담당자</label>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full px-4 justify-between"
                                >
                                  <span className="truncate flex-1 text-left">
                                    {team.manager || "담당자를 선택하세요"}
                                  </span>
                                  <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start" className="w-full">
                                {managerOptions.map((manager) => (
                                  <DropdownMenuItem
                                    key={manager}
                                    onClick={() => handleManagerChange(team.id, manager)}
                                    className="cursor-pointer"
                                  >
                                    {manager}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="col-span-6">
                            <label className={labelCls}>리뷰어</label>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full px-4 justify-between"
                                >
                                  <span className="truncate flex-1 text-left">
                                    {team.reviewer || "리뷰어를 선택하세요"}
                                  </span>
                                  <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start" className="w-full">
                                {reviewerOptions.map((reviewer) => (
                                  <DropdownMenuItem
                                    key={reviewer}
                                    onClick={() => handleReviewerChange(team.id, reviewer)}
                                    className="cursor-pointer"
                                  >
                                    {reviewer}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>수행팀을 추가해주세요.</p>
                </div>
              )}
            </section>

            {/* =============== 액션 버튼 =============== */}
            <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-gray-200 pr-4 pb-4 sticky bottom-0 bg-white/30 backdrop-blur-sm">
              <Button
                onClick={handleAdd}
                disabled={isLoading || disabled}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
              >
                등록
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 관리조치 검색 팝업 */}
      <Dialog open={isManagementActionModalOpen} onOpenChange={setIsManagementActionModalOpen}>
        <DialogContent className="max-w-none w-[95vw] max-h-[80vh] overflow-hidden" style={{ width: '95vw', maxWidth: 'none' }}>
          <DialogHeader>
            <DialogTitle>관리조치 검색</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* 검색 입력 */}
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="책무코드, 책무, 책무상세코드, 책무상세, 관리의무코드, 관리의무, 관리조치코드, 관리조치로 검색하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            {/* 테이블 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">책무코드</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">책무</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">책무상세코드</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">책무상세</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">관리의무코드</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">관리의무</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">관리조치코드</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">관리조치</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-gray-50 cursor-pointer border-b"
                        onClick={() => handleManagementActionSelect(item)}
                      >
                        <td className="px-3 py-2 text-gray-700">{item.dutyCode}</td>
                        <td className="px-3 py-2 text-gray-700">{item.duty}</td>
                        <td className="px-3 py-2 text-gray-700">{item.dutyDetailCode}</td>
                        <td className="px-3 py-2 text-gray-700">{item.dutyDetail}</td>
                        <td className="px-3 py-2 text-gray-700">{item.managementObligationCode}</td>
                        <td className="px-3 py-2 text-gray-700">{item.managementObligation}</td>
                        <td className="px-3 py-2 text-gray-700">{item.managementActionCode}</td>
                        <td className="px-3 py-2 text-gray-700">{item.managementAction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsManagementActionModalOpen(false);
                  setSearchTerm("");
                }}
              >
                취소
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 수행팀 검색 팝업 */}
      <Dialog open={isTeamModalOpen} onOpenChange={setIsTeamModalOpen}>
        <DialogContent className="max-w-none w-[95vw] max-h-[80vh] overflow-hidden" style={{ width: '95vw', maxWidth: 'none' }}>
          <DialogHeader>
            <DialogTitle>수행팀 검색</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* 검색 입력 */}
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="관리대상조직코드, 관리대상조직명, 소관부서코드, 소관부서명, 소관팀코드, 소관팀명으로 검색하세요"
                value={teamSearchTerm}
                onChange={(e) => setTeamSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            {/* 테이블 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">관리대상조직코드</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">관리대상조직명</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">소관부서코드</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">소관부서명</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">소관팀코드</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-900 border-b">소관팀명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeamData.map((item, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-gray-50 cursor-pointer border-b"
                        onClick={() => handleTeamSelect(item)}
                      >
                        <td className="px-3 py-2 text-gray-700">{item.managementTargetOrgCode}</td>
                        <td className="px-3 py-2 text-gray-700">{item.managementTargetOrgName}</td>
                        <td className="px-3 py-2 text-gray-700">{item.departmentCode}</td>
                        <td className="px-3 py-2 text-gray-700">{item.departmentName}</td>
                        <td className="px-3 py-2 text-gray-700">{item.teamCode}</td>
                        <td className="px-3 py-2 text-gray-700">{item.teamName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsTeamModalOpen(false);
                  setTeamSearchTerm("");
                }}
              >
                취소
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
