"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState, ReactNode } from "react";

// 사이드바 상태를 위한 Context 타입 정의
interface SidebarContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

// Context 생성
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Context 사용을 위한 Hook
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// 사이드바 Provider 컴포넌트
function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

const queryClient = new QueryClient();

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </QueryClientProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}
