import React from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type ActionButtonsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onSave?: () => void | Promise<void>;
  editLabel?: string;
  deleteLabel?: string;
  cancelLabel?: string;
  saveLabel?: string;
  loading?: boolean;
  editing?: boolean;
  deleting?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showCancel?: boolean;
  showSave?: boolean;
  fullWidth?: boolean;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  onCancel,
  onSave,
  editLabel = 'Editar',
  deleteLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  saveLabel = 'Guardar',
  loading = false,
  editing = false,
  deleting = false,
  showEdit = true,
  showDelete = true,
  showCancel = true,
  showSave = false,
  fullWidth = false,
}) => {
  const disabled = loading || editing || deleting;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 1,
        width: fullWidth ? '100%' : 'auto',
        flexWrap: 'wrap',
      }}
    >
      {showCancel && onCancel && (
        <Button
          onClick={onCancel}
          disabled={disabled}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: '#dc2626',
            borderColor: '#fca5a5',
            borderRadius: '12px',
            px: 2.2,
            py: 1,
            minWidth: 110,
            backgroundColor: '#fff',
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
      )}

      {showDelete && onDelete && (
        <Button
          onClick={onDelete}
          disabled={disabled}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: '#dc2626',
            borderColor: '#fca5a5',
            borderRadius: '12px',
            px: 2.2,
            py: 1,
            minWidth: 110,
            backgroundColor: '#fff',
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
          {deleting ? (
            <CircularProgress size={18} sx={{ color: '#dc2626' }} />
          ) : (
            <>
              <DeleteRoundedIcon sx={{ mr: 0.6, fontSize: 18 }} />
              {deleteLabel}
            </>
          )}
        </Button>
      )}

      {showEdit && onEdit && (
        <Button
          onClick={onEdit}
          disabled={disabled}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: '#2563eb',
            borderColor: '#93c5fd',
            borderRadius: '12px',
            px: 2.2,
            py: 1,
            minWidth: 110,
            backgroundColor: '#fff',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#eff6ff',
              borderColor: '#2563eb',
              boxShadow: 'none',
            },
            '&:disabled': {
              borderColor: '#e2e8f0',
              color: '#cbd5e1',
              backgroundColor: '#f8fafc',
            },
          }}
        >
          <EditRoundedIcon sx={{ mr: 0.6, fontSize: 18 }} />
          {editing ? cancelLabel : editLabel}
        </Button>
      )}

      {showSave && onSave && (
        <Button
          onClick={onSave}
          disabled={disabled}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '0.9375rem',
            borderRadius: '12px',
            px: 2.4,
            py: 1,
            minWidth: 120,
            bgcolor: '#2563eb',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#1d4ed8',
              boxShadow: 'none',
            },
            '&:disabled': {
              bgcolor: '#93c5fd',
              color: '#fff',
            },
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={18} sx={{ mr: 0.6, color: '#fff' }} />
              Guardando...
            </>
          ) : (
            saveLabel
          )}
        </Button>
      )}
    </Box>
  );
};

export default ActionButtons;