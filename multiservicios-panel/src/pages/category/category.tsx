import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Button,
  Snackbar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleDataTable, { TableColumn } from '../../components/table/table';
import { useCategorias } from '../../modules/category/category';
import { Categoria } from '../../interfaces/category/useCategory';
import TableActionButtons from '../../components/actions/TableActionButtons';
import FormDialog from '../../components/dialogs/FormDialog';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import StyledTextField from '../../components/dialogs/StyledTextField';
import PrimaryActionButton from '../../components/actions/PrimaryActionButton';
import RefreshActionButton from '../../components/actions/RefreshActionButton';

interface CategoryRowActionsProps {
  row: Categoria;
  onEdit: (categoria: Categoria) => void;
  onDelete: (categoria: Categoria) => void;
}

const CategoryRowActions: React.FC<CategoryRowActionsProps> = ({ row, onEdit, onDelete }) => {
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

export default function CategoryPage() {
  const { categorias, loading, error, createCategoria, updateCategoria, deleteCategoria, fetchCategorias } = useCategorias();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [nombre, setNombre] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Categoria | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({
    open: false,
    type: 'success',
    message: '',
  });

  const columns: TableColumn<Categoria>[] = useMemo(() => [
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
    setEditingCategoria(null);
    setNombre('');
    setDialogOpen(true);
  };

  const openEditDialog = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setNombre(categoria.nombre);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    if (!saving) {
      setDialogOpen(false);
      setTimeout(() => {
        setEditingCategoria(null);
        setNombre('');
      }, 300); // Esperar a que termine la animación de cierre
    }
  };

  const handleSave = async () => {
    const trimmed = nombre.trim();
    if (!trimmed) {
      setFeedback({ open: true, type: 'error', message: 'Ingresa un nombre válido.' });
      return;
    }

    try {
      setSaving(true);
      if (editingCategoria) {
        await updateCategoria(editingCategoria.id, { nombre: trimmed });
        setFeedback({ open: true, type: 'success', message: 'Categoría actualizada.' });
      } else {
        await createCategoria({ nombre: trimmed });
        setFeedback({ open: true, type: 'success', message: 'Categoría creada.' });
      }
      closeDialog();
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'No se pudo guardar la categoría.';
      setFeedback({ open: true, type: 'error', message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (categoria: Categoria) => {
    setDeleteTarget(categoria);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    if (!deleting) {
      setConfirmDialogOpen(false);
      setTimeout(() => {
        setDeleteTarget(null);
      }, 300); // Esperar a que termine la animación de cierre
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteCategoria(deleteTarget.id);
      setFeedback({ open: true, type: 'success', message: 'Categoría eliminada.' });
      closeConfirmDialog();
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar la categoría.';
      setFeedback({ open: true, type: 'error', message });
    } finally {
      setDeleting(false);
    }
  };

  const handleRefresh = async () => {
    if (fetchCategorias) {
      try {
        await fetchCategorias();
        setFeedback({ open: true, type: 'success', message: 'Tabla actualizada.' });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Error al actualizar la tabla.';
        setFeedback({ open: true, type: 'error', message });
      }
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, flex: 1 }}>
      {/* Cabecera y acciones */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
        <PrimaryActionButton
          label="Nueva Categoría"
          onClick={openCreateDialog}
        />
        <RefreshActionButton
          onClick={handleRefresh}
          loading={loading}
        />
      </Box>

      {loading && categorias.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
          <SimpleDataTable
          rows={categorias}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={categorias.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          showSelection={false}
          showFilters={true}
          renderActions={(row) => (
            <CategoryRowActions
              row={row}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          )}
          emptyMessage="No hay categorías registradas"
          />
      )}

      <FormDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSubmit={handleSave}
        loading={saving}
        title={editingCategoria ? 'Editar categoría' : 'Nueva categoría'}
        subtitle="Completa el nombre para guardar la categoría."
        submitLabel={editingCategoria ? 'Actualizar' : 'Crear'}
      >
          <StyledTextField
            autoFocus
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            disabled={saving}
            sx={{ mt: 1 }}
          />
      </FormDialog>

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDelete}
        loading={deleting}
        danger={true}
        title="Eliminar categoría"
        description={deleteTarget ? `¿Seguro que deseas eliminar "${deleteTarget.nombre}"? Esta acción no se puede deshacer.` : ''}
        confirmLabel="Eliminar"
      />

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
          severity={feedback.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
