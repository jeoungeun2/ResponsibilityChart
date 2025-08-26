'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="  transition-all duration-300 ease-in-out">
     

        {/* 하단 구분선 및 저작권 */}
        <div className="  mt-8 py-6 px-7">
          <div className="flex flex-col md:grid-cols-4 md:flex-row justify-between items-center border-t border-gray-300 pt-4">
            <p className="text-gray-700 text-sm">
              © 2025 책무구조시스템
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      
    </footer>
  );
}
