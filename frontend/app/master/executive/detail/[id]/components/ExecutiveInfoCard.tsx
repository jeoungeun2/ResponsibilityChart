'use client';

interface ExecutiveInfoCardProps {
  name: string;
  employeeNo?: string;
  positionLabel?: string;
  titleLabel?: string;
}

export default function ExecutiveInfoCard({
  name,
  employeeNo,
  positionLabel,
  titleLabel
}: ExecutiveInfoCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">기본 정보</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <p className="text-gray-900 text-base">{name}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
          <p className="text-gray-900 text-base">{employeeNo || '미입력'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
          <p className="text-gray-900 text-base">{positionLabel || '미입력'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
          <p className="text-gray-900 text-base">{titleLabel || '미입력'}</p>
        </div>
      </div>
    </div>
  );
}
