import React from 'react';

interface StatusBadgeProps {
  status: string;
  text?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  color,
  size = 'md',
  className = ''
}) => {
  // 기본 색상 매핑
  const getDefaultColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case '완료':
        return 'bg-blue-300';
      case 'in-progress':
      case '진행중':
        return 'bg-yellow-300';
      case 'not-evaluated':
      case '미평가':
        return 'bg-gray-300';
      case 'pending':
      case '대기중':
        return 'bg-orange-300';
      case 'writing':
        return 'bg-yellow-300';
      case '점검승인대기':
        return 'bg-orange-300';
      case '점검승인완료':
        return 'bg-blue-300';
      case '승인요청':
        return 'bg-blue-300';
      case '미완료':
        return 'bg-gray-300';
      case '미점검':
        return 'bg-gray-300';
      case 'rejected':
      case '거부':
        return 'bg-red-300';
      case 'approved':
      case '승인':
        return 'bg-blue-300';
      default:
        return 'bg-gray-300';
    }
  };

  // 기본 텍스트 매핑
  const getDefaultText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '완료';
      case 'in-progress':
        return '진행중';
      case 'not-evaluated':
        return '미평가';
      case 'pending':
        return '대기중';
      case 'writing':
        return '작성중';
      case '점검승인대기':
        return '점검승인대기';
      case '점검승인완료':
        return '점검승인완료';
      case '승인요청':
        return '승인요청';
      case '미완료':
        return '미완료';
      case '미점검':
        return '미점검';
      case 'rejected':
        return '거부';
      case 'approved':
        return '승인';
      default:
        return status;
    }
  };

  // 텍스트 색상 매핑
  const getTextColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case '완료':
        return 'text-blue-800';
      case 'in-progress':
      case '진행중':
        return 'text-yellow-800';
      case 'not-evaluated':
      case '미평가':
        return 'text-gray-800';
      case 'pending':
      case '대기중':
        return 'text-orange-800';
      case 'writing':
        return 'text-yellow-800';
      case '점검승인대기':
        return 'text-orange-800';
      case '점검승인완료':
        return 'text-blue-800';
      case '승인요청':
        return 'text-blue-800';
      case '미완료':
        return 'text-gray-800';
      case '미점검':
        return 'text-gray-800';
      case 'rejected':
      case '거부':
        return 'text-red-800';
      case 'approved':
      case '승인':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  // 크기별 스타일
  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-2 h-2 text-xs';
      case 'lg':
        return 'w-3 h-3 text-sm';
      default:
        return 'w-2 h-2 text-sm';
    }
  };

  const badgeColor = color || getDefaultColor(status);
  const badgeText = text || getDefaultText(status);
  const textColor = getTextColor(status);
  const sizeStyles = getSizeStyles(size);

  return (
    <div className={`flex items-baseline space-x-2 ${className}`}>
      <div className={`rounded-full ${badgeColor} ${sizeStyles} flex-shrink-0`}></div>
      <span className={`${textColor} ${sizeStyles}`}>
        {badgeText}
      </span>
    </div>
  );
};

export default StatusBadge;
