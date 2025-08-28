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
    
    // Responsibility Management
    if (segments.includes('responsibility-management')) {
      breadcrumbs.push({
        label: 'Responsibility Management',
        href: '/responsibility-management',
        isActive: false
      })
      
      // system-diagram
      if (segments.includes('system-diagram')) {
        breadcrumbs.push({
          label: 'System Diagram',
          href: '/responsibility-management/system-diagram',
          isActive: true
        })
      }
      
      // description
      if (segments.includes('description')) {
        breadcrumbs.push({
          label: 'Description',
          href: '/responsibility-management/description',
          isActive: true
        })
      }
      
      // allocation
      if (segments.includes('allocation')) {
        breadcrumbs.push({
          label: 'Allocation',
          href: '/responsibility-management/allocation',
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
