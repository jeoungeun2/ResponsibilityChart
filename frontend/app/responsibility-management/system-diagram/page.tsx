"use client";

import { useState } from 'react';
import H1 from '@/components/layouts/h1';
import CommonBreadcrumb from '../_components/Breadcrumb';
import Header from '../_components/Header';
import { useSidebar } from '@/config/providers';

export default function SystemDiagramPage() {
  const { isSidebarCollapsed } = useSidebar();

  return (
    <div className="relative">
      <Header 
        rightContent={
          <div className="flex items-center space-x-3">
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>다이어그램 보기</span>
            </button>
            <button className="text-gray-900 font-semibold px-4 py-2 text-sm transition-colors flex items-center space-x-2 hover:bg-gray-900/20 cursor-pointer border-l border-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>다운로드</span>
            </button>
          </div>
        }
      />
      <div className={`max-w-7xl mx-auto space-y-6 pt-14 ${isSidebarCollapsed ? '' : 'px-8'}`}>
        <CommonBreadcrumb />
        <H1 title="System Diagram" />
        
        {/* 시스템 다이어그램 컨테이너 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">책임 관리 시스템 구조도</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                확대
              </button>
              <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                축소
              </button>
            </div>
          </div>
          
          {/* 다이어그램 영역 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">시스템 다이어그램</h3>
              <p className="text-gray-500 mb-4">
                책임 관리 시스템의 전체 구조와 데이터 흐름을 시각적으로 표현합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900">입력 단계</div>
                  <div className="text-gray-600">데이터 수집 및 검증</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900">처리 단계</div>
                  <div className="text-gray-600">비즈니스 로직 처리</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900">출력 단계</div>
                  <div className="text-gray-600">결과 생성 및 저장</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 설명 텍스트 */}
          <div className="mt-6 text-sm text-gray-600">
            <p className="mb-2">
              • 이 다이어그램은 책임 관리 시스템의 핵심 구성 요소와 데이터 흐름을 보여줍니다.
            </p>
            <p className="mb-2">
              • 각 단계별로 입력, 처리, 출력 과정을 명확하게 구분하여 표시합니다.
            </p>
            <p>
              • 시스템의 전체적인 구조를 파악하고 개선점을 식별하는 데 활용할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
