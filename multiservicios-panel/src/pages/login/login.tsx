import React, { useState } from 'react';
import { Box, InputAdornment, IconButton, Link } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Background from '../../components/background/background';
import LoginButton from '../../components/login/login-button';
import LoginHeader from '../../components/login/login-header';
import LoginInput from '../../components/login/login-input';
import LoginMessage from '../../components/login/login-message';
import { useLogin } from '../../modules/login/login';

// ─── animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;

// ─── card ─────────────────────────────────────────────────────────────────────

const Card = styled('div')({
  position: 'relative',
  textAlign: 'center',
  width: '100%',
  maxWidth: 420,
  borderRadius: 24,
  padding: '36px 40px 40px',

  // glass surface
  background: 'linear-gradient(180deg, rgba(14, 22, 46, 0.94) 0%, rgba(10, 16, 35, 0.88) 100%)',
  backdropFilter: 'blur(20px) saturate(145%)',
  WebkitBackdropFilter: 'blur(20px) saturate(145%)',

  // layered borders: outer glow + inner edge highlight
  border: '1px solid rgba(96, 165, 250, 0.22)',
  boxShadow: `
    0 0 0 1px rgba(255, 255, 255, 0.06) inset,
    0 28px 70px rgba(0, 0, 0, 0.62),
    0 10px 36px rgba(37, 99, 235, 0.18)
  `,

  animation: `${fadeUp} 0.55s cubic-bezier(0.22, 1, 0.36, 1) both`,

  // top edge shimmer line
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '15%',
    right: '15%',
    height: '1px',
    background:
      'linear-gradient(90deg, transparent, rgba(56,189,248,0.45), rgba(129,140,248,0.35), transparent)',
    borderRadius: '0 0 999px 999px',
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 12%, rgba(255,255,255,0.00) 36%, rgba(4,10,24,0.12) 100%)',
  },

  '@media (max-width: 480px)': {
    padding: '28px 24px 32px',
    borderRadius: 20,
  },
});

// ─── page ─────────────────────────────────────────────────────────────────────

const LoginPage: React.FC = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = (location.state as any)?.from?.pathname || '/dashboard';
  const { login, loading, error } = useLogin();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result) navigate(from, { replace: true });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 2,
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* animated particle background */}
      <Background />

      {/* glass card */}
      <Card>
        <LoginHeader
          title="Bienvenido"
          description="Accede con tu correo y contraseña."
        />

        <LoginMessage message={error ?? undefined} />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          noValidate
        >
          <LoginInput
            label="Correo electrónico"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <LoginInput
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              slotProps={{
                input: {
                  endAdornment: password ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'ocultar contraseña' : 'mostrar contraseña'}
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disableRipple
                        sx={{
                          color: 'rgba(226, 232, 240, 0.96)',
                          mr: 0.25,
                          p: 0.35,
                          borderRadius: '10px',
                          '&:hover': {
                            color: '#ffffff',
                            background: 'rgba(255,255,255,0.08)',
                          },
                        }}
                      >
                        {showPassword ? (
                          <svg width="1.05em" height="1.05em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="1.05em" height="1.05em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                href="#"
                underline="hover"
                sx={{
                  fontFamily: "'DM Sans', 'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  color: 'rgba(148, 163, 184, 0.8)',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#38bdf8' },
                }}
                onClick={(e) => e.preventDefault()}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </Box>

          <LoginButton type="submit" loading={loading}>
            Entrar
          </LoginButton>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;