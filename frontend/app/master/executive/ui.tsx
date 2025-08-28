"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { DataTable } from '@/components/ui/data-table';
import { Edit, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

import AddFormDialog from './_components/AddFormDialog';
import { useRouter } from 'next/navigation';
import { 
  executivesControllerSearch, 
  executivesControllerCreate, 
  executivesControllerUpdate, 
  executivesControllerRemove 
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

  // 검색 필터 상태
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    evaluationStatus: '' as 'NOT_STARTED' | 'STARTED' | 'IN_PROGRESS' | '',
    sortBy: 'createdAt' as 'name' | 'positionLabel' | 'email' | 'createdAt',
    order: 'desc' as 'asc' | 'desc'
  });

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
    keyword: searchFilters.keyword || undefined,
    evaluationStatus: searchFilters.evaluationStatus || undefined,
    sortBy: searchFilters.sortBy,
    order: searchFilters.order
  };

  // 컬럼 정의 (확장)
  const columns = [
    {
      key: "name" as keyof any,
      header: "이름",
      visible: true
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

  const [tableColumns, setTableColumns] = useState(columns);

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



  // 폼 데이터 변경 핸들러
  const handleFormDataChange = (field: string, value: string) => {
    setNewExecutive(prev => ({ ...prev, [field]: value }));
  };

  // 검색 필터 변경 핸들러
  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // 필터 변경시 첫 페이지로
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortBy: 'name' | 'createdAt') => {
    setSearchFilters(prev => ({
      ...prev,
      sortBy,
      order: prev.sortBy === sortBy && prev.order === 'asc' ? 'desc' : 'asc'
    }));
    setPagination(prev => ({ ...prev, page: 1 })); // 정렬 변경시 첫 페이지로
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

  // ui.tsx에서
const handleViewDetail = (executive: any) => {
  // 실제 ID를 URL 경로에, 이름과 사번을 쿼리 파라미터로 전달
  router.push(`/master/executive/detail/${executive.id}?name=${encodeURIComponent(executive.name)}&employeeNo=${encodeURIComponent(executive.employeeNo || '')}`);
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
              className="text-blue-500 hover:text-blue-700 text-sm transition-colors px-2 py-1 rounded hover:bg-blue-50 flex items-center"
              title="수정"
            >
              <Edit className="h-4 w-4 mr-1" /> 수정
            </button>
            <button 
              onClick={() => handleDelete(executive.id)}
              disabled={deleteMutation.isPending}
              className="text-red-500 hover:text-red-700 disabled:text-gray-400 text-sm transition-colors px-2 py-1 rounded hover:bg-red-50 flex items-center"
              title="삭제"
            >
              <Trash2 className="h-4 w-4 mr-1" /> 삭제
            </button>
          </div>
        )
      };
    });

    return result;
  }, [executives, handleEdit, handleDelete, deleteMutation.isPending]);

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
          className="text-green-500 hover:text-green-700 text-sm transition-colors px-2 py-1 rounded hover:bg-green-50 flex items-center"
          title="상세보기"
        >
          <Eye className="h-4 w-4 mr-1" /> 상세보기
        </button>
      )
    },
    {
      key: "actions",
      header: "액션",
      visible: true
    }
  ];



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

  // 데이터가 없을 때 표시 (로딩이 완료된 후에만)
  if (!isLoading && !isError && (!searchResult || !Array.isArray(executives) || executives.length === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <p className="text-red-600 text-lg mb-2">표시할 데이터가 없습니다</p>
          <p className="text-gray-500 text-sm">검색 조건을 변경해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">


      {/* 상단 정보 및 추가 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            총 {meta?.total || 0}명의 임원
          </span>
          <span className="text-sm text-gray-500">
            (페이지 {pagination.page} / {pagination.pageCount})
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShowAddForm}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showAddForm ? '취소' : '추가'}
          </button>
        </div>
      </div>

      {/* 추가 폼 다이얼로그 */}
      <AddFormDialog
        formData={newExecutive}
        onFormDataChange={handleFormDataChange}
        onAdd={handleAdd}
        isLoading={createMutation.isPending}
        isNameValid={newExecutive.name.trim().length > 0}
        open={showAddForm}
        onOpenChange={setShowAddForm}
      />

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
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              disabled={updateMutation.isPending || !editingExecutive.name.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
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
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
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
        data={isLoading ? [] : tableData}
        columns={columnsWithDetail}
        className="w-full"
        onColumnsChange={handleColumnsChange}
        isLoading={isLoading}
        searchFilters={searchFilters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {/* 페이지네이션 */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">페이지당 15행</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <span className="text-sm text-gray-600">
              {pagination.page} / {pagination.pageCount}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pageCount}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            총 {meta.total}개 항목
          </div>
        </div>
      )}
    </div>
  );
}