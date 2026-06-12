import React from 'react';
import { TextField, TextFieldProps, styled } from '@mui/material';

const StyledTextField = styled((props: TextFieldProps) => (
  <TextField variant="outlined" fullWidth {...props} />
))(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease',
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    '& fieldset': {
      borderColor: 'rgba(15, 23, 42, 0.08)',
      borderWidth: '1px',
      transition: 'all 0.2s ease',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(15, 23, 42, 0.15)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#38bdf8',
      borderWidth: '1px',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.15)',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    color: '#64748b',
    fontSize: '0.95rem',
    '&.Mui-focused': {
      color: '#38bdf8',
      fontWeight: 600,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px 16px',
    color: '#0f172a',
    fontSize: '0.95rem',
    '&::placeholder': {
      color: '#94a3b8',
      opacity: 1,
    },
  },
}));

export default StyledTextField;