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
    
    // 책무 관리
    if (segments.includes('responsibility-management')) {
      breadcrumbs.push({
        label: '책무 관리',
        href: '/responsibility-management',
        isActive: false
      })
      
      // system-diagram
      if (segments.includes('system-diagram')) {
        breadcrumbs.push({
          label: '책무체계도 작성',
          href: '/responsibility-management/system-diagram',
          isActive: true
        })
      }
      
      // description
      if (segments.includes('description')) {
        breadcrumbs.push({
          label: '책무기술서 조회',
          href: '/responsibility-management/description',
          isActive: true
        })
      }
      
      // allocation
      if (segments.includes('allocation')) {
        breadcrumbs.push({
          label: '책무 배분',
          href: '/responsibility-management/allocation',
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
