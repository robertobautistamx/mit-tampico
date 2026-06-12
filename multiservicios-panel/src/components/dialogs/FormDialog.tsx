import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ActionButtons from '../actions/ActionButtons ';

type FormDialogProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
  onEdit?: () => void;
  onDelete?: () => void;
  cancelLabel?: string;
  submitLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  loading?: boolean;
  editing?: boolean;
  deleting?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  title,
  subtitle,
  children,
  onClose,
  onSubmit,
  onEdit,
  onDelete,
  cancelLabel = 'Cancelar',
  submitLabel = 'Guardar',
  editLabel = 'Editar',
  deleteLabel = 'Eliminar',
  loading = false,
  editing = false,
  deleting = false,
  showEdit = false,
  showDelete = false,
  maxWidth = 'sm',
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth={maxWidth}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '24px',
          border: '1px solid rgba(15, 23, 42, 0.06)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(6px)' },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ position: 'relative' }}>
        <Typography
          variant="h6"
          sx={{
            px: { xs: 3, sm: 4 },
            pt: { xs: 3.5, sm: 4.5 },
            pb: subtitle ? 1.5 : 3,
            textAlign: 'center',
            fontWeight: 700,
            color: '#0f172a',
            fontFamily: "'DM Sans', 'Inter', sans-serif",
            fontSize: '1.375rem',
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              color: '#64748b',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              fontFamily: "'DM Sans', 'Inter', sans-serif",
              maxWidth: 400,
              mx: 'auto',
              pb: 2,
            }}
          >
            {subtitle}
          </Typography>
        )}

        <IconButton
          size="small"
          onClick={onClose}
          disabled={loading}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#94a3b8',
            width: 36,
            height: 36,
            borderRadius: '10px',
            '&:hover': { backgroundColor: '#f1f5f9', color: '#0f172a' },
          }}
          aria-label="Cerrar"
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Contenido */}
      <DialogContent sx={{ px: { xs: 3, sm: 4 }, pb: 3, pt: 0 }}>
        {children}
      </DialogContent>

      {/* Botones de acción */}
      <Box
        sx={{
          px: { xs: 3, sm: 4 },
          py: 2.5,
          bgcolor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          borderRadius: '0 0 24px 24px',
         display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1.5,
    width: '100%',
    flexWrap: 'wrap',
        }}
      >
        <ActionButtons
          onEdit={onEdit}
          onDelete={onDelete}
          onCancel={onClose}
          onSave={onSubmit}
          editLabel={editLabel}
          deleteLabel={deleteLabel}
          cancelLabel={cancelLabel}
          saveLabel={submitLabel}
          loading={loading}
          editing={editing}
          deleting={deleting}
          showEdit={showEdit}
          showDelete={showDelete}
          showCancel={!showEdit && !showDelete}
          showSave={true}
        />
      </Box>
    </Dialog>
  );
};

export default FormDialog;