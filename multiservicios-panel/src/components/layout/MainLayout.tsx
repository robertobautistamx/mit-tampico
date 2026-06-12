import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SidebarMenu from '../sidebar/sidebar';
import { RUTAS_CONFIG } from '../../routers/rutasConfig';
import PageBreadcrumbs from '../navigation/PageBreadcrumbs';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // minimal menuNav stub to satisfy SidebarMenu props
  const menuNav = {
    currentItems: RUTAS_CONFIG[0]?.categorias ?? [],
    breadcrumbs: [],
    pushLevel: () => {},
    popLevel: () => {},
    jumpToLevel: () => {},
    isRoot: true,
    selectedKey: selected,
    setSelectedKey: (k: string) => setSelected(k),
    searchQuery,
    setSearchQuery,
    searchResults: [],
    isSearching: false,
    clearSearch: () => setSearchQuery(''),
  } as any;

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', bgcolor: '#f8fafc', position: 'relative' }}>
        <SidebarMenu agrupadores={RUTAS_CONFIG} menuNav={menuNav} onNavigate={() => {}} collapsed={sidebarCollapsed} onToggleCollapsed={setSidebarCollapsed} />
        
        {/* Toggle Button central en el borde del Sidebar */}
        <IconButton
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: sidebarCollapsed ? 14 : 244 - 14,
            transform: sidebarCollapsed ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
            zIndex: 1300,
            bgcolor: '#ffffff',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            width: 28,
            height: 28,
            '&:hover': {
              bgcolor: '#f1f5f9',
            }
          }}
        >
          <ChevronLeftIcon sx={{ color: '#64748b', fontSize: '1.2rem' }} />
        </IconButton>

        <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          <PageBreadcrumbs />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </Box>
        </Box>
    </Box>
  );
};

export default MainLayout;
