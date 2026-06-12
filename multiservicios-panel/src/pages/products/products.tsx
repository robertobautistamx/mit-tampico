import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  MenuItem,
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
import { useCategorias } from '../../modules/category/category';
import { useProductos } from '../../modules/products/product';

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  activo?: boolean | number;
  categoria_id?: number | null;
  created_at?: string;
}

interface ProductRowActionsProps {
  row: Producto;
  onEdit: (producto: Producto) => void;
  onDelete: (producto: Producto) => void;
}

const ProductRowActions: React.FC<ProductRowActionsProps> = ({ row, onEdit, onDelete }) => {
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

export default function ProductPage() {
  // Ahora sí usamos el hook real para traer, crear y modificar los productos del backend
  const { productos, loading, error, createProducto, updateProducto, deleteProducto, fetchProductos } = useProductos();
  
  // Traemos las categorías para el select
  const { categorias } = useCategorias();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  // Estado del formulario
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoriaId, setCategoriaId] = useState<number | ''>('');
  
  const [deleteTarget, setDeleteTarget] = useState<Producto | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({
    open: false,
    type: 'success',
    message: '',
  });

  const columns: TableColumn<Producto>[] = useMemo(() => [
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
      key: 'descripcion',
      label: 'Descripción',
      render: (row) => row.descripcion || '-',
      sortable: true,
    },
    {
      key: 'precio',
      label: 'Precio',
      render: (row) => `$${Number(row.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      width: 120,
      align: 'right',
      sortable: true,
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (row) => row.stock,
      width: 100,
      align: 'right',
      sortable: true,
    },
    {
      key: 'categoria_id',
      label: 'Categoría',
      render: (row) => {
        const cat = categorias.find((c) => c.id === row.categoria_id);
        return cat ? cat.nombre : '-';
      },
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Creado',
      render: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString('es-MX') : '-',
      width: 140,
      sortable: true,
    },
  ], [categorias]);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openCreateDialog = () => {
    setEditingProducto(null);
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setStock('');
    setCategoriaId('');
    setDialogOpen(true);
  };

  const openEditDialog = (producto: Producto) => {
    setEditingProducto(producto);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion || '');
    const [intPart, decPart] = String(producto.precio).split('.');
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setPrecio(decPart ? `${formattedInt}.${decPart}` : formattedInt);
    setStock(String(producto.stock));
    setCategoriaId(producto.categoria_id || '');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    if (!saving) {
      setDialogOpen(false);
      setTimeout(() => {
        setEditingProducto(null);
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setCategoriaId('');
      }, 300); // Esperar a que termine la animación de cierre
    }
  };

  const handleSave = async () => {
    const trimmedNombre = nombre.trim();
    const parsedPrecio = parseFloat(precio.replace(/,/g, ''));
    if (!trimmedNombre || isNaN(parsedPrecio) || !stock || categoriaId === '') {
      setFeedback({ open: true, type: 'error', message: 'Completa todos los campos obligatorios.' });
      return;
    }

    if (parseInt(stock, 10) === 0) {
      setFeedback({ open: true, type: 'error', message: 'El stock no puede ser cero.' });
      return;
    }

    try {
      setSaving(true);
      const productData = { 
        nombre: trimmedNombre, 
        descripcion: descripcion.trim(),
        precio: parsedPrecio, 
        stock: parseInt(stock, 10),
        categoria_id: categoriaId
      };

      if (editingProducto) {
        await updateProducto(editingProducto.id, productData);
        setFeedback({ open: true, type: 'success', message: 'Producto actualizado.' });
      } else {
        await createProducto(productData);
        setFeedback({ open: true, type: 'success', message: 'Producto creado.' });
      }
      closeDialog();
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'No se pudo guardar el producto.';
      setFeedback({ open: true, type: 'error', message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (producto: Producto) => {
    setDeleteTarget(producto);
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
      await deleteProducto(deleteTarget.id);
      setFeedback({ open: true, type: 'success', message: 'Producto eliminado.' });
      closeConfirmDialog();
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar el producto.';
      setFeedback({ open: true, type: 'error', message });
    } finally {
      setDeleting(false);
    }
  };

  const handleRefresh = async () => {
    if (fetchProductos) {
      try {
        await fetchProductos();
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
          label="Nuevo Producto"
          onClick={openCreateDialog}
        />
        <RefreshActionButton
          onClick={handleRefresh}
          loading={loading}
        />
      </Box>

      {loading && productos.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <SimpleDataTable
          rows={productos}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={productos.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          showSelection={false}
          showFilters={true}
          renderActions={(row) => (
            <ProductRowActions
              row={row}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          )}
          emptyMessage="No hay productos registrados"
        />
      )}

      {/* Modal Crear/Editar */}
      <FormDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSubmit={handleSave}
        loading={saving}
        title={editingProducto ? 'Editar producto' : 'Nuevo producto'}
        subtitle="Completa los datos del producto."
        submitLabel={editingProducto ? 'Actualizar' : 'Crear'}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <StyledTextField
              variant="outlined"
              autoFocus
              fullWidth
              label="Nombre del producto"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              disabled={saving}
            />
            <StyledTextField
              variant="outlined"
              select
              fullWidth
              label="Categoría"
              value={categoriaId}
              onChange={(event) => setCategoriaId(event.target.value as unknown as number)}
              disabled={saving}
            >
              {categorias.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.nombre}
                </MenuItem>
              ))}
            </StyledTextField>
          </Box>
          <StyledTextField
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            label="Descripción (opcional)"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            disabled={saving}
          />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <StyledTextField
              variant="outlined"
              fullWidth
              label="Precio"
              type="text"
              inputMode="decimal"
              value={precio ? `$ ${precio}` : ''}
              onChange={(event) => {
                let val = event.target.value.replace(/[^0-9.]/g, ''); // Permite solo números y puntos
                const parts = val.split('.');
                if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join(''); // Evita múltiples puntos
                if (parts.length > 1 && parts[1].length > 2) val = parts[0] + '.' + parts[1].slice(0, 2); // Máximo 2 decimales
                
                const formattedParts = val.split('.');
                formattedParts[0] = formattedParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Agrega comas a los miles
                setPrecio(formattedParts.join('.'));
              }}
              disabled={saving}
              sx={{
                '& input': { textAlign: 'right' }
              }}
            />
            <StyledTextField
              variant="outlined"
              fullWidth
              label="Stock"
              type="text"
              inputMode="numeric"
              value={stock}
              onChange={(event) => {
                const val = event.target.value.replace(/[^0-9]/g, '');
                if (val === '0') return;
                setStock(val);
              }}
              disabled={saving}
              sx={{
                '& input': { textAlign: 'right' }
              }}
            />
          </Box>
        </Box>
      </FormDialog>

      {/* Modal Confirmar Eliminación */}
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDelete}
        loading={deleting}
        danger={true}
        title="Eliminar producto"
        description={deleteTarget ? `¿Seguro que deseas eliminar "${deleteTarget.nombre}"? Esta acción no se puede deshacer.` : ''}
        confirmLabel="Eliminar"
      />

      {/* Snackbar de notificaciones */}
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
