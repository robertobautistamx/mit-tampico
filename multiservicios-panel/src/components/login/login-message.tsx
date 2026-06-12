import React, { useState, useEffect, useRef } from 'react';
import { AlertColor } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';

// ─── animations ───────────────────────────────────────────────────────────────

const enter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
    clip-path: inset(0 0 100% 0 round 12px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    clip-path: inset(0 0 0% 0 round 12px);
  }
`;

const exit = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
    clip-path: inset(0 0 0% 0 round 12px);
  }
  to {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
    clip-path: inset(0 0 100% 0 round 12px);
  }
`;

// ─── severity config ──────────────────────────────────────────────────────────

const SEVERITY_STYLES: Record<
  AlertColor,
  { bg: string; border: string; color: string; glow: string }
> = {
  error: {
    bg:     'rgba(239, 68, 68, 0.07)',
    border: 'rgba(239, 68, 68, 0.20)',
    color:  '#fca5a5',
    glow:   'rgba(239, 68, 68, 0.12)',
  },
  warning: {
    bg:     'rgba(251, 191, 36, 0.07)',
    border: 'rgba(251, 191, 36, 0.20)',
    color:  '#fcd34d',
    glow:   'rgba(251, 191, 36, 0.12)',
  },
  info: {
    bg:     'rgba(56, 189, 248, 0.07)',
    border: 'rgba(56, 189, 248, 0.20)',
    color:  '#7dd3fc',
    glow:   'rgba(56, 189, 248, 0.12)',
  },
  success: {
    bg:     'rgba(52, 211, 153, 0.07)',
    border: 'rgba(52, 211, 153, 0.20)',
    color:  '#6ee7b7',
    glow:   'rgba(52, 211, 153, 0.12)',
  },
};

// ─── inline SVG icons (16 px, stroke-only) ───────────────────────────────────

const ICONS: Record<AlertColor, React.ReactNode> = {
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11" r=".75" fill="currentColor"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.5L14 13.5H2L8 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11" r=".75" fill="currentColor"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 7.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="5.25" r=".75" fill="currentColor"/>
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5.5 8.5l2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// ─── styled wrapper ───────────────────────────────────────────────────────────

const Wrapper = styled('div')<{
  bg: string;
  border: string;
  glow: string;
  isExiting: boolean;
}>(({ bg, border, glow, isExiting }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  padding: '11px 14px',
  marginBottom: 16,
  borderRadius: 12,
  background: bg,
  border: `1px solid ${border}`,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: `0 2px 12px ${glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
  animation: `${isExiting ? exit : enter} 0.28s cubic-bezier(0.22, 1, 0.36, 1) both`,
  willChange: 'opacity, transform, clip-path',
}));

const IconWrap = styled('div')<{ color: string }>(({ color }) => ({
  color,
  flexShrink: 0,
  marginTop: 1,
  display: 'flex',
  alignItems: 'center',
}));

const Message = styled('span')<{ color: string }>(({ color }) => ({
  flex: 1,
  fontFamily: "'DM Sans', 'Inter', sans-serif",
  fontSize: '0.84rem',
  lineHeight: 1.5,
  color,
}));

const DismissBtn = styled('button')<{ color: string }>(({ color }) => ({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  background: 'none',
  border: 'none',
  borderRadius: 4,
  color: `${color}99`,
  cursor: 'pointer',
  padding: 0,
  transition: 'color 150ms ease, background 150ms ease',
  '&:hover': {
    color,
    background: `${color}18`,
  },
  '&:focus-visible': {
    outline: `2px solid ${color}55`,
    outlineOffset: 1,
  },
}));

// ─── component ────────────────────────────────────────────────────────────────

type LoginMessageProps = {
  message?: string;
  severity?: AlertColor;
  /** Called after the dismiss animation completes */
  onDismiss?: () => void;
};

const LoginMessage: React.FC<LoginMessageProps> = ({
  message,
  severity = 'error',
  onDismiss,
}) => {
  const [visible,   setVisible]   = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const prevMessage               = useRef<string | undefined>(undefined);
  const exitTimer                 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (message && message !== prevMessage.current) {
      setIsExiting(false);
      setVisible(true);
      prevMessage.current = message;
    }
    if (!message) {
      setVisible(false);
    }
  }, [message]);

  const handleDismiss = () => {
    setIsExiting(true);
    exitTimer.current = setTimeout(() => {
      setVisible(false);
      setIsExiting(false);
      onDismiss?.();
    }, 260);
  };

  useEffect(() => () => {
    if (exitTimer.current) clearTimeout(exitTimer.current);
  }, []);

  if (!visible || !message) return null;

  const s = SEVERITY_STYLES[severity];

  return (
    <Wrapper
      role="alert"
      aria-live="assertive"
      bg={s.bg}
      border={s.border}
      glow={s.glow}
      isExiting={isExiting}
    >
      <IconWrap color={s.color}>{ICONS[severity]}</IconWrap>

      <Message color={s.color}>{message}</Message>

      <DismissBtn
        color={s.color}
        onClick={handleDismiss}
        aria-label="Cerrar mensaje"
        type="button"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2 2l8 8M10 2l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </DismissBtn>
    </Wrapper>
  );
};

export default LoginMessage;