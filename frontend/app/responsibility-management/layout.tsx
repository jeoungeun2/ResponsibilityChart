"use client"

import React from 'react'

export default function ResponsibilityManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
}
