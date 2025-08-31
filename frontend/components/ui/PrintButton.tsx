"use client"

import { Printer } from "lucide-react"
import Image from "next/image"

interface PrintButtonProps {
  onPrint?: () => void
  className?: string
}

export function PrintButton({ onPrint, className = "" }: PrintButtonProps) {
  const handlePrint = () => {
    if (onPrint) {
      onPrint()
    } else {
      // 기본 인쇄 동작
      window.print()
    }
  }

  return (
    <button 
      onClick={handlePrint}
      className={`px-2 py-1.5 text-sm text-white bg-brand-500/50 border border-brand-500/70 hover:bg-brand-500/70 hover:border-brand-500/90 transition-colors flex flex-row items-center gap-1 cursor-pointer ${className}`}
      title="인쇄"
    >
      인쇄{' '}
      <Printer className="w-4 h-4" />
    </button>
  )
}
