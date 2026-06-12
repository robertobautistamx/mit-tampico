import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0);     }
`;

type LoginHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

const LoginHeader: React.FC<LoginHeaderProps> = ({
  eyebrow = 'MIT TAMPICO',
  title,
  description,
}) => (
  <Box
    sx={{
      mb: 3.5,
      animation: `${slideIn} 0.5s ease both`,
    }}
  >
    {/* eyebrow */}
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        mb: 1.5,
      }}
    >
      {/* accent dot */}
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #38bdf8, #2563eb)',
          boxShadow: '0 0 8px rgba(56,189,248,0.7)',
        }}
      />
      <Typography
        component="span"
        sx={{
          fontFamily: "'DM Sans', 'Inter', sans-serif",
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {eyebrow}
      </Typography>
    </Box>

    {/* title */}
    <Typography
      variant="h4"
      sx={{
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        fontWeight: 700,
        fontSize: { xs: '1.625rem', sm: '1.875rem' },
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        color: 'rgba(241, 245, 249, 0.97)',
        mb: 0.75,
      }}
    >
      {title}
    </Typography>

    {/* description */}
    <Typography
      sx={{
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        fontSize: '0.9rem',
        color: 'rgba(148, 163, 184, 0.85)',
        lineHeight: 1.6,
      }}
    >
      {description}
    </Typography>
  </Box>
);

export default LoginHeader;