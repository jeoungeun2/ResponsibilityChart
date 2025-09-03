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
    if (segments.includes('improvement-implementation')) {
      breadcrumbs.push({
        label: '책무 이행 점검',
        href: '/responsibility-check',
        isActive: false
      })
      
      // 미흡사항개선 이행내역
      breadcrumbs.push({
        label: '미흡사항개선 이행내역',
        href: '/improvement-implementation',
        isActive: true
      })
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href}>
              <BreadcrumbItem>
                {breadcrumb.isActive ? (
                  <BreadcrumbPage className="text-gray-500">
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    href={breadcrumb.href}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
