"use client"

import { Download, FileText, FileSpreadsheet, FileImage, LucideIcon } from "lucide-react"
import Image from "next/image"

type FileType = 'pdf' | 'docx' | 'jwp' | 'xlsx' | 'pptx' | 'hwp' | 'doc'

interface DownloadButtonProps {
  onDownload?: () => void
  className?: string
  fileType?: FileType
}

// 파일 타입별 아이콘과 텍스트 정의
const fileTypeConfig: Record<FileType, { icon: LucideIcon; text: string; useImage?: boolean; imageSrc?: string; imageSize?: number }> = {
  pdf: { icon: FileText, text: 'pdf' },
  docx: { icon: FileText, text: 'docx' },
  jwp: { icon: FileImage, text: 'jwp' },
  xlsx: { icon: FileSpreadsheet, text: 'xlsx' },
  pptx: { icon: FileText, text: 'pptx', useImage: true, imageSrc: '/images/pptx3.png' },
  hwp: { icon: FileText, text: 'hwp', useImage: true, imageSrc: '/images/hwp.png', imageSize: 34 },
  doc: { icon: FileText, text: 'doc', useImage: true, imageSrc: '/images/doc.png', imageSize: 34 }
}

export function DownloadButton({ 
  onDownload, 
  className = "", 
  fileType = 'pdf'
}: DownloadButtonProps) {
  const { icon: Icon, text, useImage, imageSrc, imageSize } = fileTypeConfig[fileType]

  const handleDownload = () => {
    if (onDownload) {
      onDownload()
    } else {
      // 기본 다운로드 동작
      console.log(`${fileType} 다운로드 실행`)
    }
  }

  return (
    <button 
      onClick={handleDownload}
      className={`px-2 py-1.5 text-sm text-gray-700 border border-gray-300 hover:border-gray-400 hover:text-gray-800 transition-colors cursor-pointer ${className}`}
      title={text}
    >
      <span className="font-semibold">다운로드</span>{' '}
      <span className="font-medium">
        ({text})
      </span>
    </button>
  )
}
