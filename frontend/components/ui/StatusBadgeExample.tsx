import React from 'react';
import StatusBadge from './StatusBadge';

const StatusBadgeExample: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">StatusBadge 컴포넌트 예제</h2>
      
      <div className="space-y-2">
        <h3 className="font-semibold">기본 사용법 (status만 전달)</h3>
        <div className="flex gap-4">
          <StatusBadge status="completed" />
          <StatusBadge status="in-progress" />
          <StatusBadge status="not-evaluated" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">커스텀 텍스트와 색상</h3>
        <div className="flex gap-4">
          <StatusBadge status="custom" text="진행중" color="bg-yellow-300" />
          <StatusBadge status="custom" text="완료" color="bg-blue-300" />
          <StatusBadge status="custom" text="대기중" color="bg-orange-300" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">크기별 사용법</h3>
        <div className="flex gap-4 items-center">
          <StatusBadge status="completed" size="sm" />
          <StatusBadge status="in-progress" size="md" />
          <StatusBadge status="not-evaluated" size="lg" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">한글 상태값</h3>
        <div className="flex gap-4">
          <StatusBadge status="완료" />
          <StatusBadge status="진행중" />
          <StatusBadge status="미평가" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">추가 상태값들</h3>
        <div className="flex gap-4">
          <StatusBadge status="pending" />
          <StatusBadge status="rejected" />
          <StatusBadge status="approved" />
        </div>
      </div>
    </div>
  );
};

export default StatusBadgeExample;
