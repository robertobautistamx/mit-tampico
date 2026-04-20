import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { SidebarProvider, useSidebar } from './SidebarContext';

function LayoutInner() {
  const { collapsed, expandedWidth, collapsedWidth } = useSidebar();
  const marginLeft = collapsed ? collapsedWidth : expandedWidth;
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ marginLeft, flex: 1, padding: 32, transition: 'margin-left 220ms cubic-bezier(.2,.9,.2,1)' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default function MainLayout() {
  return (
    <SidebarProvider>
      <LayoutInner />
    </SidebarProvider>
  );
}
