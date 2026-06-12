import React, { createContext, useContext, useMemo, useState, useEffect, FC } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { deepmerge } from '@mui/utils';

type ColorMode = 'light' | 'dark';

interface ColorModeContextValue {
  mode: ColorMode;
  toggleColorMode: () => void;
  setMode: (m: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

const STORAGE_KEY = 'ms_panel_color_mode';

const baseLight = {
  palette: {
    mode: 'light',
    background: { default: '#f7fafc', paper: '#ffffff' },
    primary: { main: '#2563eb' },
  },
};

const baseDark = {
  palette: {
    mode: 'dark',
    background: { default: '#071024', paper: '#071024' },
    primary: { main: '#60a5fa' },
  },
};

export const AppThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ColorMode>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ColorMode | null;
      if (saved === 'dark' || saved === 'light') {
        setModeState(saved);
        return;
      }
    } catch {}
    // fallback to prefers-color-scheme
    try {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setModeState(prefersDark ? 'dark' : 'light');
    } catch {
      setModeState('light');
    }
  }, []);

  const setMode = (m: ColorMode) => {
    setModeState(m);
    try { localStorage.setItem(STORAGE_KEY, m); } catch {}
  };

  const toggleColorMode = () => setMode(mode === 'dark' ? 'light' : 'dark');

  const theme = useMemo(() => {
    const base = mode === 'dark' ? baseDark : baseLight;
    const merged = deepmerge({}, base);
    (merged as any).typography = { fontFamily: 'ymira, Inter, sans-serif' };
    return createTheme(merged as any);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode, setMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const ctx = useContext(ColorModeContext);
  if (!ctx) throw new Error('useColorMode must be used within AppThemeProvider');
  return ctx;
};

export default AppThemeProvider;
