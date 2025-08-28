'use client';

import Image from 'next/image';

interface ExecutiveInfoCardProps {
  name: string;
  positionLabel?: string;
  titleLabel?: string;
}

export default function ExecutiveInfoCard({
  name,
  positionLabel,
  titleLabel
}: ExecutiveInfoCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm h-[450px]">
      <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">{name}</h3>
      
      {/* 임원 사진 */}
      <div className="relative mb-6">
        {/* 검정 네모 배경 */}
        <div className="w-full h-64 bg-black"></div>
        
        {/* 임원 사진 - 중앙에 배치 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/images/임원.png"
              alt="임원 사진"
              width={100}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">직책(직위)</label>
            <p className="text-gray-900 text-base">
              {titleLabel || '미입력'} ({positionLabel || '미입력'})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
