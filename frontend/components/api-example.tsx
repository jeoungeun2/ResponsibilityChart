'use client';

import { useState } from 'react';
import { client } from '@/generated/openapi-client/client.gen';

export default function ApiExample() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET 요청 예시
  const handleGetData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 클라이언트는 자동으로 /api/backend를 baseUrl로 사용
      // 실제로는 /api/backend/users/me 같은 형태로 요청됨
      const response = await client.users.getMe();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // POST 요청 예시
  const handleCreateData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newData = {
        name: 'Test User',
        email: 'test@example.com',
      };
      
      // POST 요청도 자동으로 /api/backend를 통해 처리됨
      const response = await client.users.createUser({
        body: newData,
      });
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // PUT 요청 예시
  const handleUpdateData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const updateData = {
        name: 'Updated User',
        email: 'updated@example.com',
      };
      
      const response = await client.users.updateUser({
        params: { id: '123' },
        body: updateData,
      });
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // DELETE 요청 예시
  const handleDeleteData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await client.users.deleteUser({
        params: { id: '123' },
      });
      setData({ message: 'User deleted successfully' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API 호출 예시</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleGetData}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          GET 데이터
        </button>
        
        <button
          onClick={handleCreateData}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          POST 데이터
        </button>
        
        <button
          onClick={handleUpdateData}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          PUT 데이터
        </button>
        
        <button
          onClick={handleDeleteData}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          DELETE 데이터
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">요청 중...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>에러:</strong> {error}
        </div>
      )}

      {data && (
        <div className="bg-gray-100 border border-gray-300 rounded p-4">
          <h3 className="font-semibold mb-2">응답 데이터:</h3>
          <pre className="bg-white p-3 rounded text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">구현된 기능:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• 클라이언트는 `/api/backend`를 baseUrl로 사용</li>
          <li>• 인증 토큰은 서버 사이드에서 자동으로 처리</li>
          <li>• httpOnly 쿠키 문제 해결</li>
          <li>• 보안상 안전한 토큰 처리</li>
          <li>• 모든 HTTP 메서드 지원 (GET, POST, PUT, PATCH, DELETE)</li>
        </ul>
      </div>
    </div>
  );
}
