import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  MenuItem,
  Chip,
  FormControlLabel,
  Switch,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleDataTable, { TableColumn } from '../../components/table/table';
import TableActionButtons from '../../components/actions/TableActionButtons';
import FormDialog from '../../components/dialogs/FormDialog';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import StyledTextField from '../../components/dialogs/StyledTextField';
import PrimaryActionButton from '../../components/actions/PrimaryActionButton';
import RefreshActionButton from '../../components/actions/RefreshActionButton';
import { useUsuarios } from '../../modules/users/users';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string;
  rol: 'admin' | 'empleado';
  activo: boolean | number;
  created_at?: string;
}

interface UsuarioRowActionsProps {
  row: Usuario;
  onEdit: (usuario: Usuario) => void;
  onDelete: (usuario: Usuario) => void;
}

const UsuarioRowActions: React.FC<UsuarioRowActionsProps> = ({ row, onEdit, onDelete }) => {
  return (
    <TableActionButtons
      actions={[
        {
          key: 'edit',
          label: 'Editar',
          icon: <EditIcon fontSize="small" />,
          onClick: () => onEdit(row),
          color: 'primary',
        },
        {
          key: 'delete',
          label: 'Eliminar',
          icon: <DeleteIcon fontSize="small" />,
          onClick: () => onDelete(row),
          color: 'error',
        },
      ]}
    />
  );
};

