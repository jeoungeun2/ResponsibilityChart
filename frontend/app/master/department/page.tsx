"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import CommonBreadcrumb from '../executive/_components/Breadcrumb';
import Header from '../executive/_components/Header';
import { useSidebar } from '@/config/providers';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import { DutyData, sampleData } from '@/data/department-data';
import AddDutyForm from './_components/AddDutyForm';




export default function DepartmentPage() {
  const { isSidebarCollapsed } = useSidebar();
  
  // 추가 폼 관련 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // 수정 폼 관련 상태 관리
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState<Record<string, any>>({});
  
  // 이사회승인증빙 팝업 관련 상태 관리
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
   
  // 필터 관련 상태 관리
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    referenceDate: '',
    position: '',
    category: '',
    responsibilityName: ''
  });

  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 5개 페이지가 있다고 가정

  // 수정 버튼 클릭 핸들러
  const handleEdit = (row: any) => {
    // 기존 데이터를 폼에서 사용할 수 있는 형태로 변환
    const editData = {
      ...row,
      // 책무세부내용 (샘플 데이터)
      dutyDetails: [row.detailContent || "내부통제기준마련, 업무절차 수립 등에 대한 관리감독"],
      // 관련법령 (샘플 데이터)
      relatedLaws: [[{ law: row.relatedLaws || "자본시장법", article: "제22조" }]],
      // 내규 (샘플 데이터)
      internalRegulations: [[{ regulation: "내부통제기준", article: "제1조" }]],
      // 관리의무 (샘플 데이터)
      managementObligations: [["관리감독의무"]],
      // 위험도평가
      riskLevels: [row.riskLevel || "중위험"],
      // 사용여부
      usageStatus: "Y",
      // 수정유형 기본값
      editType: "simple"
    };
    
    setEditFormData(editData);
    setShowEditForm(true);
  };

  // 추가 처리 핸들러 (기능 없음)
  const handleAdd = () => {
    console.log('추가 기능은 구현되지 않았습니다.', formData);
    // 여기에 실제 추가 로직을 구현할 수 있습니다
  };

  // 수정 처리 핸들러 (기능 없음)
  const handleEditSubmit = () => {
    console.log('수정 기능은 구현되지 않았습니다.', editFormData);
    // 여기에 실제 수정 로직을 구현할 수 있습니다
    setShowEditForm(false);
  };

  // 이사회승인증빙 클릭 핸들러
  const handleEvidenceClick = (row: any) => {
    setSelectedRow(row);
    setShowEvidenceModal(true);
  };

  // 이사회승인증빙 모달 닫기 핸들러
  const handleCloseEvidenceModal = () => {
    setShowEvidenceModal(false);
    setSelectedRow(null);
  };

  // 컬럼 정의
  const columns: any[] = [
    {
      key: "dutyAssignmentStatus" as keyof DutyData,
      header: "책무배부여부",
      visible: true
    },
    {
      key: "executive" as keyof DutyData,
      header: "임원",
      visible: true
    },
    {
      key: "dutyAssignmentDate" as keyof DutyData,
      header: "책무배분일",
      visible: true
    },
    {
      key: "position" as keyof DutyData,
      header: "직책",
      visible: true,
      separator: true,
      separatorStyle: "dashed",
      separatorWidth: "1px"
    },
    {
      key: "category" as keyof DutyData,
      header: "책무구분",
      visible: true
    },
    {
      key: "code" as keyof DutyData,
      header: "책무코드",
      visible: true
    },
    {
      key: "name" as keyof DutyData,
      header: "책무",
      visible: true
    },
    {
      key: "detailCode" as keyof DutyData,
      header: "책무 세부코드",
      visible: true
    },
    {
      key: "detailContent" as keyof DutyData,
      header: "책무 세부내용",
      visible: true
    },
    {
      key: "riskLevel" as keyof DutyData,
      header: "책무 위험도평가",
      visible: true,
      render: (value: string) => {
        const getRiskColor = (risk: string) => {
          switch (risk) {
            case "고위험":
              return "bg-red-100 text-red-700 border-red-200";
            case "중위험":
              return "bg-orange-100 text-orange-700 border-orange-200";
            case "저위험":
              return "bg-green-100 text-green-700 border-green-200";
            default:
              return "bg-gray-100 text-gray-700 border-gray-200";
          }
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskColor(value)}`}>
            {value}
          </span>
        );
      }
    },
    {
      key: "dutyRegistrationDate" as keyof DutyData,
      header: "책무등록일",
      visible: true
    },
    {
      key: "relatedLaws" as keyof DutyData,
      header: "관련 법령/내규",
      visible: true
    },
    {
      key: "evidence",
      header: "이사회승인증빙",
      visible: true,
      render: (value: any, row: any) => (
        <div className="flex justify-center">
          <button
            onClick={() => handleEvidenceClick(row)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="이사회승인증빙 관리"
          >
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      )
    },
    {
      key: "actions",
      header: "액션",
      visible: true,
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-2">
          <EditIcon 
            className="h-4 w-4 cursor-pointer" 
            onClick={() => handleEdit(row)}
          />
          <DeleteIcon 
            className="h-4 w-4 cursor-pointer" 
            onClick={() => console.log('삭제:', row.id)}
          />
        </div>
      )
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // 필터 설정 정의
  const filters = [
    {
      key: "referenceDate",
      label: "조회기준일자",
      type: "date" as const,
      width: "w-36",
      required: true,
      labelClassName: "text-orange-600 font-medium"
    },
    {
      key: "position",
      label: "직책",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "category",
      label: "책무구분",
      type: "dropdown" as const,
      width: "w-40"
    },
    {
      key: "responsibilityName",
      label: "책무명",
      type: "dropdown" as const,
      width: "w-48"
    }
  ];

  // 필터 옵션들
  const filterOptions = {
    category: [
      { value: "지정책임자", label: "지정책임자" },
      { value: "경영관리", label: "경영관리" },
      { value: "금융", label: "금융" }
    ],
    department: [
      { value: "전체", label: "전체" },
      { value: "ETF투자부문", label: "ETF투자부문" },
      { value: "자산운용부문", label: "자산운용부문" },
      { value: "자산관리부문", label: "자산관리부문" },
      { value: "글로벌투자부문", label: "글로벌투자부문" },
      { value: "준법감시실", label: "준법감시실" },
      { value: "IT부문", label: "IT부문" },
      { value: "인사부문", label: "인사부문" },
      { value: "재무부문", label: "재무부문" },
      { value: "법무부문", label: "법무부문" }
    ],
    responsibilityName: [
      { value: "전체", label: "전체" },
      { value: "경영지원업무와 관련된 책무", label: "경영지원업무와 관련된 책무" },
      { value: "인사관리업무와 관련된 책무", label: "인사관리업무와 관련된 책무" },
      { value: "재무관리업무와 관련된 책무", label: "재무관리업무와 관련된 책무" },
      { value: "정보관리업무와 관련된 책무", label: "정보관리업무와 관련된 책무" },
      { value: "법무관리업무와 관련된 책무", label: "법무관리업무와 관련된 책무" },
      { value: "보안관리업무와 관련된 책무", label: "보안관리업무와 관련된 책무" },
      { value: "품질관리업무와 관련된 책무", label: "품질관리업무와 관련된 책무" },
      { value: "환경관리업무와 관련된 책무", label: "환경관리업무와 관련된 책무" },
      { value: "시설관리업무와 관련된 책무", label: "시설관리업무와 관련된 책무" },
      { value: "구매관리업무와 관련된 책무", label: "구매관리업무와 관련된 책무" },
      { value: "물류관리업무와 관련된 책무", label: "물류관리업무와 관련된 책무" },
      { value: "고객관리업무와 관련된 책무", label: "고객관리업무와 관련된 책무" },
      { value: "마케팅관리업무와 관련된 책무", label: "마케팅관리업무와 관련된 책무" },
      { value: "연구개발관리업무와 관련된 책무", label: "연구개발관리업무와 관련된 책무" },
      { value: "지식관리업무와 관련된 책무", label: "지식관리업무와 관련된 책무" }
    ],
    departmentGroup: [
      { value: "전체", label: "전체" },
      { value: "투자본부", label: "투자본부" },
      { value: "운용본부", label: "운용본부" },
      { value: "관리본부", label: "관리본부" },
      { value: "지원본부", label: "지원본부" },
      { value: "감시본부", label: "감시본부" }
    ]
  };



  // 폼 데이터 변경 핸들러
  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 추가 버튼 클릭 핸들러
  const handleShowAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      setFormData({}); // 폼 초기화
    }
  };

  // 추가 처리 핸들러 (기능 없음)


  // 필터 변경 핸들러
  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`페이지 ${page}로 이동`);
    // 여기에 실제 페이지 변경 로직을 구현할 수 있습니다
  };

  return (
    <div className="relative liquidGlass-page">
      {/* 리퀴드 글래스 배경 효과 */}
      <div className="liquidGlass-bg-effect"></div>
      <div className="liquidGlass-bg-tint"></div>
      <div className="liquidGlass-bg-shine"></div>
      
      <Header 
        rightContent={
          <div className="flex items-center space-x-3">
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`w-full space-y-6 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
        <CommonBreadcrumb />
        <H1 title="책무관리 Master" />
        
        <DataTable
          data={sampleData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          className="w-full"
          // 필터 관련 props
          searchFilters={searchFilters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          filters={filters}
          // 추가 버전 2 사용
          enableAddFormV2={true}
          addFormV2Modal={
            <AddDutyForm
              open={showAddForm}
              onOpenChange={setShowAddForm}
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onAdd={handleAdd}
              isLoading={false}
              disabled={false}
              mode="add"
            />
          }
          onShowAddFormV2={() => setShowAddForm(true)}
          // 기존 추가 폼 비활성화
          enableAddForm={false}
          showAddForm={false}
          onShowAddForm={() => {}}
          formData={{}}
          formFields={[]}
          onFormDataChange={() => {}}
          onAdd={() => {}}
          isAddLoading={false}
          isNameValid={true}
          // 액션 컬럼 비활성화 (별도 actions 컬럼 사용)
          showActionColumn={false}
        />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6 mb-8"
        />
        
        {/* 책무 추가 모달 */}
        <AddDutyForm
          open={showAddForm}
          onOpenChange={setShowAddForm}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onAdd={handleAdd}
          isLoading={false}
          disabled={false}
          mode="add"
        />

        {/* 책무 수정 모달 */}
        <AddDutyForm
          open={showEditForm}
          onOpenChange={setShowEditForm}
          formData={editFormData}
          onFormDataChange={(field: string, value: any) => {
            setEditFormData(prev => ({
              ...prev,
              [field]: value
            }));
          }}
          onAdd={handleEditSubmit}
          isLoading={false}
          disabled={false}
          mode="edit"
        />

        {/* 이사회승인증빙 모달 */}
        {showEvidenceModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  이사회승인증빙 관리
                </h2>
                <button
                  onClick={handleCloseEvidenceModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">선택된 책무 정보</h3>
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">임원:</span> {selectedRow?.executive}</p>
                  <p><span className="font-medium">직책:</span> {selectedRow?.position}</p>
                  <p><span className="font-medium">책무:</span> {selectedRow?.name}</p>
                  <p><span className="font-medium">관련 법령/내규:</span> {selectedRow?.relatedLaws}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* 업로드 섹션 */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        이사회승인증빙 파일 업로드
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PDF, DOC, DOCX 파일만 업로드 가능
                      </span>
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log('업로드할 파일:', file.name);
                          alert(`${file.name} 파일이 업로드되었습니다.`);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* 다운로드 섹션 */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">업로드된 증빙 파일</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white rounded p-3">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">이사회승인서_20240115.pdf</span>
                      </div>
                      <button
                        onClick={() => {
                          console.log('파일 다운로드:', '이사회승인서_20240115.pdf');
                          alert('파일이 다운로드되었습니다.');
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        다운로드
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded p-3">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">회의록_20240115.docx</span>
                      </div>
                      <button
                        onClick={() => {
                          console.log('파일 다운로드:', '회의록_20240115.docx');
                          alert('파일이 다운로드되었습니다.');
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        다운로드
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleCloseEvidenceModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
