"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface StartDateFilterProps {
  startDate?: string
  onStartDateChange: (date: string) => void
  placeholder?: string
  className?: string
}

interface EndDateFilterProps {
  endDate?: string
  onEndDateChange: (date: string) => void
  placeholder?: string
  className?: string
}

function formatDate(date: Date | undefined): string {
  if (!date) {
    return ""
  }
  return date.toISOString().split('T')[0] // YYYY-MM-DD 형식
}

function isValidDate(date: Date | undefined): boolean {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export function StartDateFilter({
  startDate,
  onStartDateChange,
  placeholder = "연도-월-일",
  className = ""
}: StartDateFilterProps) {
  const [startOpen, setStartOpen] = React.useState(false)
  
  const [startDateObj, setStartDateObj] = React.useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  )

  const [startMonth, setStartMonth] = React.useState<Date | undefined>(startDateObj)

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDateObj(date)
    if (date) {
      onStartDateChange(formatDate(date))
      setStartOpen(false)
    }
  }

  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // 모든 입력값을 그대로 전달 (삭제 포함)
    onStartDateChange(value)
    
    // 완성된 날짜일 때만 날짜 객체 설정
    if (value && value.length === 10) {
      const date = new Date(value)
      if (isValidDate(date)) {
        setStartDateObj(date)
        setStartMonth(date)
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={startDate || ""}
        placeholder={placeholder}
        className="h-10 w-full bg-background pr-10 border-orange-500 text-orange-600 focus:border-orange-500 focus:ring-orange-500"
        onChange={handleStartInputChange}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setStartOpen(true)
          }
        }}
      />
      <Popover open={startOpen} onOpenChange={setStartOpen}>
                 <PopoverTrigger asChild>
           <Button
             variant="ghost"
             className="absolute top-1/2 right-2 size-6 -translate-y-1/2 p-0 cursor-pointer"
           >
             <CalendarIcon className="size-3.5 text-orange-600" />
             <span className="sr-only">시작일 선택</span>
           </Button>
         </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={startDateObj}
            captionLayout="dropdown"
            month={startMonth}
            onMonthChange={setStartMonth}
            onSelect={handleStartDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function EndDateFilter({
  endDate,
  onEndDateChange,
  placeholder = "연도-월-일",
  className = ""
}: EndDateFilterProps) {
  const [endOpen, setEndOpen] = React.useState(false)
  
  const [endDateObj, setEndDateObj] = React.useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  )

  const [endMonth, setEndMonth] = React.useState<Date | undefined>(endDateObj)

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDateObj(date)
    if (date) {
      onEndDateChange(formatDate(date))
      setEndOpen(false)
    }
  }

  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // 모든 입력값을 그대로 전달 (삭제 포함)
    onEndDateChange(value)
    
    // 완성된 날짜일 때만 날짜 객체 설정
    if (value && value.length === 10) {
      const date = new Date(value)
      if (isValidDate(date)) {
        setEndDateObj(date)
        setEndMonth(date)
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={endDate || ""}
        placeholder={placeholder}
        className="h-10 w-full bg-background pr-10"
        onChange={handleEndInputChange}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setEndOpen(true)
          }
        }}
      />
      <Popover open={endOpen} onOpenChange={setEndOpen}>
                 <PopoverTrigger asChild>
           <Button
             variant="ghost"
             className="absolute top-1/2 right-2 size-6 -translate-y-1/2 p-0 cursor-pointer"
           >
             <CalendarIcon className="size-3.5" />
             <span className="sr-only">종료일 선택</span>
           </Button>
         </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={endDateObj}
            captionLayout="dropdown"
            month={endMonth}
            onMonthChange={setEndMonth}
            onSelect={handleEndDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
