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
    
    // 책무 이행 점검
    if (segments.includes('responsibility-check')) {
      breadcrumbs.push({
        label: '책무 이행 점검',
        href: '/responsibility-check',
        isActive: false
      })
      
      // status
      if (segments.includes('status')) {
        breadcrumbs.push({
          label: '관리조치활동 수행',
          href: '/responsibility-check/status',
          isActive: true
        })
      }
      
      // management
      if (segments.includes('management')) {
        breadcrumbs.push({
          label: '관리조치 이행 점검',
          href: '/responsibility-check/management',
          isActive: true
        })
      }
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="max-w-7xl mx-auto">
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
