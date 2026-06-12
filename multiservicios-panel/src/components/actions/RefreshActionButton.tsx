import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface RefreshActionButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick: () => void;
  loading?: boolean;
  label?: string;
  loadingLabel?: string;
}

const RefreshActionButton: React.FC<RefreshActionButtonProps> = ({
  onClick,
  loading = false,
  label = 'Actualizar',
  loadingLabel = 'Actualizando...',
  ...props
}) => {
  return (
    <Button
      variant="contained"
      startIcon={
        <RefreshIcon
          sx={{
            animation: loading ? 'spin 1s linear infinite' : 'none',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            }
          }}
        />
      }
      onClick={onClick}
      disabled={loading}
      {...props}
      sx={{
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: 2,
        boxShadow: 'none',
        px: 3,
        py: 1,
        bgcolor: '#10b981', // Verde Esmeralda
        color: '#fff',
        '&:hover': { bgcolor: '#059669', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' },
        '&:disabled': { bgcolor: '#6ee7b7', color: '#ffffff' },
        ...props.sx,
      }}
    >
      {loading ? loadingLabel : label}
    </Button>
  );
};

export default RefreshActionButton;