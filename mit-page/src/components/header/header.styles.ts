import React from 'react';

export const theme = {
  bg: '#0F172A', // Slate 900 - Azul/Gris corporativo, elegante y formal
  primary: '#3B82F6', // Azul profesional para elementos clave
  secondary: '#F97316', // Naranja sutil, mucho menos agresivo
  accent: '#E11D48', // Rojo elegante para acentos mínimos
  textLight: '#F8FAFC',
  textMuted: '#94A3B8',
  iconBg: 'rgba(255, 255, 255, 0.05)',
  fontFamily: "'Inter', sans-serif",
};

export const getStyles = (isScrolled: boolean, isMobile: boolean, hoveredItem: string | null, isMenuOpen: boolean, activeItem: string) => ({
  header: {
    position: 'fixed',
    top: isScrolled && !(isMobile && isMenuOpen) ? '1rem' : '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: isScrolled && !(isMobile && isMenuOpen) ? 'calc(100% - 2rem)' : '100%',
    maxWidth: isScrolled && !(isMobile && isMenuOpen) ? '1200px' : '100%',
    borderRadius: isScrolled && !(isMobile && isMenuOpen) ? '16px' : '0px',
    zIndex: 1000,
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    backgroundColor: isScrolled 
      ? 'rgba(15, 23, 42, 0.75)' 
      : (isMobile && isMenuOpen ? 'rgba(15, 23, 42, 0.98)' : 'transparent'),
    backdropFilter: isScrolled || (isMobile && isMenuOpen) ? 'blur(16px)' : 'none',
    border: isScrolled && !(isMobile && isMenuOpen) ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
    boxShadow: isScrolled && !(isMobile && isMenuOpen) ? '0 10px 30px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.05)' : 'none',
    fontFamily: theme.fontFamily,
  } as React.CSSProperties,
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: isScrolled 
      ? (isMobile ? '0.75rem 1.5rem' : '0.75rem 2rem') 
      : (isMobile ? '1.25rem 1.5rem' : '1.25rem 2rem'),
    transition: 'padding 0.4s ease',
  } as React.CSSProperties,
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    position: 'relative',
    zIndex: 1001,
  } as React.CSSProperties,
  logoText: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: theme.textLight,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontFamily: theme.fontFamily,
  } as React.CSSProperties,
  navWrapper: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    position: isMobile ? 'fixed' : 'static',
    top: 0,
    right: 0,
    width: isMobile ? '100%' : 'auto',
    height: isMobile ? '100vh' : 'auto',
    backgroundColor: isMobile ? 'rgba(15, 23, 42, 0.98)' : 'transparent',
    backdropFilter: isMobile ? 'blur(20px)' : 'none',
    padding: isMobile ? '8rem 2rem 4rem' : 0,
    boxSizing: 'border-box',
    overflowY: isMobile ? 'auto' : 'visible',
    gap: isMobile ? '3rem' : '2rem',
    alignItems: 'center',
    justifyContent: isMobile ? 'flex-start' : 'center',
    transition: 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
    boxShadow: isMobile && isMenuOpen ? '-20px 0 50px rgba(0,0,0,0.5)' : 'none',
    transform: isMobile ? (isMenuOpen ? 'translateX(0)' : 'translateX(100%)') : 'none',
    opacity: isMobile ? (isMenuOpen ? 1 : 0) : 1,
    pointerEvents: isMobile ? (isMenuOpen ? 'auto' : 'none') : 'auto',
  } as React.CSSProperties,
  navCenter: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '2rem' : '1.5rem', // Reducimos un poco el espacio central para dar respiro a las utilidades
    width: isMobile ? '100%' : 'auto',
  } as React.CSSProperties,
  navLink: (item: string): React.CSSProperties => {
    const isActive = activeItem === item;
    const isHovered = hoveredItem === item;
    return {
      textDecoration: 'none',
      color: isActive || isHovered ? theme.primary : theme.textLight,
      fontWeight: isMobile ? 600 : (isActive ? 700 : 500), // Se hace un poco más grueso si está activo
      fontSize: isMobile ? '1.25rem' : '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: isMobile ? '0.5rem' : 0,
      transform: isHovered && isMobile ? 'translateX(5px)' : 'translateX(0)',
      outline: 'none',
      WebkitTapHighlightColor: 'transparent',
    };
  },
  dropdown: (isOpen: boolean): React.CSSProperties => ({
    position: isMobile ? 'static' : 'absolute',
    top: '100%',
    left: isMobile ? '1rem' : '-1rem',
    backgroundColor: isMobile ? 'transparent' : '#FFFFFF',
    backgroundClip: isMobile ? 'border-box' : 'padding-box',
    minWidth: '240px',
    boxShadow: isMobile ? 'none' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: isMobile ? '0.5rem 0' : '0.75rem 0',
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: isMobile ? '1rem' : '0.25rem',
    marginTop: isMobile ? '1rem' : '4px',
    border: isMobile ? 'none' : '1px solid rgba(15, 23, 42, 0.05)',
    zIndex: 1005,
  }),
  dropdownLink: {
    color: isMobile ? theme.textMuted : '#0F172A',
    textDecoration: 'none',
    padding: '0.5rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    display: 'block',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  rightSection: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '2rem' : '1.5rem', // Espacio entre el bloque de utilidades, redes y botón
    marginTop: isMobile ? 'auto' : 0, // Empuja las redes y botón abajo del menú móvil
    width: isMobile ? '100%' : 'auto',
  } as React.CSSProperties,
  utilitiesContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '2rem' : '1.25rem',
    paddingRight: isMobile ? 0 : '1.5rem',
    borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.15)', // Línea divisoria en PC
  } as React.CSSProperties,
  utilityIcon: (item: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: hoveredItem === item ? theme.primary : theme.textLight,
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hoveredItem === item ? 'translateY(-2px)' : 'none', // Efecto salto
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  }),
  btnContact: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '0.8rem 2.5rem' : '0.5rem 1.25rem',
    background: hoveredItem === 'contacto' || activeItem === 'contacto' 
      ? 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)' 
      : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: isMobile ? '1rem' : '0.9rem',
    borderRadius: '8px', // A juego con los botones principales
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: hoveredItem === 'contacto' || activeItem === 'contacto' 
      ? '0 10px 20px -5px rgba(37, 99, 235, 0.4)' 
      : '0 4px 6px -1px rgba(37, 99, 235, 0.1)',
    transform: hoveredItem === 'contacto' || activeItem === 'contacto' ? 'translateY(-2px)' : 'none',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  } as React.CSSProperties,
  hamburger: {
    display: isMobile ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: isMenuOpen ? theme.primary : theme.textLight,
    cursor: 'pointer',
    padding: '0.5rem',
    zIndex: 1001,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  } as React.CSSProperties,
});