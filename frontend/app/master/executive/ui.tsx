"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import EditIcon from '@/components/ui/edit-icon';
import DeleteIcon from '@/components/ui/delete-icon';
import ExecutiveDetailModal from '@/components/ExecutiveDetailModal';


import { useRouter } from 'next/navigation';
import { 
  executivesControllerSearch, 
  executivesControllerCreate, 
  executivesControllerUpdate, 
  executivesControllerRemove,
  executivesControllerFindAll
} from '@/generated/openapi-client/sdk.gen';
import { client } from '@/generated/openapi-client/client.gen';

export default function Ui() {
  const { data: session, status } = useSession();
  const enabled = status === "authenticated" && !!session?.accessToken;
  const queryClient = useQueryClient();
  const router = useRouter();
  

  
  // 상태 관리
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingExecutive, setEditingExecutive] = useState<any>(null);
  const [newExecutive, setNewExecutive] = useState({ 
    name: '', 
    employeeNo: '',
    positionLabel: '', 
    titleLabel: '',
    phone: '',
    email: '',
    termStartDate: new Date().toISOString().split('T')[0], // 오늘 날짜를 기본값으로
    termEndDate: ''
  });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExecutive, setSelectedExecutive] = useState<any>(null);

  // 검색 필터 상태
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({
    name: '',
    evaluationStatus: ''
  });

  // 이름 리스트 상태 (전체 이름 목록)
  const [nameList, setNameList] = useState<Array<{ value: string; label: string }>>([]);

  // 필터 설정 정의
  const filters = [
    {
      key: 'name',
      label: '이름',
      type: 'dropdown' as const,
      placeholder: '모든 이름',
      width: 'w-40'
    },
    {
      key: 'evaluationStatus',
      label: '평가상태',
      type: 'dropdown' as const,
      placeholder: '모든 상태',
      width: 'w-32'
    }
  ];

  // 필터 옵션들 정의 (새로운 구조)
  const filterOptions = {
    name: nameList,
    evaluationStatus: [
      { value: 'NOT_STARTED', label: '미시작' },
      { value: 'STARTED', label: '시작' },
      { value: 'IN_PROGRESS', label: '진행중' }
    ]
  };



  // 폼 필드 정의
  const formFields = [
    { key: 'name', label: '이름', type: 'text' as const, placeholder: '이름을 입력하세요', required: true },
    { key: 'employeeNo', label: '사번', type: 'text' as const, placeholder: '사번을 입력하세요' },
    { key: 'positionLabel', label: '직위', type: 'text' as const, placeholder: '직위를 입력하세요' },
    { key: 'titleLabel', label: '직책', type: 'text' as const, placeholder: '직책을 입력하세요' },
    { key: 'phone', label: '연락처', type: 'tel' as const, placeholder: '연락처를 입력하세요' },
    { key: 'email', label: '이메일', type: 'email' as const, placeholder: '이메일을 입력하세요' },
    { key: 'termStartDate', label: '재임시작일', type: 'date' as const },
    { key: 'termEndDate', label: '재임종료일', type: 'date' as const }
  ];

  // 페이지네이션 상태
  const [pagination, setPagination] = useState({
    page: 1,
    take: 15,
    total: 0,
    pageCount: 0
  });

  // 검색 파라미터 구성
  const searchParams: any = {
    page: pagination.page,
    take: pagination.take,
    name: searchFilters.name || undefined,
    evaluationStatus: searchFilters.evaluationStatus || undefined
  };

  // 컬럼 정의 (확장)
  const columns = [
    {
      key: "name" as keyof any,
      header: "이름",
      visible: true,
      render: (value: any, row: any) => (
        <button 
          onClick={() => handleViewDetail(row)}
          className="text-blue-600 hover:text-blue-800 text-base transition-colors underline cursor-pointer"
          title="상세보기"
        >
          {value}
        </button>
      )
    },
    {
      key: "employeeNo" as keyof any,
      header: "사번",
      visible: true
    },
    {
      key: "positionLabel" as keyof any,
      header: "직위",
      visible: true
    },
    {
      key: "titleLabel" as keyof any,
      header: "직책",
      visible: true
    },
    {
      key: "phone" as keyof any,
      header: "연락처",
      visible: true
    },
    {
      key: "email" as keyof any,
      header: "이메일",
      visible: true
    },
    {
      key: "termStartDate" as keyof any,
      header: "재임시작일",
      visible: false
    },
    {
      key: "termEndDate" as keyof any,
      header: "재임종료일",
      visible: false
    },
    {
      key: "orgReg.managingOrg" as keyof any,
      header: "관리조직",
      visible: false
    },
    {
      key: "orgReg.division" as keyof any,
      header: "소관부서",
      visible: false
    },
    {
      key: "evaluationStatus" as keyof any,
      header: "평가상태",
      visible: true,
      render: (value: any, row: any) => {
        const status = value || 'NOT_STARTED';
        const statusLabels: Record<string, string> = {
          'NOT_STARTED': '미시작',
          'STARTED': '시작',
          'IN_PROGRESS': '진행중'
        };
        const statusColors: Record<string, string> = {
          'NOT_STARTED': 'bg-gray-100 text-gray-800',
          'STARTED': 'bg-blue-100 text-blue-800',
          'IN_PROGRESS': 'bg-yellow-100 text-yellow-800'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
            {statusLabels[status] || status}
          </span>
        );
      }
    }
  ];

  // 상세보기 핸들러
  const handleViewDetail = (executive: any) => {
    setSelectedExecutive(executive);
    setShowDetailModal(true);
  };

  // 상세보기 열 추가
  const columnsWithDetail = [
    ...columns,
    {
      key: "detail",
      header: "상세보기",
      visible: true,
      render: (value: any, row: any) => (
        <button 
          onClick={() => handleViewDetail(row)}
          className="text-gray-700 hover:text-gray-800 text-base transition-colors px-2 py-1 rounded hover:bg-gray-50 underline"
          style={{ cursor: 'pointer' }}
          title="상세보기"
        >
          Link
        </button>
      )
    }
  ];

  const [tableColumns, setTableColumns] = useState(columnsWithDetail);

  // 컬럼 변경 핸들러
  const handleColumnsChange = (newColumns: any[]) => {
    setTableColumns(newColumns);
  };

  // React Query로 데이터 가져오기 (검색 및 페이지네이션 지원)
  const { data: searchResult, isLoading, error, isError, isSuccess } = useQuery({
    queryKey: ['executives', 'search', searchParams],
    queryFn: async () => {
      try {
        // OpenAPI SDK 사용
        const response = await executivesControllerSearch({
          client,
          query: searchParams
        });
        
        return response;
      } catch (error) {
        throw error;
      }
    },
    enabled,                               // 인증 준비될 때만
    staleTime: 60_000,             // 1분 내 재렌더시 재요청 방지
    refetchOnWindowFocus: false,   // 포커스마다 재요청 방지
    retry: 1,       
  });

  // 전체 이름 목록을 가져오는 쿼리 (드롭다운용)
  const { data: allNamesResult, isLoading: isLoadingNames, error: namesError } = useQuery({
    queryKey: ['executives', 'all-names'],
    queryFn: async () => {
      try {

        
        // findAll을 사용해서 모든 임원 데이터 가져오기
        const response = await executivesControllerFindAll({
          client
        });
        

        return response;
      } catch (error) {

        return null;
      }
    },
    enabled,                               // 인증 준비될 때만
    staleTime: 300_000,            // 5분 내 재렌더시 재요청 방지 (이름 목록은 자주 변경되지 않음)
    refetchOnWindowFocus: false,   // 포커스마다 재요청 방지
    retry: 1,
  });







  // 데이터 추출 로직
  const executives = useMemo(() => {
    // OpenAPI SDK 응답 구조 분석
    if (searchResult && typeof searchResult === 'object') {
      // searchResult.data가 있는 경우 (일반적인 응답)
      if ((searchResult as any).data && Array.isArray((searchResult as any).data)) {
        return (searchResult as any).data;
      }
      
      // searchResult 자체가 배열인 경우
      if (Array.isArray(searchResult)) {
        return searchResult;
      }
      
      // searchResult.response가 있는 경우 (OpenAPI SDK 응답)
      if ((searchResult as any).response) {
        // response에서 데이터 추출 시도
        if ((searchResult as any).data && Array.isArray((searchResult as any).data)) {
          return (searchResult as any).data;
        }
        
        // response 자체가 데이터인 경우
        if (typeof (searchResult as any).response === 'object' && (searchResult as any).response.data) {
          if (Array.isArray((searchResult as any).response.data)) {
            return (searchResult as any).response.data;
          }
        }
      }
      
      // searchResult.data가 객체인 경우 (배열이 아닌 경우)
      if ((searchResult as any).data && typeof (searchResult as any).data === 'object' && !Array.isArray((searchResult as any).data)) {
        const data = (searchResult as any).data;
        
        // data 내부에서 배열 찾기
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value)) {
            return value;
          }
        }
      }
    }

    return [];
  }, [searchResult]);



  const meta = useMemo(() => {
    if (searchResult && typeof searchResult === 'object' && (searchResult as any).data?.meta) {
      return (searchResult as any).data.meta;
    }
    
    return null;
  }, [searchResult]);





  // 페이지네이션 상태 업데이트
  useEffect(() => {
    if (searchResult && typeof searchResult === 'object' && (searchResult as any).data?.meta) {
      const meta = (searchResult as any).data.meta;
      setPagination(prev => ({
        ...prev,
        total: meta.total || 0,
        pageCount: meta.totalPages || 0
      }));
    }
  }, [searchResult]);

  // 전체 이름 목록에서 이름 리스트 생성
  useEffect(() => {

    
    if (allNamesResult && typeof allNamesResult === 'object') {
      let allNamesData: any[] = [];
      
      // allNamesResult에서 데이터 추출 (searchResult와 동일한 로직)
      if ((allNamesResult as any).data && Array.isArray((allNamesResult as any).data)) {
        allNamesData = (allNamesResult as any).data;

      } else if (Array.isArray(allNamesResult)) {
        allNamesData = allNamesResult;

      } else if ((allNamesResult as any).response) {
        if ((allNamesResult as any).data && Array.isArray((allNamesResult as any).data)) {
          allNamesData = (allNamesResult as any).data;
  
        } else if (typeof (allNamesResult as any).response === 'object' && (allNamesResult as any).response.data) {
          if (Array.isArray((allNamesResult as any).response.data)) {
            allNamesData = (allNamesResult as any).response.data;
    
          }
        }
      }



      // 이름 리스트 생성 (중복 제거)
      if (allNamesData.length > 0) {
        const uniqueNames = Array.from(
          new Set(
            allNamesData
              .map((exec: any) => exec.name)
              .filter((name: string) => name && name.trim())
          )
        ).map(name => ({
          value: name,
          label: name
        }));
        

        setNameList(uniqueNames);
      } else {

      }
    } else {
      console.log('allNamesResult가 없거나 객체가 아님');
    }
  }, [allNamesResult]);



  // 폼 데이터 변경 핸들러
  const handleFormDataChange = (field: string, value: string) => {
    setNewExecutive(prev => ({ ...prev, [field]: value }));
  };

  // 검색 필터 변경 핸들러
  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // 필터 변경시 첫 페이지로
  };



  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // 추가 mutation - 실제 API 호출 구현
  const createMutation = useMutation({
    mutationFn: async (data: { 
      name: string; 
      employeeNo?: string;
      positionLabel?: string; 
      titleLabel?: string;
      phone?: string;
      email?: string;
      termStartDate?: string;
      termEndDate?: string;
    }) => {
      try {
        // 필수 필드 검증
        if (!data.name || !data.name.trim()) {
          throw new Error('이름은 필수 입력 항목입니다.');
        }

        // API 호출을 위한 데이터 준비
        const createData = {
          name: data.name.trim(),
          employeeNo: data.employeeNo?.trim() || '',
          positionLabel: data.positionLabel?.trim() || '',
          titleLabel: data.titleLabel?.trim() || '',
          phone: data.phone?.trim() || '',
          email: data.email?.trim() || '',
          termStartDate: data.termStartDate || new Date().toISOString().split('T')[0],
          termEndDate: data.termEndDate?.trim() || undefined
        } as any; // 타입 에러 해결을 위한 타입 단언

        const response = await executivesControllerCreate({
          client,
          body: createData
        });
        
        // HTTP 응답 상태 확인
        if (response && typeof response === 'object' && 'response' in response) {
          const httpResponse = (response as any).response;
          
          if (httpResponse && httpResponse.status >= 400) {
            throw new Error(`HTTP ${httpResponse.status}: ${httpResponse.statusText || 'Bad Request'}`);
          }
        }

        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['executives'] });
      setShowAddForm(false);
      setNewExecutive({ 
        name: '', 
        employeeNo: '',
        positionLabel: '', 
        titleLabel: '',
        phone: '',
        email: '',
        termStartDate: new Date().toISOString().split('T')[0],
        termEndDate: ''
      });
      
      // 성공 메시지 표시
      alert('임원이 성공적으로 추가되었습니다.');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || '임원 추가 중 오류가 발생했습니다.';
      alert(`오류: ${errorMessage}`);
    }
  });

  // 수정 mutation - 실제 API 호출 구현
  const updateMutation = useMutation({
    mutationFn: async (data: { 
      id: string; 
      name: string; 
      employeeNo?: string;
      positionLabel?: string; 
      titleLabel?: string;
      phone?: string;
      email?: string;
      termStartDate?: string;
      termEndDate?: string;
    }) => {
      try {
        // 필수 필드 검증
        if (!data.name) {
          throw new Error('이름은 필수 입력 항목입니다.');
        }

        // API 호출을 위한 데이터 준비
        const updateData = {
          name: data.name,
          employeeNo: data.employeeNo || undefined,
          positionLabel: data.positionLabel || undefined,
          titleLabel: data.titleLabel || undefined,
          phone: data.phone || undefined,
          email: data.email || undefined,
          termStartDate: data.termStartDate || undefined,
          termEndDate: data.termEndDate || undefined
        };

        const response = await executivesControllerUpdate({
          client,
          path: { id: data.id },
          body: updateData
        });

        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['executives'] });
      setShowEditForm(false);
      setEditingExecutive(null);
      
      // 성공 메시지 표시
      alert('임원 정보가 성공적으로 수정되었습니다.');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || '임원 수정 중 오류가 발생했습니다.';
      alert(`오류: ${errorMessage}`);
    }
  });

  // 삭제 mutation - 실제 API 호출 구현
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await executivesControllerRemove({
          client,
          path: { id }
        });

        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['executives'] });
      
      // 성공 메시지 표시
      alert('임원이 성공적으로 삭제되었습니다.');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || '임원 삭제 중 오류가 발생했습니다.';
      alert(`오류: ${errorMessage}`);
    }
  });

  // 선택 삭제 핸들러
  const handleBulkDelete = async (selectedIds: string[]) => {
    if (selectedIds.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }

    const confirmMessage = `선택된 ${selectedIds.length}명의 임원을 삭제하시겠습니까?`;
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      // 선택된 모든 ID에 대해 삭제 API 호출
      const deletePromises = selectedIds.map(id => 
        executivesControllerRemove({
          client,
          path: { id }
        })
      );

      await Promise.all(deletePromises);
      
      // 성공 시 쿼리 무효화 및 메시지 표시
      queryClient.invalidateQueries({ queryKey: ['executives'] });
      alert(`${selectedIds.length}명의 임원이 성공적으로 삭제되었습니다.`);
      
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || '선택 삭제 중 오류가 발생했습니다.';
      alert(`오류: ${errorMessage}`);
    }
  };

  // 선택 상태 초기화 핸들러
  const handleSelectionReset = () => {
    // 선택 상태 초기화 로직이 필요하면 여기에 추가
    console.log('선택 상태가 초기화되었습니다.');
  };

  // 추가 폼 열기/닫기 핸들러
  const handleShowAddForm = () => {
    if (showAddForm) {
      // 폼 닫기
      setShowAddForm(false);
      setNewExecutive({ 
        name: '', 
        employeeNo: '',
        positionLabel: '', 
        titleLabel: '',
        phone: '',
        email: '',
        termStartDate: '',
        termEndDate: ''
      });
    } else {
      // 폼 열기 - 기본값 설정
      const defaultDate = new Date().toISOString().split('T')[0];
      const newState = { 
        name: '', 
        employeeNo: '',
        positionLabel: '', 
        titleLabel: '',
        phone: '',
        email: '',
        termStartDate: defaultDate,
        termEndDate: ''
      };
      setShowAddForm(true);
      setNewExecutive(newState);
    }
  };

  // 수정 폼 열기/닫기 핸들러
  const handleShowEditForm = (executive: any) => {
    setEditingExecutive(executive);
    setShowEditForm(true);
  };

  // 수정 폼 닫기 핸들러
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setEditingExecutive(null);
  };

  // 상세 모달 닫기 핸들러
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedExecutive(null);
  };

  const handleAdd = () => {
    if (!newExecutive.name || !newExecutive.name.trim()) {
      alert('이름은 필수 입력 항목입니다.');
      return;
    }
    
    createMutation.mutate(newExecutive);
  };

  const handleEdit = (executive: any) => {
    handleShowEditForm(executive);
  };

  const handleUpdate = () => {
    if (editingExecutive && editingExecutive.name) {
      updateMutation.mutate(editingExecutive);
    } else {
      alert('이름은 필수 입력 항목입니다.');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  // 테이블 데이터 준비 (actions 필드 추가)
  const tableData = useMemo(() => {
    if (!Array.isArray(executives) || executives.length === 0) {
      return [];
    }

    const result = executives.map((executive: any) => {
      // 평가상태 데이터 준비
      const evaluationStatus = executive.evaluation?.status || 'NOT_STARTED';
      
      return {
        ...executive,
        evaluationStatus, // 평가상태 필드 추가
        actions: (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleEdit(executive)}
              className="text-navy-600 hover:text-navy-800 text-sm transition-colors px-2 py-1 rounded hover:bg-navy-50 flex items-center cursor-pointer"
              title="수정"
            >
              <EditIcon className="h-4 w-4" />
            </button>
            <button 
              onClick={() => handleDelete(executive.id)}
              disabled={deleteMutation.isPending}
              className="text-red-500 hover:text-red-700 disabled:text-gray-400 text-sm transition-colors px-2 py-1 rounded hover:bg-red-50 flex items-center cursor-pointer"
              title="삭제"
            >
              <DeleteIcon className="h-4 w-4" />
            </button>
          </div>
        )
      };
    });

    return result;
  }, [executives, handleEdit, handleDelete, deleteMutation.isPending]);


  
  // 에러 상태 표시
  if (error || isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg mb-2">데이터 로드 중 오류가 발생했습니다</p>
          <p className="text-gray-600 text-sm">{error?.message || '알 수 없는 오류'}</p>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때는 DataTable 컴포넌트 내에서 처리하도록 함

  return (
    <div className="space-y-6">






      {/* 수정 폼 */}
      {showEditForm && editingExecutive && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">임원 정보 수정</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={editingExecutive.name}
                onChange={(e) => setEditingExecutive({ ...editingExecutive, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
              <input
                type="text"
                placeholder="사번을 입력하세요"
                value={editingExecutive.employeeNo || ''}
                onChange={(e) => setEditingExecutive({ ...editingExecutive, employeeNo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
              <input
                type="text"
                placeholder="직위를 입력하세요"
                value={editingExecutive.positionLabel || ''}
                onChange={(e) => setEditingExecutive({ ...editingExecutive, positionLabel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
              <input
                type="text"
                placeholder="직책을 입력하세요"
                value={editingExecutive.titleLabel || ''}
                onChange={(e) => setEditingExecutive({ ...editingExecutive, titleLabel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="tel"
                placeholder="연락처를 입력하세요"
                value={editingExecutive.phone || ''}
                onChange={(e) => setEditingExecutive({ ...editingExecutive, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                value={editingExecutive.email || ''}
                onChange={(e) => setEditingExecutive({ ...editingExecutive, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">재임시작일</label>
              <input
                type="date"
                value={editingExecutive.termStartDate || ''}
                onChange={(e) => setEditingExecutive({ ...editingExecutive, termStartDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">재임종료일</label>
              <input
                type="date"
                value={editingExecutive.termEndDate || ''}
                onChange={(e) => setEditingExecutive({ ...editingExecutive, termEndDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-2 ">
            <button
              onClick={handleUpdate}
              disabled={updateMutation.isPending || !editingExecutive.name.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center "
               
            >
              {updateMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  수정 중...
                </>
              ) : (
                
                '수정'
              )}
            </button>
            <button
              onClick={handleCloseEditForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">데이터 로딩 실패</div>
        </div>
      )}
      
      {/* DataTable 사용 */}
      <DataTable
        data={tableData}
        columns={tableColumns}
        className="w-full"
        onColumnsChange={handleColumnsChange}
        isLoading={isLoading}
        searchFilters={searchFilters}
        onFilterChange={handleFilterChange}
        filters={filters}
        filterOptions={filterOptions}
        onBulkDelete={handleBulkDelete}
        onSelectionReset={handleSelectionReset}
        enableBulkDelete={true}
        enableRowSelection={true}
        enableAddForm={true}
        showAddForm={showAddForm}
        onShowAddForm={handleShowAddForm}
        formData={newExecutive}
        formFields={formFields}
        onFormDataChange={handleFormDataChange}
        onAdd={handleAdd}
        isAddLoading={createMutation.isPending}
        isNameValid={newExecutive.name.trim().length > 0}
        showActionColumn={true}
      />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pageCount}
        onPageChange={handlePageChange}
      />

      {/* 임원 상세 정보 모달 */}
      <ExecutiveDetailModal
        executive={selectedExecutive}
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
}