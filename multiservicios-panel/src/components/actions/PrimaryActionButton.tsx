import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface PrimaryActionButtonProps extends ButtonProps {
  label: string;
  icon?: React.ReactNode;
}

const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({ 
  label, 
  icon = <AddIcon />, 
  ...props 
}) => {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      {...props}
      sx={{
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: 2,
        boxShadow: 'none',
        px: 3,
        py: 1,
        '&:hover': { boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' },
        ...props.sx,
      }}
    >
      {label}
    </Button>
  );
};

export default PrimaryActionButton;