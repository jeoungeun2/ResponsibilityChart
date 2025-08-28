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
import { Home } from 'lucide-react'
import React from 'react'

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  
  // 현재 경로에 따른 breadcrumb 생성
  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
    // 홈
    breadcrumbs.push({
      // label: <Home className="h-4 w-4" />,
      label: 'Home',
      href: '/',
      isActive: false
    })
    
    // 마스터 관리
    if (segments.includes('master')) {
      breadcrumbs.push({
        label: 'Master',
        href: '/master',
        isActive: false
      })
      
      // executive (임원 마스터)
      if (segments.includes('executive')) {
        breadcrumbs.push({
          label: '임원 Master',
          href: '/master/executive',
          isActive: true
        })
      }
      
      // department (조직 마스터)
      if (segments.includes('department')) {
        breadcrumbs.push({
          label: '조직 마스터',
          href: '/master/department',
          isActive: true
        })
      }
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="min-h-screen">
      <div className="space-y-8 pt-1">
        {/* Breadcrumb */}
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
        <div className="max-w-7xl mx-auto">
        {children}
      </div>
      </div>
    </div>
  );
}
