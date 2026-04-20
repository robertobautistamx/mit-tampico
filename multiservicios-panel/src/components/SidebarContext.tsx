import React, { createContext, useContext, useEffect, useState } from 'react';

const collapsedWidth = 64;
const expandedWidth = 200;

interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
  expandedWidth: number;
  collapsedWidth: number;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth < 800);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const value: SidebarContextValue = {
    collapsed,
    toggle: () => setCollapsed((s) => !s),
    expandedWidth,
    collapsedWidth,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}

export { collapsedWidth, expandedWidth };
