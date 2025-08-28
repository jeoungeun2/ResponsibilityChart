'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ExecutiveDetailTableProps {
  employeeNo?: string;
  phone?: string;
  email?: string;
  termStartDate?: string;
  termEndDate?: string;
  evaluationStatus?: string;
  createdAt: string;
  updatedAt?: string;
}

export default function ExecutiveDetailTable({
  employeeNo,
  phone,
  email,
  termStartDate,
  termEndDate,
  evaluationStatus,
  createdAt,
  updatedAt
}: ExecutiveDetailTableProps) {
  // 평가 상태 텍스트 변환
  const getStatusText = (status?: string) => {
    switch (status) {
      case 'NOT_STARTED': return '미시작';
      case 'STARTED': return '시작';
      case 'IN_PROGRESS': return '진행중';
      default: return '미시작';
    }
  };

  // 평가 상태 배지 렌더링
  const renderEvaluationStatus = (status?: string) => (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
      {getStatusText(status)}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm h-[450px]">
      <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">상세 정보</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">구분</TableHead>
            <TableHead className="w-2/3">내용</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">사번</TableCell>
            <TableCell>{employeeNo || '미입력'}</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">연락처</TableCell>
            <TableCell>{phone || '미입력'}</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">이메일</TableCell>
            <TableCell>{email || '미입력'}</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">재임시작일</TableCell>
            <TableCell>{termStartDate || '미입력'}</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">재임종료일</TableCell>
            <TableCell>{termEndDate || '미입력'}</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">평가 상태</TableCell>
            <TableCell>{renderEvaluationStatus(evaluationStatus)}</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">생성일</TableCell>
            <TableCell>{new Date(createdAt).toLocaleDateString('ko-KR')}</TableCell>
          </TableRow>
          
          {updatedAt && (
            <TableRow>
              <TableCell className="font-medium">수정일</TableCell>
              <TableCell>{new Date(updatedAt).toLocaleDateString('ko-KR')}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
