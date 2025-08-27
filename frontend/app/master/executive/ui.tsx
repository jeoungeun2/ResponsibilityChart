"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { DataTable } from '@/components/ui/data-table';
import { Edit, Trash2, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { executivesControllerSearch } from '@/generated/openapi-client/sdk.gen';
import { client } from '@/generated/openapi-client/client.gen';

export default function Ui() {
  const { data: session, status } = useSession();
  const enabled = status === "authenticated" && !!session?.accessToken;
  const queryClient = useQueryClient();
  
  // 인증 상태 로깅
  console.log('🔐 인증 상태:', {
    status,
    hasSession: !!session,
    hasAccessToken: !!session?.accessToken,
    enabled
  });
  
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
    termStartDate: '',
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
      console.log('🔍 React Query 실행 중...', searchParams);
      
      try {
        // OpenAPI SDK 사용
        const response = await executivesControllerSearch({
          client,
          query: searchParams
        });
        
        console.log('📡 OpenAPI SDK 응답 받음:', response);
        console.log('📡 응답 타입:', typeof response);
        console.log('📡 응답 키들:', response ? Object.keys(response) : 'no response');
        
        // 응답 구조 상세 분석
        if (response && typeof response === 'object') {
          console.log('🔍 응답 상세 분석:', {
            hasData: 'data' in response,
            hasMeta: 'meta' in response,
            dataType: typeof (response as any).data,
            metaType: typeof (response as any).meta,
            allKeys: Object.keys(response)
          });
        }
        
        return response;
      } catch (error) {
        console.error('❌ API 호출 에러:', error);
        throw error;
      }
    },
    enabled,                               // 인증 준비될 때만
    staleTime: 60_000,             // 1분 내 재렌더시 재요청 방지
    refetchOnWindowFocus: false,   // 포커스마다 재요청 방지
    retry: 1,       
  });

  // React Query 상태 로깅
  console.log('🔍 React Query 상태:', {
    enabled,
    isLoading,
    isError,
    isSuccess,
    hasData: !!searchResult,
    dataType: typeof searchResult,
    error: error?.message
  });

  // 데이터 추출 로직 개선
  const executives = useMemo(() => {
    console.log('🔍 데이터 추출 시작:', { 
      searchResult, 
      type: typeof searchResult,
      keys: searchResult ? Object.keys(searchResult) : 'no keys'
    });

    // OpenAPI SDK 응답 구조 상세 분석
    if (searchResult && typeof searchResult === 'object') {
      console.log('🔍 searchResult 상세 분석:', {
        hasData: 'data' in searchResult,
        hasResponse: 'response' in searchResult,
        dataType: typeof (searchResult as any).data,
        responseType: typeof (searchResult as any).response,
        allKeys: Object.keys(searchResult),
        dataKeys: (searchResult as any).data ? Object.keys((searchResult as any).data) : 'no data',
        responseKeys: (searchResult as any).response ? Object.keys((searchResult as any).response) : 'no response'
      });

      // searchResult.data가 있는 경우 (일반적인 응답)
      if ((searchResult as any).data && Array.isArray((searchResult as any).data)) {
        console.log('✅ searchResult.data 배열 발견:', (searchResult as any).data);
        return (searchResult as any).data;
      }
      
      // searchResult 자체가 배열인 경우
      if (Array.isArray(searchResult)) {
        console.log('✅ searchResult 자체가 배열입니다:', searchResult);
        return searchResult;
      }
      
      // searchResult.response가 있는 경우 (OpenAPI SDK 응답)
      if ((searchResult as any).response) {
        console.log('🔍 OpenAPI SDK 응답 구조:', searchResult);
        console.log('🔍 response 상세:', (searchResult as any).response);
        
        // response에서 데이터 추출 시도
        if ((searchResult as any).data && Array.isArray((searchResult as any).data)) {
          console.log('✅ response.data 배열 발견:', (searchResult as any).data);
          return (searchResult as any).data;
        }
        
        // response 자체가 데이터인 경우
        if (typeof (searchResult as any).response === 'object' && (searchResult as any).response.data) {
          console.log('✅ response.response.data 발견:', (searchResult as any).response.data);
          if (Array.isArray((searchResult as any).response.data)) {
            return (searchResult as any).response.data;
          }
        }
      }
      
      // searchResult.data가 객체인 경우 (배열이 아닌 경우)
      if ((searchResult as any).data && typeof (searchResult as any).data === 'object' && !Array.isArray((searchResult as any).data)) {
        console.log('🔍 data가 객체입니다. 내용:', (searchResult as any).data);
        const data = (searchResult as any).data;
        
        // data 내부에서 배열 찾기
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value)) {
            console.log(`✅ data.${key} 배열 발견:`, value);
            return value;
          }
        }
      }
    }

    console.log('❌ 데이터를 찾을 수 없습니다. searchResult:', searchResult);
    return [];
  }, [searchResult]);

  const meta = useMemo(() => {
    if (searchResult && typeof searchResult === 'object' && (searchResult as any).data?.meta) {
      console.log('✅ meta 발견:', (searchResult as any).data.meta);
      return (searchResult as any).data.meta;
    }
    
    console.log('❌ meta를 찾을 수 없습니다');
    return null;
  }, [searchResult]);

  // 디버깅용 로그
  console.log('📊 데이터 추출 결과:', {
    searchResult,
    executives,
    executivesLength: executives.length,
    meta,
    isArray: Array.isArray((searchResult as any)?.data)
  });

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

  // 페이지네이션 상태 로깅 (간단하게)
  console.log('📊 페이지네이션 상태:', {
    hasMeta: !!meta,
    totalPages: meta?.totalPages,
    currentPage: pagination.page,
    hasNext: pagination.page < pagination.pageCount,
    hasPrev: pagination.page > 1
  });

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

  // 추가 mutation
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
      // This part needs to be implemented using the generated client
      // For now, it's a placeholder.
      console.warn('Create mutation is not yet implemented with the generated client.');
      return Promise.resolve({ success: false, message: 'Create not implemented' });
    },
    onSuccess: () => {
      console.log('Create mutation success, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['executives'] });
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
    },
    onError: (error) => {
      console.error('Create mutation error:', error);
    }
  });

  // 수정 mutation
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
      // This part needs to be implemented using the generated client
      // For now, it's a placeholder.
      console.warn('Update mutation is not yet implemented with the generated client.');
      return Promise.resolve({ success: false, message: 'Update not implemented' });
    },
    onSuccess: () => {
      console.log('Update mutation success, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['executives'] });
      setShowEditForm(false);
      setEditingExecutive(null);
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
    }
  });

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // This part needs to be implemented using the generated client
      // For now, it's a placeholder.
      console.warn('Delete mutation is not yet implemented with the generated client.');
      return Promise.resolve({ success: false, message: 'Delete not implemented' });
    },
    onSuccess: () => {
      console.log('Delete mutation success, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['executives'] });
    },
    onError: (error) => {
      console.error('Delete mutation error:', error);
    }
  });

  const handleAdd = () => {
    if (newExecutive.name) {
      createMutation.mutate(newExecutive);
    }
  };

  const handleEdit = (executive: any) => {
    setEditingExecutive(executive);
    setShowEditForm(true);
  };

  const handleUpdate = () => {
    if (editingExecutive && editingExecutive.name) {
      updateMutation.mutate(editingExecutive);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  // 테이블 데이터 준비 (actions 필드 추가)
  const tableData = useMemo(() => {
    console.log('🔧 테이블 데이터 준비 시작:', { executives, isArray: Array.isArray(executives) });
    
    if (!Array.isArray(executives) || executives.length === 0) {
      console.log('⚠️ 테이블 데이터 없음');
      return [];
    }

    const result = executives.map((executive: any, index: number) => {
      console.log(`📝 임원 ${index + 1} 처리:`, executive.name);
      
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
            >
              <Edit className="h-4 w-4 mr-1" /> 수정
            </button>
            <button 
              onClick={() => handleDelete(executive.id)}
              disabled={deleteMutation.isPending}
              className="text-red-500 hover:text-red-700 disabled:text-gray-400 text-sm transition-colors px-2 py-1 rounded hover:bg-red-50 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" /> 삭제
            </button>
          </div>
        )
      };
    });

    console.log('✅ 테이블 데이터 준비 완료:', { count: result.length });
    return result;
  }, [executives, handleEdit, handleDelete, deleteMutation.isPending]);

  // 액션 컬럼 추가
  const columnsWithActions = [
    ...columns,
    {
      key: "actions",
      header: "액션",
      visible: true
    }
  ];

  // 디버깅용 로그
  console.log('Table data:', tableData);
  console.log('Columns:', columnsWithActions);

  // 로딩 상태 표시 제거 - 테이블 내부에서 처리
  
  // 에러 상태 표시
  if (error || isError) {
    console.log('❌ 에러 상태 표시:', error);
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
  if (!isLoading && (!searchResult || !Array.isArray(executives) || executives.length === 0)) {
    console.log('📋 데이터 없음 상태 표시:', { searchResult, executives });
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <p className="text-gray-600 text-lg mb-2">표시할 데이터가 없습니다</p>
          <p className="text-gray-500 text-sm">검색 조건을 변경해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 검색 및 필터링 섹션 */}
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
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 평가상태 필터 */}
          <div>
            <select
              value={searchFilters.evaluationStatus}
              onChange={(e) => handleFilterChange('evaluationStatus', e.target.value)}
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
              onChange={(e) => handleSortChange(e.target.value as 'name' | 'createdAt')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt">생성일순</option>
              <option value="name">이름순</option>
            </select>
          </div>

          {/* 정렬 순서 */}
          <div>
            <button
              onClick={() => handleFilterChange('order', searchFilters.order === 'asc' ? 'desc' : 'asc')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              {searchFilters.order === 'asc' ? '오름차순' : '내림차순'}
            </button>
          </div>
        </div>
      </div>

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
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showAddForm ? '취소' : '추가'}
          </button>
        </div>
      </div>

      {/* 추가 폼 */}
      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">새 임원 추가</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="이름 *"
              value={newExecutive.name}
              onChange={(e) => setNewExecutive({ ...newExecutive, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="사번"
              value={newExecutive.employeeNo}
              onChange={(e) => setNewExecutive({ ...newExecutive, employeeNo: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="직위"
              value={newExecutive.positionLabel}
              onChange={(e) => setNewExecutive({ ...newExecutive, positionLabel: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="직책"
              value={newExecutive.titleLabel}
              onChange={(e) => setNewExecutive({ ...newExecutive, titleLabel: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="연락처"
              value={newExecutive.phone}
              onChange={(e) => setNewExecutive({ ...newExecutive, phone: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="이메일"
              value={newExecutive.email}
              onChange={(e) => setNewExecutive({ ...newExecutive, email: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder="재임시작일"
              value={newExecutive.termStartDate}
              onChange={(e) => setNewExecutive({ ...newExecutive, termStartDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder="재임종료일"
              value={newExecutive.termEndDate}
              onChange={(e) => setNewExecutive({ ...newExecutive, termEndDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={createMutation.isPending}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {createMutation.isPending ? '추가 중...' : '추가'}
          </button>
        </div>
      )}

      {/* 수정 폼 */}
      {showEditForm && editingExecutive && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">임원 정보 수정</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="이름 *"
              value={editingExecutive.name}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="사번"
              value={editingExecutive.employeeNo || ''}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, employeeNo: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="직위"
              value={editingExecutive.positionLabel || ''}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, positionLabel: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="직책"
              value={editingExecutive.titleLabel || ''}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, titleLabel: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="연락처"
              value={editingExecutive.phone || ''}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, phone: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="이메일"
              value={editingExecutive.email || ''}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, email: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder="재임시작일"
              value={editingExecutive.termStartDate || ''}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, termStartDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder="재임종료일"
              value={editingExecutive.termEndDate || ''}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, termEndDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              disabled={updateMutation.isPending}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {updateMutation.isPending ? '수정 중...' : '수정'}
            </button>
            <button
              onClick={() => {
                setShowEditForm(false);
                setEditingExecutive(null);
              }}
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
        columns={columnsWithActions}
        searchPlaceholder="임원 검색..."
        className="w-full"
        onColumnsChange={handleColumnsChange}
        isLoading={isLoading}
      />
      
      {/* 로딩 중일 때 테이블 하단에 로딩 표시 */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">데이터를 불러오는 중...</p>
        </div>
      )}

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