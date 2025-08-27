'use client';

import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>로딩 중...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '10px 0' }}>
        <h3>🔒 로그인 필요</h3>
        <p>현재 로그인되지 않았습니다.</p>
        <button 
          onClick={() => signIn()}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#e8f5e8', margin: '10px 0', border: '1px solid #28a745' }}>
      <h3>✅ 로그인됨</h3>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>사용자:</strong> {session?.user?.name || '이름 없음'}</p>
        <p><strong>이메일:</strong> {session?.user?.email || '이메일 없음'}</p>
        <p><strong>사용자 ID:</strong> {session?.user?.id || 'ID 없음'}</p>
        <p><strong>Access Token:</strong> {session?.accessToken ? '있음' : '없음'}</p>
        {session?.accessToken && (
          <p><strong>토큰 길이:</strong> {session.accessToken.length}자</p>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => signOut()}
          style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          로그아웃
        </button>
        
        <button 
          onClick={async () => {
            try {
              const response = await fetch('/api/backend/test');
              const data = await response.json();
              console.log('테스트 API 응답:', data);
              alert('테스트 API 응답을 콘솔에서 확인하세요!');
            } catch (error) {
              console.error('테스트 API 에러:', error);
              alert('테스트 API 호출 실패!');
            }
          }}
          style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          테스트 API 호출
        </button>
      </div>
    </div>
  );
}
