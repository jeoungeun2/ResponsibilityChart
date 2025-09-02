"use client"

import { usePathname } from 'next/navigation'
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'
import React from 'react'

export default function CommonBreadcrumb() {
  const pathname = usePathname()
  
  // 현재 경로에 따른 breadcrumb 생성
  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
    // 홈
    breadcrumbs.push({
      label: 'Home',
      href: '/',
      isActive: false
    })
    
    // 관리조치 Master
    if (segments.includes('management-action')) {
      breadcrumbs.push({
        label: '관리조치 Master',
        href: '/management-action',
        isActive: false
      })
      
      // executive
      if (segments.includes('executive')) {
        breadcrumbs.push({
          label: '관리조치 Master',
          href: '/management-action/executive',
          isActive: true
        })
      }
      
      // department
      if (segments.includes('department')) {
        breadcrumbs.push({
          label: '관리조치 수행팀 정보',
          href: '/management-action/department',
          isActive: true
        })
      }
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="w-full">
      <Breadcrumb>
        <BreadcrumbList className="text-base font-medium">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {breadcrumb.isActive ? (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
