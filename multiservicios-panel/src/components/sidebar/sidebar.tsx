import React, { FC, memo, useCallback, useState, useMemo, useEffect } from 'react';
import {
  Box,
  List,
  ListItemButton,
  IconButton,
  Typography,
  Breadcrumbs,
  Link,
  Collapse,
  Divider,
  Tooltip,
  Switch,
} from '@mui/material';
import { styled, keyframes, alpha } from '@mui/material/styles';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useLogin } from '../../modules/login/login';
import { useTranslation } from 'react-i18next';
import { Acceso, Agrupador } from '../../routers/rutasConfig';
import { UseMenuNavigationReturn, FlatMenuItem } from './useMenuNavigation';
import MenuSearch from './MenuSearch';

// ─── design tokens ────────────────────────────────────────────────────────────

// layout tokens that don't change with theme
const COLLAPSED_W    = 0;
const EXPANDED_W     = 244;
const TRANSITION     = 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)';

// ─── keyframes ────────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
`;

// ─── styled: sidebar shell ────────────────────────────────────────────────────

const SidebarShell = styled(Box)<{ collapsed: number }>(({ collapsed, theme }: any) => ({
  width:    collapsed ? COLLAPSED_W : EXPANDED_W,
  minWidth: collapsed ? COLLAPSED_W : EXPANDED_W,
  height:   '100%',
  background: theme.palette.background.paper,
  borderRight: collapsed ? 'none' : `1px solid ${theme.palette.divider}`,
  display:  'flex',
  flexDirection: 'column',
  transition: 'width 0.3s ease, min-width 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1200,
  flexShrink: 0,
}));


// ─── styled: logo area ────────────────────────────────────────────────────────


// ─── styled: toggle button ────────────────────────────────────────────────────



// ─── styled: section header ───────────────────────────────────────────────────

const SectionBtn = styled(ListItemButton)<{ collapsed: number }>(({ collapsed, theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: collapsed ? '8px 22px' : '7px 16px',
  transition: TRANSITION,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '&:hover': { background: theme.palette.action.hover },
}));

const SectionLabel = styled(Typography)(({ theme }: any) => ({
  fontSize: '0.625rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: theme.palette.text.secondary,
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  transition: TRANSITION,
  fontFamily: "'DM Sans', 'Inter', sans-serif",
}));

const SectionChevron = styled(ExpandMoreIcon)<{ open: number }>(
  ({ open, theme }: any) => ({
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    transition: `transform 0.2s ease`,
    transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
    flexShrink: 0,
  }),
);

// ─── styled: menu item ────────────────────────────────────────────────────────

const ItemBtn = styled(ListItemButton)<{
  isactive: number;
  collapsed: number;
}>(({ isactive, collapsed, theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: collapsed ? '6px 18px' : '6px 10px 6px 16px',
  margin: '1px 8px',
  borderRadius: 8,
  transition: TRANSITION,
  borderLeft: isactive ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  background: isactive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
  animation: isactive ? `${fadeIn} 0.2s ease` : 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',

  '&:hover': {
    background: isactive ? alpha(theme.palette.primary.main, 0.18) : theme.palette.action.hover,
    transform: collapsed ? 'none' : 'translateX(2px)',
  },
}));

const ItemIconWrap = styled(Box)<{ itemcolor?: string }>(({ itemcolor, theme }: any) => ({
  width:  27,
  height: 27,
  borderRadius: 7,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  color: itemcolor ? theme.palette.getContrastText(itemcolor) : theme.palette.text.secondary,
  background: itemcolor ?? (theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9'),
  transition: TRANSITION,
}));

const ActiveDot = styled(Box)({
  width:  5,
  height: 5,
  borderRadius: '50%',
  background: '#22c55e',
  flexShrink: 0,
  boxShadow: '0 0 6px rgba(34,197,94,0.6)',
});

// ─── styled: footer user ─────────────────────────────────────────────────────


const Avatar = styled(Box)(({ theme }) => ({
  width:  36,
  height: 36,
  borderRadius: 8,
  flexShrink: 0,
  background: 'linear-gradient(135deg, #1e3a5f, #1e40af)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.85rem',
  fontWeight: 700,
  color: theme.palette.primary.light,
  border: '1px solid rgba(255,255,255,0.08)',
  fontFamily: "'DM Sans', 'Inter', sans-serif",
}));

const ProfileWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '16px 16px',
  minHeight: 56,
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
  overflow: 'hidden',
}));

// ─── styled: breadcrumbs ──────────────────────────────────────────────────────

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-separator': { margin: '0 2px' },
  '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' },
}));

const BreadcrumbLink = styled(Link)(({ theme }) => ({
  fontSize: '0.7rem',
  cursor: 'pointer',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '&:hover': { color: theme.palette.primary.light, textDecoration: 'underline' },
}));

const BackBtn = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.light,
  width: 26,
  height: 26,
  '&:hover': { background: alpha(theme.palette.primary.main, 0.16) },
  '& svg': { fontSize: '0.85rem' },
}));

// ─── helpers ──────────────────────────────────────────────────────────────────

function hasActiveChild(items: Acceso[], path: string): boolean {
  for (const item of items) {
    if (item.ruta === path) return true;
    if (item.children && hasActiveChild(item.children, path)) return true;
  }
  return false;
}

// ─── props ────────────────────────────────────────────────────────────────────

interface SidebarMenuProps {
  agrupadores: Agrupador[];
  menuNav: UseMenuNavigationReturn;
  onNavigate: (ruta: string) => void;
  /** User display info */
  userName?: string;
  userInitials?: string;
  userRole?: string;
  /** Controlled collapsed state (optional). If provided, component becomes controlled. */
  collapsed?: boolean;
  /** Toggle callback when collapsed state should change */
  onToggleCollapsed?: (v: boolean) => void;
}

// ─── component ────────────────────────────────────────────────────────────────

const SidebarMenu: FC<SidebarMenuProps> = memo(({
  agrupadores,
  menuNav,
  onNavigate,
  userName     = 'Usuario',
  userInitials = 'U',
  userRole     = 'Administrador',
  collapsed: collapsedProp,
  onToggleCollapsed,
}) => {
  const { t }        = useTranslation();
  const navigate     = useNavigate();
  const location     = useLocation();
  const currentPath  = location.pathname;

  // safe translator: if i18n isn't loaded, fall back to provided label/tag
  const tt = useCallback((tag?: string, fallback?: string) => {
    if (!tag) return fallback ?? '';
    const key = `menu.${tag}`;
    try {
      const res = t(key);
      return res && res !== key ? res : (fallback ?? tag);
    } catch {
      return fallback ?? tag;
    }
  }, [t]);

  // support controlled or uncontrolled collapsed state
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = typeof collapsedProp === 'boolean' ? collapsedProp : internalCollapsed;
  const setCollapsed = useCallback((v: boolean) => {
    if (typeof collapsedProp !== 'boolean') setInternalCollapsed(v);
    if (onToggleCollapsed) onToggleCollapsed(v);
  }, [collapsedProp, onToggleCollapsed]);

  const {
    currentItems,
    breadcrumbs,
    pushLevel,
    popLevel,
    jumpToLevel,
    isRoot,
    selectedKey,
    setSelectedKey,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    clearSearch,
  } = menuNav;

  const { logout, user } = useLogin();

  // ─── Lógica temporal del Modo Oscuro ──────────────────────────────────────
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    window.dispatchEvent(new Event('theme-changed')); // Emite un evento para que el App.tsx lo escuche
  };

  // ─── Lógica de actualización en tiempo real ─────────────────────────────────
  const [freshStorageUser, setFreshStorageUser] = useState<any>(null);

  useEffect(() => {
    const checkStorage = () => {
      try {
        let found = false;
        // Busca en las llaves más comunes de sesión para obtener la info fresca en tiempo real
        const keys = ['user', 'usuario', 'userData', 'session', 'auth'];
        for (const k of keys) {
          const val = localStorage.getItem(k);
          if (val && val.trim().startsWith('{')) {
            setFreshStorageUser(JSON.parse(val));
            found = true;
            break;
          }
        }
        if (!found) setFreshStorageUser(null);
      } catch (e) {}
    };

    checkStorage();
    window.addEventListener('storage', checkStorage);
    window.addEventListener('user-updated', checkStorage); // Evento personalizado opcional
    
    // Auto-refresco inteligente cada 2s por si se actualiza silenciosamente
    const interval = setInterval(checkStorage, 2000); 

    return () => {
      window.removeEventListener('storage', checkStorage);
      window.removeEventListener('user-updated', checkStorage);
      clearInterval(interval);
    };
  }, []);

  // 1. Forzamos a convertir el usuario a objeto si viene como texto (String)
  let parsedUser = freshStorageUser || user;
  if (typeof parsedUser === 'string') {
    try { parsedUser = JSON.parse(parsedUser); } catch (e) {}
  }

  // Extraemos la información del usuario considerando que el backend podría
  // estar devolviéndola anidada o dentro de un arreglo (común en consultas MySQL)
  let userData = (parsedUser as any)?.user || (parsedUser as any)?.usuario || (parsedUser as any)?.data || parsedUser;
  
  if (Array.isArray(userData)) {
    userData = userData[0];
  } else if (Array.isArray(parsedUser)) {
    userData = parsedUser[0];
  }

  // 2. Usamos el correo (email) como plan B en caso de que el backend no mande el nombre
  const displayUserName = userData?.nombre || userData?.name || userData?.username || userData?.email || userName;
  const displayUserInitials = displayUserName ? displayUserName.charAt(0).toUpperCase() : userInitials;
  
  // Formatear el rol para que se vea elegante (ej: 'admin' -> 'Admin')
  const rawRole = userData?.rol || userData?.role;
  const displayUserRole = rawRole 
    ? rawRole.charAt(0).toUpperCase() + rawRole.slice(1) 
    : userRole;

  // compute flattened list and filtered results when user types
  const filteredItems = useMemo(() => {
    const q = (searchQuery ?? '').trim().toLowerCase();
    if (!q) return [] as Acceso[];
    const all: Acceso[] = [
      { ruta: '/dashboard', tag: 'Inicio', opcion: 'Inicio', icono: HomeIcon } as any
    ];
    for (const g of agrupadores) {
      for (const c of g.categorias) {
        all.push(c);
        if (c.children && c.children.length) {
          for (const ch of c.children) all.push(ch);
        }
      }
    }
    return all.filter(item => {
      const label = tt(item.tag, item.opcion || item.tag).toLowerCase();
      return label.includes(q) || (item.tag ?? '').toLowerCase().includes(q) || (item.opcion ?? '').toLowerCase().includes(q);
    });
  }, [agrupadores, searchQuery, tt]);
  // Section accordion state — all open by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const g of agrupadores) init[g.tag || g.opcion] = true;
    return init;
  });

  const toggleSection = useCallback((key: string) => {
    if (collapsed) { setCollapsed(false); return; }
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  }, [collapsed, setCollapsed]);

  const activeGroupKey = useMemo(() => {
    for (const g of agrupadores) {
      if (hasActiveChild(g.categorias, currentPath)) return g.tag || g.opcion;
    }
    return null;
  }, [agrupadores, currentPath]);

  const handleItemClick = useCallback((item: Acceso) => {
    if (item.ruta) {
      setSelectedKey(item.ruta);
      onNavigate(item.ruta);
      navigate(item.ruta);
    } else if (item.children?.length) {
      pushLevel(item.children, item.opcion, item.tag);
    }
  }, [navigate, onNavigate, pushLevel, setSelectedKey]);

  const handleSearchSelect = useCallback((flat: FlatMenuItem) => {
    if (flat.ruta) {
      setSelectedKey(flat.ruta);
      clearSearch();
      onNavigate(flat.ruta);
      navigate(flat.ruta);
    }
  }, [navigate, onNavigate, setSelectedKey, clearSearch]);

  // ── breadcrumb header ────────────────────────────────────────────────────

  const renderBreadcrumbs = () => {
    if (isRoot || collapsed) return null;
    return (
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1,
          py: 0.75,
          borderBottom: `1px solid ${theme.palette.divider}`,
          minHeight: 40,
        })}
      >
        <BackBtn size="small" onClick={popLevel}>
          <ArrowBackIcon />
        </BackBtn>
        <StyledBreadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: '0.65rem', color: 'text.secondary' }} />}
          sx={{ flex: 1, minWidth: 0 }}
        >
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return isLast ? (
              <Typography
                key={i}
                sx={(theme) => ({
                  fontSize: '0.7rem', fontWeight: 600,
                  color: theme.palette.primary.light, whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                })}
              >
                {crumb.tag ? tt(crumb.tag, crumb.label) : crumb.label}
              </Typography>
            ) : (
              <BreadcrumbLink key={i} onClick={() => typeof crumb.stackIndex === 'number' && jumpToLevel(crumb.stackIndex)}>
                {i === 0
                  ? <HomeIcon sx={{ fontSize: '0.75rem', verticalAlign: 'middle' }} />
                  : (crumb.tag ? tt(crumb.tag, crumb.label) : crumb.label)
                }
              </BreadcrumbLink>
            );
          })}
        </StyledBreadcrumbs>
      </Box>
    );
  };

  // ── single menu item ─────────────────────────────────────────────────────

  const renderItem = (item: Acceso | FlatMenuItem, index: number) => {
    const it = item as any;
    const isFlat = 'parents' in item;
    const hasChildren  = !isFlat && Boolean(it.children?.length);
    const ruta = it.ruta;
    const isActive     = ruta ? (ruta === currentPath || ruta === selectedKey) : false;
    const containsActive = hasChildren && it.children
      ? hasActiveChild(it.children, currentPath)
      : false;

    const label = tt(it.tag, it.opcion || it.tag);

    const btn = (
      <ItemBtn
        key={`${item.tag}-${index}`}
        dense
        isactive={isActive ? 1 : 0}
        collapsed={collapsed ? 1 : 0}
        onClick={() => {
          if (isFlat && isSearching) {
            handleSearchSelect(item as FlatMenuItem);
          } else {
            handleItemClick(item as Acceso);
          }
        }}
        sx={containsActive && !isActive
          ? { background: 'rgba(37,99,235,0.06)' }
          : undefined}
      >
        <ItemIconWrap itemcolor={it.color}>
          {it.icono ? <it.icono sx={{ fontSize: '0.9rem' }} /> : <NavigateNextIcon sx={{ fontSize: '0.9rem' }} />}
        </ItemIconWrap>

        <Box sx={{ flex: 1, minWidth: 0, opacity: collapsed ? 0 : 1, transition: TRANSITION, ml: 1.5, display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={(theme) => ({
                  fontSize: '0.79rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                  fontFamily: "'DM Sans', 'Inter', sans-serif",
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                })}
              >
            {label}
          </Typography>
          {isFlat && it.parents && it.parents.length > 0 && (
                <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', mt: -0.25 }}>
              {it.parents.join(' > ')}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', opacity: collapsed ? 0 : 1, transition: TRANSITION }}>
          {isActive && <ActiveDot />}
          {hasChildren && !isActive && (
                <KeyboardArrowRightIcon sx={{ fontSize: '0.75rem', color: 'text.secondary' }} />
          )}
        </Box>
      </ItemBtn>
    );

    return collapsed
      ? <Tooltip key={`${item.tag}-${index}`} title={label} placement="right" arrow>{btn}</Tooltip>
      : btn;
  };

  // ── root: agrupadores with accordion ────────────────────────────────────

  const renderRoot = () => agrupadores.map((grupo, gi) => {
    const key        = grupo.tag || grupo.opcion;
    const isExpanded = expandedSections[key] ?? false;
    const isActiveG  = key === activeGroupKey;

    const sectionHeader = (
      <SectionBtn
        key={`sec-${gi}`}
        dense
        collapsed={collapsed ? 1 : 0}
        onClick={() => toggleSection(key)}
      >
        {grupo.icono && (
          <grupo.icono
            sx={(theme) => ({
              fontSize: '0.95rem',
              color: grupo.color ?? theme.palette.text.secondary,
              flexShrink: 0,
            })}
          />
        )}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', opacity: collapsed ? 0 : 1, transition: TRANSITION, ml: 1.5 }}>
          <SectionLabel
            sx={isActiveG ? { color: '#60a5fa', fontWeight: 800 } : {}}
          >
            {tt(grupo.tag, grupo.opcion)}
          </SectionLabel>
          {isActiveG && (
            <ActiveDot sx={{ mr: 0.5 }} />
          )}
          <SectionChevron open={isExpanded ? 1 : 0} />
        </Box>
      </SectionBtn>
    );

    return (
      <React.Fragment key={`group-${gi}`}>
        {gi > 0 && (
          <Divider sx={{ mx: 1.5, my: 0.5, borderColor: 'divider' }} />
        )}
        {collapsed
          ? (
            <Tooltip title={tt(grupo.tag, grupo.opcion)} placement="right" arrow>
              {sectionHeader}
            </Tooltip>
          )
          : sectionHeader
        }
        {!collapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            {grupo.categorias.map((cat, ci) => renderItem(cat, ci))}
          </Collapse>
        )}
      </React.Fragment>
    );
  });

  // ── render ───────────────────────────────────────────────────────────────

  return (
    <>
      <SidebarShell collapsed={collapsed ? 1 : 0} data-testid="sidebar-menu">

      {/* Profile header: avatar + name (top of sidebar) */}
      <ProfileWrap>
        {collapsed ? (
          <Tooltip title={displayUserName} placement="right" arrow>
            <Avatar>{displayUserInitials}</Avatar>
          </Tooltip>
        ) : (
          <>
            <Avatar>{displayUserInitials}</Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.primary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayUserName}</Typography>
              <Typography sx={{ fontSize: '0.66rem', color: 'text.secondary' }}>{displayUserRole}</Typography>
            </Box>
          </>
        )}
      </ProfileWrap>

      {/* collapse toggle removed — TopBar controls open/close */}

      {/* Search */}
      <Collapse in={!collapsed} timeout={250} unmountOnExit>
        <Box sx={{ px: 1.25, pt: 1.25, pb: 0.75, width: EXPANDED_W }}>
          <MenuSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            isSearching={isSearching}
            clearSearch={clearSearch}
            onSelectResult={handleSearchSelect}
            variant="sidebar"
          />
        </Box>
      </Collapse>

      {/* Breadcrumbs (sub-level nav) */}
      <Collapse in={!isRoot && !collapsed} timeout={250} unmountOnExit>
        <Box sx={{ width: EXPANDED_W }}>{renderBreadcrumbs()}</Box>
      </Collapse>

      {/* Nav list */}
      <List
        component="nav"
        dense
        disablePadding
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          py: 0.75,
          '&::-webkit-scrollbar': { width: 3 },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(15,23,42,0.12)',
            borderRadius: 2,
          },
        }}
      >
        {searchQuery && searchQuery.trim() ? (
          filteredItems.length > 0 ? (
            filteredItems.map((item, i) => renderItem(item, i))
          ) : (
            <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary', fontSize: '0.8rem' }}>No se encontraron resultados</Typography>
          )
        ) : isSearching ? (
          searchResults.length > 0 ? (
            searchResults.map((item, i) => renderItem(item, i))
          ) : (
            <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary', fontSize: '0.8rem' }}>No se encontraron resultados</Typography>
          )
        ) : isRoot ? (
      <>
        {renderItem({
          ruta: '/dashboard',
          tag: 'Inicio',
          opcion: 'Inicio',
          icono: HomeIcon,
        } as any, -1)}
        {agrupadores.length > 0 && <Divider sx={{ mx: 1.5, my: 1, borderColor: 'divider' }} />}
        {renderRoot()}
      </>
        ) : (
          currentItems.map((item, i) => renderItem(item, i))
        )}
      </List>

      {/* Footer logout */}
      <Box sx={{ mt: 'auto', p: 1.5, borderTop: (t) => `1px solid ${t.palette.divider}`, display: 'flex', flexDirection: 'column', gap: 1 }}>
        
        <Tooltip title={collapsed ? (darkMode ? "Modo claro" : "Modo oscuro") : ""} placement="right" arrow disableHoverListener={!collapsed}>
          <ListItemButton
            onClick={toggleDarkMode}
            sx={{
              borderRadius: 2,
              color: 'text.secondary',
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 0 : 1.5,
              py: 1,
              transition: TRANSITION,
              '&:hover': { bgcolor: 'action.hover', color: 'primary.main' }
            }}
          >
            {darkMode ? <DarkModeRoundedIcon sx={{ fontSize: '1.2rem', mr: collapsed ? 0 : 1.5 }} /> : <LightModeRoundedIcon sx={{ fontSize: '1.2rem', mr: collapsed ? 0 : 1.5 }} />}
            {!collapsed && (
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: "'DM Sans', 'Inter', sans-serif", flex: 1 }}>
                Modo oscuro
              </Typography>
            )}
            {!collapsed && <Switch size="small" checked={darkMode} sx={{ ml: 'auto' }} />}
          </ListItemButton>
        </Tooltip>

        <Tooltip title={collapsed ? "Cerrar sesión" : ""} placement="right" arrow disableHoverListener={!collapsed}>
          <ListItemButton
            onClick={() => { logout(); navigate('/'); }}
            sx={{
              borderRadius: 2,
              color: '#ef4444',
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 0 : 1.5,
              py: 1,
              transition: TRANSITION,
              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.08)' }
            }}
          >
            <LogoutIcon sx={{ fontSize: '1.2rem', mr: collapsed ? 0 : 1.5 }} />
            {!collapsed && (
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
                Cerrar sesión
              </Typography>
            )}
          </ListItemButton>
        </Tooltip>
      </Box>

    </SidebarShell>
    </>
  );
});

SidebarMenu.displayName = 'SidebarMenu';
export default SidebarMenu;