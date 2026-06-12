import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import BuildIcon from '@mui/icons-material/Build';


const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
`;


const UnderConstruction: React.FC<{ title?: string }> = ({ 
  title = 'Sección en construcción' 
}) => {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        textAlign: 'center',
      }}
    >
      {/* Icon animado */}
      <BuildIcon
        sx={{
          fontSize: 64,
          color: 'primary.main',
          mb: 2,
          animation: `${float} 2s ease-in-out infinite`,
        }}
      />
      
      {/* Título */}
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 1,
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
      
      {/* Mensaje */}
      <Typography 
        color="text.secondary"
        sx={{ 
          fontSize: '1rem',
          maxWidth: 400,
        }}
      >
        Esta sección aún no está implementada. Vuelve más tarde.
      </Typography>
    </Box>
  );
};


export default UnderConstruction;