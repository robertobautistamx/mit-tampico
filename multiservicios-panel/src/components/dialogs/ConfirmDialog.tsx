import React from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box,
  IconButton,
  DialogActions,
} from '@mui/material';
import { keyframes } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  danger?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md';
};

const dangerPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.28); transform: scale(1); }
  50% { box-shadow: 0 0 0 16px rgba(239, 68, 68, 0); transform: scale(1.05); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); transform: scale(1); }
`;

const warningPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.28); transform: scale(1); }
  50% { box-shadow: 0 0 0 16px rgba(245, 158, 11, 0); transform: scale(1.05); }
  100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); transform: scale(1); }
`;

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  loading = false,
  danger = false,
  maxWidth = 'sm',
}) => {
  const accent = danger ? '#dc2626' : '#f59e0b';
  const softBg = danger ? 'rgba(239, 68, 68, 0.10)' : 'rgba(245, 158, 11, 0.10)';
  const pulse = danger ? dangerPulse : warningPulse;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth={maxWidth}
      role="alertdialog"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '24px',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.18)',
          overflow: 'hidden',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
    >
      <IconButton
        size="small"
        onClick={onClose}
        disabled={loading}
        sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          color: '#94a3b8',
          '&:hover': { backgroundColor: '#f1f5f9', color: '#0f172a' },
        }}
        aria-label="Cerrar"
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>

      <DialogContent
        sx={{
          px: { xs: 3, sm: 4 },
          pt: { xs: 4, sm: 5 },
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            bgcolor: softBg,
            color: accent,
            animation: `${pulse} 2s infinite ease-in-out`,
          }}
        >
          <WarningAmberRoundedIcon sx={{ fontSize: 38 }} />
        </Box>

        <Box>
          <Typography
            id="confirm-dialog-title"
            variant="h6"
            sx={{
              fontWeight: 800,
              color: '#0f172a',
              mb: 1,
              fontFamily: "'DM Sans', 'Inter', sans-serif",
              lineHeight: 1.15,
            }}
          >
            {title}
          </Typography>
          <Typography
            id="confirm-dialog-description"
            sx={{
              color: '#64748b',
              fontSize: '0.96rem',
              lineHeight: 1.6,
              fontFamily: "'DM Sans', 'Inter', sans-serif",
              maxWidth: 360,
              mx: 'auto',
            }}
          >
            {description}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 3, sm: 4 },
          py: 3,
          justifyContent: 'center',
          gap: 1.5,
          borderTop: '1px solid #e2e8f0',
          bgcolor: '#f8fafc',
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            color: '#dc2626',
            borderColor: '#fca5a5',
            borderRadius: '12px',
            px: 2.5,
            minWidth: 120,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#fef2f2',
              borderColor: '#dc2626',
              boxShadow: 'none',
            },
            '&:disabled': {
              borderColor: '#e2e8f0',
              color: '#cbd5e1',
              backgroundColor: '#f8fafc',
            },
          }}
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            color: '#fff',
            bgcolor: danger ? '#dc2626' : '#2563eb',
            borderRadius: '12px',
            px: 2.5,
            minWidth: 120,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: danger ? '#b91c1c' : '#1d4ed8',
              boxShadow: 'none',
            },
            '&:disabled': {
              bgcolor: danger ? '#fca5a5' : '#93c5fd',
              color: '#fff',
            },
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;