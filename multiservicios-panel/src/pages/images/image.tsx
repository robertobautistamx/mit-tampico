import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Alert, ImageList, ImageListItem, IconButton, Dialog, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { useImagenes } from '../../modules/images/imagenes';

export default function ImagenesPage() {
  // Usamos fetchAll = true para traer todas las imágenes del catálogo
  const { imagenes, loading, error, deleteImagen } = useImagenes(null, true);
  
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  const [feedback, setFeedback] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({
    open: false,
    type: 'success',
    message: '',
  });

  const openImageViewer = (url: string) => {
    setSelectedImage(url);
    setViewerOpen(true);
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
    setSelectedImage(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteImagen(deleteTarget);
      setFeedback({ open: true, type: 'success', message: 'Imagen eliminada correctamente.' });
    } catch (e) {
      setFeedback({ open: true, type: 'error', message: 'Error al eliminar la imagen.' });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, flex: 1 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
          Galería de Imágenes
        </Typography>
        <Typography sx={{ color: '#64748b', mt: 0.5 }}>
          Administra todas las imágenes registradas en el catálogo desde este panel.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(226, 232, 240, 1)' }}>
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : imagenes.length === 0 ? (
            <Typography sx={{ color: '#64748b', textAlign: 'center', py: 4 }}>
              No hay imágenes en el catálogo. Puedes agregarlas desde la sección de Productos.
            </Typography>
          ) : (
            <ImageList variant="masonry" cols={4} gap={16}>
              {imagenes.map((img) => (
                <ImageListItem key={img.id} sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', '&:hover .overlay': { opacity: 1 } }}>
                  <img src={img.url} alt={`Imagen ${img.id}`} loading="lazy" style={{ display: 'block', width: '100%', borderRadius: 8 }} />
                  <Box className="overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <IconButton onClick={() => openImageViewer(img.url)} sx={{ color: 'white', background: 'rgba(255,255,255,0.2)', '&:hover': { background: 'rgba(255,255,255,0.4)' } }}>
                      <OpenInFullRoundedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(img.id)} sx={{ color: '#ef4444', background: 'rgba(255,255,255,0.2)', '&:hover': { background: 'rgba(255,255,255,0.4)' } }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </CardContent>
      </Card>

      {/* Visor de Imágenes (Lightbox) */}
      <Dialog open={viewerOpen} onClose={closeImageViewer} maxWidth="md" fullWidth sx={{ '& .MuiDialog-paper': { background: 'transparent', boxShadow: 'none', overflow: 'hidden' } }}>
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <IconButton onClick={closeImageViewer} sx={{ position: 'absolute', top: 0, right: 0, color: 'white', background: 'rgba(0,0,0,0.5)', '&:hover': { background: 'rgba(0,0,0,0.8)' }, zIndex: 10 }}>
            <CloseRoundedIcon />
          </IconButton>
          {selectedImage && <img src={selectedImage} alt="Visor extendido" style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', objectFit: 'contain' }} />}
        </Box>
      </Dialog>

      <ConfirmDialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} loading={deleting} danger={true} title="Eliminar imagen" description="¿Seguro que deseas eliminar esta imagen de forma permanente?" confirmLabel="Eliminar" />
      <Snackbar open={feedback.open} autoHideDuration={3000} onClose={() => setFeedback(prev => ({ ...prev, open: false }))}>
        <Alert onClose={() => setFeedback(prev => ({ ...prev, open: false }))} severity={feedback.type} variant="filled" sx={{ width: '100%' }}>{feedback.message}</Alert>
      </Snackbar>
    </Box>
  );
}