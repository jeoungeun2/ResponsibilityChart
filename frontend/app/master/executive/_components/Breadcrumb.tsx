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
    
    // 책무구조 Master
    if (segments.includes('master')) {
      breadcrumbs.push({
        label: '책무구조 Master',
        href: '/master',
        isActive: false
      })
      
      // executive_front (임원관리 Master)
      if (segments.includes('executive_front')) {
        breadcrumbs.push({
          label: '임원관리 Master',
          href: '/master/executive_front',
          isActive: true
        })
      }
      
      // organization (조직 및 직책관리 Master)
      if (segments.includes('organization')) {
        breadcrumbs.push({
          label: '조직 및 직책관리 Master',
          href: '/master/organization',
          isActive: true
        })
      }
      
      // department (책무관리 Master)
      if (segments.includes('department')) {
        breadcrumbs.push({
          label: '책무관리 Master',
          href: '/master/department',
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
