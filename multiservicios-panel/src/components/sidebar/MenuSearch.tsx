import React from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FlatMenuItem } from './useMenuNavigation';

interface MenuSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: FlatMenuItem[];
  isSearching: boolean;
  clearSearch: () => void;
  onSelectResult: (item: FlatMenuItem) => void;
  variant?: 'sidebar' | 'top';
}

const MenuSearch: React.FC<MenuSearchProps> = ({ searchQuery, setSearchQuery }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center',
      bgcolor: 'rgba(15, 23, 42, 0.04)',
      border: '1px solid rgba(15, 23, 42, 0.08)',
      borderRadius: 2,
      px: 1.25,
      py: 0.5,
      transition: 'all 0.2s ease',
      '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.06)' },
      '&:focus-within': { borderColor: '#38bdf8', bgcolor: '#ffffff', boxShadow: '0 0 0 2px rgba(56, 189, 248, 0.15)' }
    }}
  >
    <SearchIcon sx={{ fontSize: '1.1rem', color: '#64748b', mr: 1 }} />
    <InputBase
      placeholder="Buscar..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{ width: '100%', fontSize: '0.85rem', color: '#334155' }}
    />
  </Box>
);

export default MenuSearch;
