"use client"

import { executivesApi } from "@/lib/api/executives";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { DataTable } from '@/components/ui/data-table';
import { Edit, Trash2 } from 'lucide-react';

// 임원 데이터 타입 정의
interface ExecutiveData {
  id: string;
  name: string;
  positionLabel: string;
}

export default function Ui() {
  const { data: session, status } = useSession();
  const enabled = status === "authenticated" && !!session?.accessToken;
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingExecutive, setEditingExecutive] = useState<any>(null);
  const [newExecutive, setNewExecutive] = useState({ name: '', positionLabel: '' });

  // 컬럼 정의
  const columns = [
    {
      key: "name" as keyof ExecutiveData,
      header: "이름",
      visible: true
    },
    {
      key: "positionLabel" as keyof ExecutiveData,
      header: "직위",
      visible: true
    },
    {
      key: "id" as keyof ExecutiveData,
      header: "ID",
      visible: true
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // 컬럼 변경 핸들러
  const handleColumnsChange = (newColumns: any[]) => {
    setTableColumns(newColumns);
  };

  // React Query로 데이터 가져오기
  const { data: executives = [], isLoading, error } = useQuery({
    queryKey: ['executives'],
    queryFn: async () => {
      const res = await executivesApi.findAll();
      return Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
    },
    enabled,                               // 인증 준비될 때만
    staleTime: 60_000,             // 1분 내 재렌더시 재요청 방지
    refetchOnWindowFocus: false,   // 포커스마다 재요청 방지
    retry: 1,       
  });

  // 추가 mutation
  const createMutation = useMutation({
    mutationFn: async (data: { name: string; positionLabel: string }) => {
      const result = await executivesApi.create({ 
        body: data 
      });
      console.log('Create mutation result:', result);
      return result;
    },
    onSuccess: () => {
      console.log('Create mutation success, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['executives'] });
      setShowAddForm(false);
      setNewExecutive({ name: '', positionLabel: '' });
    },
    onError: (error) => {
      console.error('Create mutation error:', error);
    }
  });

  // 수정 mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; name: string; positionLabel: string }) => {
      const result = await executivesApi.update({ 
        path: { id: data.id },
        body: { name: data.name, positionLabel: data.positionLabel }
      });
      console.log('Update mutation result:', result);
      return result;
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
      const result = await executivesApi.remove({ 
        path: { id } 
      });
      console.log('Delete mutation result:', result);
      return result;
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
    if (newExecutive.name && newExecutive.positionLabel) {
      createMutation.mutate(newExecutive);
    }
  };

  const handleEdit = (executive: any) => {
    setEditingExecutive(executive);
    setShowEditForm(true);
  };

  const handleUpdate = () => {
    if (editingExecutive && editingExecutive.name && editingExecutive.positionLabel) {
      updateMutation.mutate(editingExecutive);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  // 테이블 데이터 준비 (actions 필드 추가)
  const tableData = executives.map((executive: any) => ({
    ...executive,
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
  }));

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
       
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            총 {executives.length}명의 임원
          </span>
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
              placeholder="이름"
              value={newExecutive.name}
              onChange={(e) => setNewExecutive({ ...newExecutive, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="직위"
              value={newExecutive.positionLabel}
              onChange={(e) => setNewExecutive({ ...newExecutive, positionLabel: e.target.value })}
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
              placeholder="이름"
              value={editingExecutive.name}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="직위"
              value={editingExecutive.positionLabel}
              onChange={(e) => setEditingExecutive({ ...editingExecutive, positionLabel: e.target.value })}
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
        data={tableData}
        columns={columnsWithActions}
        searchPlaceholder="임원 검색..."
        className="w-full"
        onColumnsChange={handleColumnsChange}
        isLoading={isLoading}
      />
    </div>
  );
}