import React from 'react';

interface H1Props {
  title: string;  // 제목
  rightContent?: React.ReactNode;  // 오른쪽 공간에 들어갈 내용
  className?: string;
}

export default function H1({ title, rightContent, className = "" }: H1Props) {
  return (
    <div className={`${className} max-w-7xl mx-auto`}>
      {/* 제목과 오른쪽 콘텐츠 */}
      <div className={`flex justify-between items-center border-b border-b-brandGrey-200 ${!rightContent ? 'pb-4' : ''}`}>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        {rightContent && (
          <div className="flex items-center gap-3">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
}
