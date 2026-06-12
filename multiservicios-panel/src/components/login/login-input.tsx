import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';

const labelRise = keyframes`
  from { opacity: 0.78; transform: translate(14px, 14px) scale(1); }
  to   { opacity: 1;    transform: translate(14px, -9px) scale(0.78); }
`;

const StyledTextField = styled(TextField)(() => ({
  // ── label ──────────────────────────────────────────────────────────────────
  '& .MuiInputLabel-root': {
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    fontSize: '0.875rem',
    color: 'rgba(148, 163, 184, 0.75)',
    transformOrigin: 'top left',
    transition:
      'color 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#38bdf8',
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: '#f87171',
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
    animation: `${labelRise} 220ms cubic-bezier(0.22, 1, 0.36, 1) both`,
  },

  // ── input root ─────────────────────────────────────────────────────────────
  '& .MuiOutlinedInput-root': {
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    fontSize: '0.9375rem',
    borderRadius: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    backdropFilter: 'blur(8px)',
    transition: 'background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',

    // idle border
    '& fieldset': {
      borderWidth: '1px',
      borderColor: 'rgba(148, 163, 184, 0.14)',
      transition: 'border-color 180ms ease',
    },
    // hover
    '&:hover fieldset': {
      borderColor: 'rgba(56, 189, 248, 0.28)',
    },
    '&:hover .MuiInputAdornment-root svg': {
      color: 'rgba(148, 163, 184, 0.85)',
    },
    // hover bg tint
    '&:hover': {
      backgroundColor: 'rgba(15, 23, 42, 0.55)',
    },
    // focus
    '&.Mui-focused fieldset': {
      borderWidth: '1px',
      borderColor: 'rgba(56, 189, 248, 0.55)',
    },
    '&.Mui-focused .MuiInputAdornment-root svg': {
      color: '#38bdf8',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      transform: 'translateY(-1px)',
      boxShadow:
        '0 0 0 3px rgba(56, 189, 248, 0.10), inset 0 1px 0 rgba(255,255,255,0.04)',
    },
    // error
    '&.Mui-error fieldset': {
      borderColor: 'rgba(248, 113, 113, 0.5)',
    },
    '&.Mui-error': {
      boxShadow: '0 0 0 3px rgba(248, 113, 113, 0.10)',
    },
  },

  // ── input text ─────────────────────────────────────────────────────────────
  '& .MuiInputBase-input': {
    color: 'rgba(241, 245, 249, 0.95)',
    caretColor: '#38bdf8',
    backgroundClip: 'text',
    // kill browser autofill gray/yellow bg on the native input
    '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
      WebkitBoxShadow: '0 0 0 1000px rgba(15, 23, 42, 0.96) inset',
      WebkitTextFillColor: 'rgba(241, 245, 249, 0.95)',
      caretColor: '#38bdf8',
      borderRadius: 'inherit',
      transition: 'background-color 9999s ease-out 0s',
    },
  },

  // ── helper / error text ───────────────────────────────────────────────────
  '& .MuiFormHelperText-root': {
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    fontSize: '0.78rem',
    marginTop: 6,
    color: 'rgba(148, 163, 184, 0.65)',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: '#f87171',
  },

  // ── adornment icons ───────────────────────────────────────────────────────
  '& .MuiInputAdornment-root svg': {
    color: 'rgba(148, 163, 184, 0.5)',
    fontSize: '1.1rem',
    transition: 'color 180ms ease',
  },
}));

type LoginInputProps = Omit<TextFieldProps, 'variant' | 'size' | 'fullWidth'> & {
};

const LoginInput: React.FC<LoginInputProps> = (props) => (
  <StyledTextField fullWidth variant="outlined" size="medium" {...props} />
);

export default LoginInput;