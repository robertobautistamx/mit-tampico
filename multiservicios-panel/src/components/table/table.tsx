import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
  Typography,
  TableSortLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Collapse,
  Badge,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import CloseIcon from '@mui/icons-material/Close';

export type TableColumn<T> = {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
};

type RowData = {
  id: number;
};

type SimpleDataTableProps<T extends RowData> = {
  rows: T[];
  columns: TableColumn<T>[];
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected?: number[];
  onToggleRow?: (id: number) => void;
  onToggleAll?: () => void;
  showSelection?: boolean;
  showFilters?: boolean;
  renderActions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
};

function SimpleDataTable<T extends RowData>({
  rows,
  columns,
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  selected,
  onToggleRow,
  onToggleAll,
  showSelection = true,
  showFilters = true,
  renderActions,
  emptyMessage = 'No hay registros para mostrar',
}: SimpleDataTableProps<T>) {
  const safeSelected = selected ?? [];
  const allSelected = showSelection && rows.length > 0 && safeSelected.length === rows.length;
  const someSelected = showSelection && safeSelected.length > 0 && safeSelected.length < rows.length;

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [density, setDensity] = useState<'small' | 'medium' | 'large'>('medium');
  const [anchorElDensity, setAnchorElDensity] = useState<null | HTMLElement>(null);

  const handleDensityClose = (newDensity?: 'small' | 'medium' | 'large') => {
    setAnchorElDensity(null);
    if (newDensity) {
      setDensity(newDensity);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredRows = useMemo(() => {
    if (!searchQuery) return rows;
    const lowerQuery = searchQuery.toLowerCase();
    return rows.filter((row) => {
      return columns.some((column) => {
        // 1. Busca en el texto exacto que se muestra en la tabla (ideal para fechas formateadas o IDs)
        const renderedValue = column.render(row);
        if (typeof renderedValue === 'string' || typeof renderedValue === 'number') {
          if (String(renderedValue).toLowerCase().includes(lowerQuery)) return true;
        }
        // 2. Respaldo: busca en el dato crudo original por si el render devuelve un componente (ej. un Chip o botón)
        const rawValue = (row as any)[column.key];
        return rawValue != null && String(rawValue).toLowerCase().includes(lowerQuery);
      });
    });
  }, [rows, columns, searchQuery]);

  const sortedRows = useMemo(() => {
    if (!orderBy) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const valueA = (a as any)[orderBy];
      const valueB = (b as any)[orderBy];
      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRows, order, orderBy]);

  const visibleRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(226, 232, 240, 1)',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.05)',
        }}
      >
        <Collapse in={showFilters && filterPanelOpen}>
          <Box sx={{ 
            px: 2, 
            py: 1.5,
            borderBottom: '1px solid rgba(226, 232, 240, 1)', 
            display: 'flex', 
            alignItems: 'center', 
            bgcolor: '#f8fafc',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <OutlinedInput
              size="small"
              placeholder="Buscar en todos los campos..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onPageChange(null, 0); // Regresa a la primera página al buscar
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: '#64748b' }} />
                </InputAdornment>
              }
              endAdornment={
                searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSearchQuery('');
                        onPageChange(null, 0);
                      }}
                      edge="end"
                      sx={{ color: '#94a3b8', '&:hover': { color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.08)' } }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
              sx={{
                width: { xs: '100%', sm: 400 },
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(226, 232, 240, 1)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb', borderWidth: '1px' },
                '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)' },
                '& input': { color: '#334155', fontWeight: 500, fontSize: '0.9rem', py: 1 }
              }}
            />
            {searchQuery && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                  {filteredRows.length} {filteredRows.length === 1 ? 'resultado' : 'resultados'}
                </Typography>
              </Box>
            )}
          </Box>
        </Collapse>

        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(226, 232, 240, 1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showFilters && (
              <Tooltip title="Filtros">
                <IconButton
                  size="small"
                  onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                  sx={{
                    color: filterPanelOpen ? '#2563eb' : '#94a3b8',
                    bgcolor: filterPanelOpen ? '#eff6ff' : 'transparent',
                    border: filterPanelOpen ? '1px solid #bfdbfe' : '1px solid transparent',
                    '&:hover': { bgcolor: filterPanelOpen ? '#dbeafe' : 'rgba(15, 23, 42, 0.04)' }
                  }}
                >
                  <Badge color="error" variant="dot" invisible={searchQuery.trim() === ''}>
                    <FilterListIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            
            <Tooltip title="Densidad">
              <IconButton
                size="small"
                onClick={(e) => setAnchorElDensity(e.currentTarget)}
                sx={{
                  color: anchorElDensity ? '#2563eb' : '#94a3b8',
                  bgcolor: anchorElDensity ? '#eff6ff' : 'transparent',
                  border: anchorElDensity ? '1px solid #bfdbfe' : '1px solid transparent',
                  '&:hover': { bgcolor: anchorElDensity ? '#dbeafe' : 'rgba(15, 23, 42, 0.04)' }
                }}
              >
                <FormatLineSpacingIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElDensity}
              open={Boolean(anchorElDensity)}
              onClose={() => handleDensityClose()}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  mt: 0.5,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  minWidth: 120,
                }
              }}
            >
              <MenuItem onClick={() => handleDensityClose('small')} selected={density === 'small'} sx={{ fontSize: '0.85rem', py: 1 }}>Compacta</MenuItem>
              <MenuItem onClick={() => handleDensityClose('medium')} selected={density === 'medium'} sx={{ fontSize: '0.85rem', py: 1 }}>Estándar</MenuItem>
              <MenuItem onClick={() => handleDensityClose('large')} selected={density === 'large'} sx={{ fontSize: '0.85rem', py: 1 }}>Cómoda</MenuItem>
            </Menu>
          </Box>
          
          <TablePagination
            component="div"
            count={filteredRows.length}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            labelRowsPerPage="Filas"
            labelDisplayedRows={({ from, to }) => `${from}-${to} de ${filteredRows.length}`}
            sx={{
              color: '#475569',
              fontFamily: "'DM Sans', 'Inter', sans-serif",
              borderBottom: 'none',
              '.MuiTablePagination-toolbar': { minHeight: 40, p: 0 },
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                color: '#475569',
                m: 0,
              },
              '.MuiTablePagination-selectIcon': { color: '#475569' },
              '.MuiIconButton-root': { color: '#475569' },
              '.MuiTablePagination-actions': { display: 'flex' }
            }}
          />
        </Box>

        <TableContainer 
          sx={{ 
            height: filterPanelOpen ? 'calc(100vh - 310px)' : 'calc(100vh - 240px)',
            transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            minHeight: '400px',
            overflow: 'auto',
            '&::-webkit-scrollbar': { width: '8px', height: '8px' },
            '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
            '&::-webkit-scrollbar-thumb': { 
              backgroundColor: '#cbd5e1', 
              borderRadius: '10px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              '&:hover': { backgroundColor: '#94a3b8' }
            }
          }}
        >
          <Table 
            stickyHeader
            sx={{ 
              minWidth: 700,
              ...(density === 'large' && {
                '& .MuiTableCell-root': { py: 2.25 }
              })
            }} 
            size={density === 'small' ? 'small' : 'medium'}
          >
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  color: '#475569',
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(226, 232, 240, 1)',
                  backgroundColor: '#f8fafc',
                  fontFamily: "'DM Sans', 'Inter', sans-serif",
                },
              }}
            >
              {showSelection && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={onToggleAll}
                    sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#2563eb' }, '&.MuiCheckbox-indeterminate': { color: '#2563eb' } }}
                  />
                </TableCell>
              )}
              {renderActions && <TableCell align="center" sx={{ width: 120, whiteSpace: 'nowrap' }}>Acciones</TableCell>}
              {columns.map((column) => (
            <TableCell
              key={column.key}
              align={column.align ?? 'left'}
              sx={column.width ? { width: column.width, whiteSpace: 'nowrap' } : undefined}
              sortDirection={orderBy === column.key ? order : false}
            >
              {column.sortable ? (
                <TableSortLabel
                  active={orderBy === column.key}
                  direction={orderBy === column.key ? order : 'asc'}
                  onClick={() => handleRequestSort(column.key)}
                >
                  {column.label}
                </TableSortLabel>
              ) : (
                column.label
              )}
                </TableCell>
              ))}
              {/* Columna espaciadora invisible para absorber el espacio sobrante */}
              <TableCell sx={{ width: '100%' }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row, index) => {
              const isSelected = safeSelected.includes(row.id);
              const isEven = index % 2 === 0;

              return (
                <TableRow
                  key={row.id}
                  hover
                  selected={isSelected}
                  sx={{
                    '& td': {
                      color: '#0f172a',
                      borderBottom: '1px solid rgba(226, 232, 240, 1)',
                      fontFamily: "'DM Sans', 'Inter', sans-serif",
                    },
                    backgroundColor: isEven ? '#ffffff' : '#f8fafc',
                    '&:hover': {
                      backgroundColor: isEven ? '#f1f5f9' : '#eef2f7',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.12)',
                    },
                  }}
                >
                {showSelection && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onToggleRow?.(row.id)}
                      sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#2563eb' } }}
                    />
                  </TableCell>
                )}
                {renderActions && (
                  <TableCell align="center" sx={{ whiteSpace: 'nowrap', py: 0.5 }}>
                    {renderActions(row)}
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell 
                    key={column.key} 
                    align={column.align ?? 'left'}
                    sx={column.width ? { width: column.width, whiteSpace: 'nowrap' } : undefined}
                  >
                    {column.render(row)}
                  </TableCell>
                ))}
                {/* Columna espaciadora invisible en las filas */}
                <TableCell sx={{ width: '100%' }} />
                </TableRow>
              );
            })}
            {visibleRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={(showSelection ? 1 : 0) + columns.length + (renderActions ? 1 : 0) + 1}>
                  <Typography sx={{ py: 3, textAlign: 'center', color: '#64748b' }}>{emptyMessage}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default SimpleDataTable;