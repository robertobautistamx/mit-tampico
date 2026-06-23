import React, { useState } from 'react';
import ProjectCard from '../../components/card/ProjectCard';
import { useImageGallery } from '../../modules/images/images';
import type { ImageGalleryItem } from '../../interfaces/image_gallery/useImage_gallery';

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Projects: React.FC = () => {
  const { images, loading, error, refetch } = useImageGallery();
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedProject, setSelectedProject] = useState<ImageGalleryItem | null>(null);

  // Derive categories dynamically from database results
  const categories = [
    'Todos',
    ...Array.from(
      new Set(
        images
          .map((img) => img.categoria?.nombre)
          .filter((name): name is string => !!name)
      )
    ),
  ];

  // Filter images based on selected category tab
  const filteredImages = activeCategory === 'Todos'
    ? images
    : images.filter((img) => img.categoria?.nombre === activeCategory);

  // Resolve absolute path or default URL from the backend server
  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;

    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
    try {
      const origin = new URL(apiBase).origin;
      const cleanUrl = url.startsWith('/') ? url : `/${url}`;
      return `${origin}${cleanUrl}`;
    } catch (e) {
      return url;
    }
  };

  const styles = {
    section: {
      padding: '6rem 2rem',
      backgroundColor: '#0F172A', // Fondo oscuro para resaltar las imágenes
    } as React.CSSProperties,
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    } as React.CSSProperties,
    headerContainer: {
      textAlign: 'center',
      marginBottom: '3rem',
    } as React.CSSProperties,
    badge: {
      display: 'inline-block',
      padding: '0.4rem 1rem',
      backgroundColor: 'rgba(96, 165, 250, 0.15)',
      color: '#60A5FA', // Azul claro brillante
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: '1rem',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      color: '#F8FAFC', // Texto blanco
      margin: 0,
    } as React.CSSProperties,
    tabsContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginBottom: '3.5rem',
    } as React.CSSProperties,
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
    } as React.CSSProperties,
    errorContainer: {
      textAlign: 'center',
      padding: '3rem 2rem',
      backgroundColor: 'rgba(239, 68, 68, 0.05)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '12px',
      maxWidth: '500px',
      margin: '2rem auto',
    } as React.CSSProperties,
    errorText: {
      color: '#F87171',
      fontSize: '1rem',
      marginBottom: '1.5rem',
    } as React.CSSProperties,
    retryButton: {
      padding: '0.6rem 1.5rem',
      backgroundColor: 'transparent',
      color: '#EF4444',
      border: '1px solid #EF4444',
      borderRadius: '6px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    } as React.CSSProperties,
    emptyText: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      color: '#64748B',
      fontSize: '1.1rem',
      padding: '4rem 0',
    } as React.CSSProperties,
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '1.5rem',
      animation: 'fadeIn 0.25s ease-out forwards',
    } as React.CSSProperties,
    modalContent: {
      backgroundColor: '#1E293B',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '900px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'relative',
      animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
    } as React.CSSProperties,
    modalBody: {
      display: 'flex',
      minHeight: '400px',
    } as React.CSSProperties,
    modalImageContainer: {
      flex: 6,
      backgroundColor: '#0F172A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    } as React.CSSProperties,
    modalImage: {
      width: '100%',
      height: '100%',
      maxHeight: '550px',
      objectFit: 'cover',
    } as React.CSSProperties,
    modalDetails: {
      flex: 4,
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#1E293B',
    } as React.CSSProperties,
    modalCategory: {
      alignSelf: 'flex-start',
      padding: '0.3rem 0.8rem',
      backgroundColor: 'rgba(96, 165, 250, 0.12)',
      color: '#60A5FA',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      marginBottom: '1rem',
      letterSpacing: '0.05em',
    } as React.CSSProperties,
    modalTitle: {
      fontSize: '1.75rem',
      fontWeight: 800,
      color: '#F8FAFC',
      margin: '0 0 1rem 0',
      lineHeight: 1.2,
    } as React.CSSProperties,
    modalDescription: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
      color: '#94A3B8',
      margin: 0,
    } as React.CSSProperties,
    modalCloseBtn: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 10,
      transition: 'all 0.2s ease',
      outline: 'none',
    } as React.CSSProperties,
  };

  return (
    <section id="proyectos" style={styles.section}>
      <style>
        {`
          /* Animaciones CSS */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          /* Shimmer skeletons */
          .skeleton-card {
            background: linear-gradient(90deg, #1E293B 25%, #334155 50%, #1E293B 75%);
            background-size: 200% 100%;
            animation: shimmer 1.6s infinite linear;
            border-radius: 12px;
            aspect-ratio: 4 / 3;
          }

          /* Estilos de botones de categorias */
          .category-tab {
            padding: 0.6rem 1.4rem;
            background-color: rgba(255, 255, 255, 0.04);
            color: #94A3B8;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 30px;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            outline: none;
          }
          .category-tab:hover {
            background-color: rgba(255, 255, 255, 0.08);
            color: #F8FAFC;
            border-color: rgba(255, 255, 255, 0.15);
            transform: translateY(-1px);
          }
          .category-tab.active {
            background-color: #3B82F6;
            color: #FFFFFF;
            border-color: #3B82F6;
            box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.35);
          }

          /* Cierre boton hover */
          .close-btn:hover {
            background-color: #EF4444 !important;
            border-color: #EF4444 !important;
            transform: rotate(90deg);
          }

          /* Boton reintentar hover */
          .retry-btn:hover {
            background-color: #EF4444 !important;
            color: #FFFFFF !important;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
          }

          /* Responsividad del Modal */
          @media (max-width: 768px) {
            .modal-body-responsive {
              flex-direction: column !important;
            }
            .modal-image-container-responsive {
              height: 250px !important;
              flex: none !important;
            }
            .modal-details-responsive {
              padding: 1.75rem !important;
              flex: none !important;
            }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <span style={styles.badge}>Proyectos</span>
          <h2 style={styles.title}>Galería de nuestros trabajos</h2>
        </div>

        {/* Categories Tab Selector */}
        {!error && images.length > 0 && (
          <div style={styles.tabsContainer}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
            <button className="retry-btn" style={styles.retryButton} onClick={refetch}>
              Reintentar Conexión
            </button>
          </div>
        )}

        {/* Gallery Content State */}
        {!loading && !error && (
          <div style={styles.grid}>
            {filteredImages.length > 0 ? (
              filteredImages.map((item) => (
                <ProjectCard
                  key={item.id}
                  title={item.titulo}
                  img={getImageUrl(item.image_url)}
                  onClick={() => setSelectedProject(item)}
                />
              ))
            ) : (
              <div style={styles.emptyText}>
                No hay proyectos disponibles en la categoría "{activeCategory}".
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox / Details Modal */}
      {selectedProject && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              style={styles.modalCloseBtn}
              onClick={() => setSelectedProject(null)}
              aria-label="Cerrar modal"
            >
              <CloseIcon />
            </button>

            <div className="modal-body-responsive" style={styles.modalBody}>
              <div className="modal-image-container-responsive" style={styles.modalImageContainer}>
                <img
                  src={getImageUrl(selectedProject.image_url)}
                  alt={selectedProject.titulo}
                  style={styles.modalImage}
                />
              </div>

              <div className="modal-details-responsive" style={styles.modalDetails}>
                {selectedProject.categoria && (
                  <span style={styles.modalCategory}>
                    {selectedProject.categoria.nombre}
                  </span>
                )}
                <h3 style={styles.modalTitle}>{selectedProject.titulo}</h3>
                <p style={styles.modalDescription}>
                  {selectedProject.descripcion || 'Sin descripción detallada disponible para este proyecto.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
