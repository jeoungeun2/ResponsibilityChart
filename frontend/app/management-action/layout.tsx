"use client"

import React from 'react'

export default function ManagementActionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="space-y-8 pt-14">
        {children}
      </div>
    </div>
  );
}