export default function UsuariosPage() {
  const { usuarios, loading, error, createUsuario, updateUsuario, deleteUsuario, fetchUsuarios } = useUsuarios();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  // Estado del formulario
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'admin' | 'empleado'>('empleado');
  const [activo, setActivo] = useState(true);
  
  const [deleteTarget, setDeleteTarget] = useState<Usuario | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({
    open: false,
    type: 'success',
    message: '',
  });

  const columns: TableColumn<Usuario>[] = useMemo(() => [
    {
      key: 'id',
      label: 'ID',
      render: (row) => row.id,
      width: 80,
      sortable: true,
    },
    {
      key: 'nombre',
      label: 'Nombre',
      render: (row) => row.nombre,
      sortable: true,
    },
    {
      key: 'email',
      label: 'Correo Electrónico',
      render: (row) => row.email,
      sortable: true,
    },
    {
      key: 'rol',
      label: 'Rol',
      render: (row) => row.rol === 'admin' ? 'Administrador' : 'Empleado',
      width: 130,
      sortable: true,
    },
    {
      key: 'activo',
      label: 'Estado',
      render: (row) => (
        <Chip 
          label={row.activo ? 'Activo' : 'Inactivo'} 
          color={row.activo ? 'success' : 'default'} 
          size="small" 
          sx={{ fontWeight: 600, fontSize: '0.75rem' }} 
        />
      ),
      width: 120,
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Creado',
      render: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString('es-MX') : '-',
      width: 140,
      sortable: true,
    },
  ], []);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openCreateDialog = () => {
    setEditingUsuario(null);
    setNombre('');
    setEmail('');
    setPassword('');
    setRol('empleado');
    setActivo(true);
    setDialogOpen(true);
  };

  const openEditDialog = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setPassword(''); // Ocultar contraseña original por seguridad
    setRol(usuario.rol);
    setActivo(Boolean(usuario.activo));
    setDialogOpen(true);
  };

  const closeDialog = () => {
    if (!saving) {
      setDialogOpen(false);
      setTimeout(() => {
        setEditingUsuario(null);
        setNombre('');
        setEmail('');
        setPassword('');
        setRol('empleado');
        setActivo(true);
      }, 300);
    }
  };

  const handleSave = async () => {
    const trimmedNombre = nombre.trim();
    const trimmedEmail = email.trim();

    if (!trimmedNombre || !trimmedEmail || (!editingUsuario && !password)) {
      setFeedback({ open: true, type: 'error', message: 'Completa todos los campos obligatorios.' });
      return;
    }

    try {
      setSaving(true);
      const userData: Partial<Usuario> = { 
        nombre: trimmedNombre, 
        email: trimmedEmail,
        rol,
        activo: activo ? 1 : 0
      };

      // Solo mandamos la contraseña si escribió una nueva
      if (password.trim() !== '') {
        userData.password = password;
      }

      if (editingUsuario) {
        await updateUsuario(editingUsuario.id, userData);
        setFeedback({ open: true, type: 'success', message: 'Usuario actualizado.' });
      } else {
        await createUsuario(userData);
        setFeedback({ open: true, type: 'success', message: 'Usuario creado.' });
      }
      closeDialog();
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'No se pudo guardar el usuario.';
      setFeedback({ open: true, type: 'error', message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (usuario: Usuario) => {
    setDeleteTarget(usuario);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    if (!deleting) {
      setConfirmDialogOpen(false);
      setTimeout(() => {
        setDeleteTarget(null);
      }, 300);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteUsuario(deleteTarget.id);
      setFeedback({ open: true, type: 'success', message: 'Usuario eliminado.' });
      closeConfirmDialog();
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar el usuario.';
      setFeedback({ open: true, type: 'error', message });
    } finally {
      setDeleting(false);
    }
  };

  const handleRefresh = async () => {
    if (fetchUsuarios) {
      try {
        await fetchUsuarios();
        setFeedback({ open: true, type: 'success', message: 'Tabla actualizada.' });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Error al actualizar la tabla.';
        setFeedback({ open: true, type: 'error', message });
      }
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, flex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
        <PrimaryActionButton label="Nuevo Usuario" onClick={openCreateDialog} />
        <RefreshActionButton onClick={handleRefresh} loading={loading} />
      </Box>

      {loading && usuarios.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : (
        <SimpleDataTable
          rows={usuarios}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={usuarios.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          showSelection={false}
          showFilters={true}
          renderActions={(row) => (
            <UsuarioRowActions row={row} onEdit={openEditDialog} onDelete={handleDelete} />
          )}
          emptyMessage="No hay usuarios registrados"
        />
      )}

      <FormDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSubmit={handleSave}
        loading={saving}
        title={editingUsuario ? 'Editar usuario' : 'Nuevo usuario'}
        subtitle="Ingresa la información de la cuenta."
        submitLabel={editingUsuario ? 'Actualizar' : 'Crear'}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <StyledTextField variant="outlined" autoFocus fullWidth label="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={saving} />
          <StyledTextField variant="outlined" fullWidth label="Correo electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={saving} />
          <StyledTextField variant="outlined" fullWidth label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={saving} helperText={editingUsuario ? 'Déjalo en blanco si no quieres cambiar la contraseña' : ''} />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <StyledTextField variant="outlined" select fullWidth label="Rol del sistema" value={rol} onChange={(e) => setRol(e.target.value as 'admin' | 'empleado')} disabled={saving}>
              <MenuItem value="empleado">Empleado</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </StyledTextField>
            <FormControlLabel
              control={<Switch checked={activo} onChange={(e) => setActivo(e.target.checked)} disabled={saving} color="success" />}
              label={activo ? "Activo" : "Inactivo"}
              sx={{ minWidth: 120, userSelect: 'none' }}
            />
          </Box>
        </Box>
      </FormDialog>

      <ConfirmDialog open={confirmDialogOpen} onClose={closeConfirmDialog} onConfirm={confirmDelete} loading={deleting} danger={true} title="Eliminar usuario" description={deleteTarget ? `¿Seguro que deseas eliminar al usuario "${deleteTarget.nombre}"?` : ''} confirmLabel="Eliminar" />
      
      <Snackbar open={feedback.open} autoHideDuration={3000} onClose={() => setFeedback(p => ({ ...p, open: false }))}>
        <Alert onClose={() => setFeedback(p => ({ ...p, open: false }))} severity={feedback.type} variant="filled" sx={{ width: '100%' }}>{feedback.message}</Alert>
      </Snackbar>
    </Box>
  );
}