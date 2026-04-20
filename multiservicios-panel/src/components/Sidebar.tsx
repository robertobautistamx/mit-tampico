import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../modules/login/login";
import { useSidebar } from "./SidebarContext";

const collapsedWidth = 64;
const expandedWidth = 200;

const sidebarStyle = (collapsed: boolean): React.CSSProperties => ({
  width: collapsed ? collapsedWidth : expandedWidth,
  minWidth: collapsed ? collapsedWidth : expandedWidth,
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  color: "#111827",
  background: "#ffffff",
  borderRight: "1px solid #e6eaf0",
  transition: "width 180ms ease",
  zIndex: 100,
  overflow: "hidden",
  fontFamily: "Arial, sans-serif",
});

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "18px 14px",
  borderBottom: "1px solid #eef2f6",
};

const brandStyle: React.CSSProperties = { display: "flex", gap: 12, alignItems: "center" };
const brandNameStyle: React.CSSProperties = { fontWeight: 700, fontSize: 15, color: "#0f172a", fontFamily: 'Arial, sans-serif' };

const navListStyle: React.CSSProperties = { marginTop: 8, display: "flex", flexDirection: "column", gap: 6, padding: "8px 6px" };

const linkBase = (collapsed: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: collapsed ? "10px 10px" : "10px 14px",
  color: "#475569",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: 0.2,
  borderRadius: 8,
  position: "relative",
  margin: "0 6px",
  transition: "background 160ms, color 160ms, transform 160ms",
});

const indicatorStyle = (active: boolean): React.CSSProperties => ({
  position: "absolute",
  left: 8,
  top: "50%",
  transform: "translateY(-50%)",
  width: 4,
  height: 28,
  borderRadius: 4,
  background: active ? "#2563eb" : "transparent",
  boxShadow: active ? "0 6px 12px rgba(37,99,235,0.08)" : "none",
});

const Icon = ({ children, size = 18 }: { children: React.ReactNode; size?: number }) => (
  <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", color: '#6b7280' }}>{children}</div>
);

const IconDashboard = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "currentColor" }}>
    <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconProductos = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "currentColor" }}>
    <path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12h.01M16 12h.01" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCategorias = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "currentColor" }}>
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { collapsed, toggle } = useSidebar();
  const { user, logout } = useLogin();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [tooltip, setTooltip] = useState<{ top: number; left: number; label: string } | null>(null);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  const links = [
    { to: "/", label: "Dashboard", Icon: IconDashboard },
    { to: "/productos", label: "Productos", Icon: IconProductos },
    { to: "/categorias", label: "Categorías", Icon: IconCategorias },
  ];

  return (
    <nav ref={sidebarRef as any} style={sidebarStyle(collapsed)} aria-label="Sidebar">
      <div style={headerStyle}>
        <div style={brandStyle}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7dd3fc, #0369a1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(3,105,161,0.14)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12h16" stroke="#04263a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          {!collapsed && <div style={brandNameStyle}>Panel Admin</div>}
        </div>

        <button aria-label={collapsed ? "Expandir menú" : "Colapsar menú"} title={collapsed ? "Expandir" : "Colapsar"} onClick={() => toggle()} style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#9fb7d9", cursor: "pointer" }}>
          {collapsed ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5l7 7-7 7" stroke="#9fb7d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 5l-7 7 7 7" stroke="#9fb7d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </button>
      </div>

      <div style={navListStyle}>
        {links.map(({ to, label, Icon }) => {
          const active = isActive(to);
          const isHovered = hovered === to;
          const color = active ? "#0f172a" : isHovered ? "#0f172a" : "#6b7280";
          return (
            <Link
              key={to}
              ref={(el: HTMLAnchorElement | null) => { linkRefs.current[to] = el; }}
              to={to}
              onMouseEnter={() => {
                setHovered(to);
                const el = linkRefs.current[to];
                if (el && collapsed) {
                  const r = el.getBoundingClientRect();
                  setTooltip({ top: r.top + r.height / 2, left: r.right + 12, label });
                }
              }}
              onMouseLeave={() => {
                setHovered(null);
                setTooltip(null);
              }}
              onFocus={() => setHovered(to)}
              onBlur={() => setHovered(null)}
              title={collapsed ? label : undefined}
              style={{ ...(linkBase(collapsed) as React.CSSProperties), background: active ? "#eef2ff" : isHovered ? "#f8fafc" : "transparent", color, transform: isHovered ? 'translateX(6px)' : 'none', outline: 'none' }}
            >
              <div style={{ ...indicatorStyle(active), visibility: collapsed ? 'hidden' : 'visible' }} />
              <div style={{ transition: 'transform 140ms', display: 'flex', alignItems: 'center' }}>
                <Icon />
              </div>
              {!collapsed && <span style={{ marginLeft: 6 }}>{label}</span>}
            </Link>
          );
        })}

        {collapsed && tooltip && (
          <div style={{ position: 'fixed', left: tooltip.left, top: tooltip.top - 18, transform: 'translateY(-50%)', background: '#111827', color: '#fff', padding: '8px 12px', borderRadius: 8, boxShadow: '0 12px 32px rgba(2,6,23,0.12)', whiteSpace: 'nowrap', fontSize: 13, zIndex: 200 }}>
            {tooltip.label}
          </div>
        )}
      </div>

      <div style={{ marginTop: 'auto', padding: 12, borderTop: '1px solid #eef2f6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 6px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', border: '1px solid #eef2f6' }}>
            {user ? user.nombre.charAt(0).toUpperCase() : 'U'}
          </div>
          {!collapsed && (
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{user ? user.nombre : 'Usuario'}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{user ? user.email : ''}</div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          style={{
            width: '100%',
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            background: '#fff',
            border: '1px solid #e6eaf0',
            color: '#0f172a',
            borderRadius: 8,
            cursor: 'pointer'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17l5-5-5-5" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {!collapsed && <span style={{ fontWeight: 700 }}>Cerrar sesión</span>}
        </button>
      </div>
    </nav>
  );
};
