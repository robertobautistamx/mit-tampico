import React from 'react';
import { CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// ─── shimmer sweep ────────────────────────────────────────────────────────────

const shimmer = keyframes`
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
  50%       { box-shadow: 0 0 0 8px rgba(56, 189, 248, 0.12); }
`;

// ─── styled root ──────────────────────────────────────────────────────────────

const Root = styled('button')(({ disabled }: { disabled?: boolean }) => ({
  position: 'relative',
  width: '100%',
  minHeight: 52,
  borderRadius: 999,
  border: 0,
  padding: 0,
  appearance: 'none',
  font: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  cursor: disabled ? 'not-allowed' : 'pointer',
  outline: 'none',

  // gradient fill
  background: disabled
    ? 'rgba(148, 163, 184, 0.12)'
    : 'linear-gradient(110deg, #1e40af 0%, #2563eb 40%, #38bdf8 100%)',

  // outer glow
  boxShadow: disabled
    ? 'none'
    : '0 0 0 1px rgba(56,189,248,0.25), 0 8px 32px rgba(37,99,235,0.35)',

  transition: 'box-shadow 200ms ease, transform 120ms ease, opacity 200ms ease',
  animation: disabled ? 'none' : `${pulse} 3s ease-in-out infinite`,

  '&:hover': {
    boxShadow: disabled
      ? 'none'
      : '0 0 0 1px rgba(56,189,248,0.4), 0 12px 40px rgba(37,99,235,0.45)',
    transform: disabled ? 'none' : 'translateY(-1px)',
  },
  '&:active': {
    transform: 'scale(0.985)',
    boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
  },

  // shimmer pseudo-element via a child span (can't do ::after on ButtonBase reliably)
}));

const Shimmer = styled('span')({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  borderRadius: 'inherit',
  pointerEvents: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
    animation: `${shimmer} 2.8s ease-in-out infinite`,
  },
});

const Label = styled('span')({
  position: 'relative',
  zIndex: 1,
  fontFamily: "'DM Sans', 'Inter', sans-serif",
  fontSize: '0.9375rem',
  fontWeight: 600,
  letterSpacing: '0.03em',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  padding: '0 24px',
});

// ─── component ────────────────────────────────────────────────────────────────

type LoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const LoginButton: React.FC<LoginButtonProps> = ({
  loading = false,
  disabled,
  children,
  type,
  onClick,
}) => {
  const isDisabled = disabled || loading;

  return (
    <Root
      disabled={isDisabled}
      type={type}
      onClick={onClick}
    >
      {!isDisabled && <Shimmer aria-hidden="true" />}
      <Label>
        {loading ? (
          <>
            <CircularProgress
              size={17}
              thickness={5}
              sx={{ color: 'rgba(255,255,255,0.85)' }}
            />
            <span>Cargando…</span>
          </>
        ) : (
          children
        )}
      </Label>
    </Root>
  );
};

export default LoginButton;