import React, { useState } from 'react';

interface CardProps {
  id?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  variant?: 'service' | 'info';
  colorScheme?: 'cyan' | 'purple' | 'amber' | 'blue';
  image?: string;
  badge?: string;
  tags?: string[];
}

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const Card: React.FC<CardProps> = ({ id, title, description, icon, variant = 'service', colorScheme, image, badge, tags }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isService = variant === 'service';

  const schemes = {
    cyan: {
      bg: 'rgba(6, 182, 212, 0.08)',
      color: '#0891B2',
      bgHover: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
      shadow: 'rgba(6, 182, 212, 0.18)',
      badgeBg: 'rgba(6, 182, 212, 0.12)',
      badgeColor: '#0891B2',
      tagBg: '#ECFEFF',
      tagColor: '#0891B2',
      borderHover: '#06B6D4',
    },
    purple: {
      bg: 'rgba(139, 92, 246, 0.08)',
      color: '#7C3AED',
      bgHover: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      shadow: 'rgba(139, 92, 246, 0.18)',
      badgeBg: 'rgba(139, 92, 246, 0.12)',
      badgeColor: '#7C3AED',
      tagBg: '#F5F3FF',
      tagColor: '#7C3AED',
      borderHover: '#8B5CF6',
    },
    amber: {
      bg: 'rgba(245, 158, 11, 0.08)',
      color: '#D97706',
      bgHover: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      shadow: 'rgba(245, 158, 11, 0.18)',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      badgeColor: '#D97706',
      tagBg: '#FEF3C7',
      tagColor: '#B45309',
      borderHover: '#F59E0B',
    },
    blue: {
      bg: 'rgba(37, 99, 235, 0.08)',
      color: '#2563EB',
      bgHover: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      shadow: 'rgba(37, 99, 235, 0.18)',
      badgeBg: 'rgba(37, 99, 235, 0.12)',
      badgeColor: '#2563EB',
      tagBg: '#EFF6FF',
      tagColor: '#1D4ED8',
      borderHover: '#2563EB',
    },
  };

  const selectedScheme = schemes[colorScheme || 'blue'];

  const styles = {
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: isHovered
        ? `0 20px 30px -8px ${selectedScheme.shadow}, 0 10px 15px -5px rgba(0, 0, 0, 0.05)`
        : '0 10px 25px -5px rgba(15, 23, 42, 0.04), 0 4px 6px -2px rgba(15, 23, 42, 0.02)',
      transform: isHovered ? 'translateY(-8px)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      border: isHovered ? `1px solid ${selectedScheme.borderHover}` : '1px solid #E2E8F0',
      scrollMarginTop: '120px',
      position: 'relative',
    } as React.CSSProperties,
    imageWrapper: {
      position: 'relative',
      width: '100%',
      height: '190px',
      overflow: 'hidden',
      backgroundColor: '#F1F5F9',
    } as React.CSSProperties,
    cardImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
    } as React.CSSProperties,
    imageOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.5) 100%)',
    } as React.CSSProperties,
    badge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(8px)',
      color: selectedScheme.color,
      padding: '0.3rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 2,
    } as React.CSSProperties,
    floatingIcon: {
      position: 'absolute',
      bottom: '1rem',
      left: '1.25rem',
      width: '52px',
      height: '52px',
      borderRadius: '14px',
      background: isHovered ? selectedScheme.bgHover : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      color: isHovered ? '#FFFFFF' : selectedScheme.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: isHovered
        ? `0 10px 20px ${selectedScheme.shadow}`
        : '0 6px 16px rgba(15, 23, 42, 0.2)',
      border: isHovered ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      zIndex: 3,
    } as React.CSSProperties,
    content: {
      padding: '1.75rem',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between',
    } as React.CSSProperties,
    topBody: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem',
    } as React.CSSProperties,
    title: {
      fontSize: '1.4rem',
      fontWeight: 800,
      color: '#0F172A',
      margin: 0,
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
    } as React.CSSProperties,
    description: {
      color: '#475569',
      lineHeight: 1.65,
      fontSize: '0.95rem',
      margin: 0,
    } as React.CSSProperties,
    tagsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '0.5rem',
    } as React.CSSProperties,
    tag: {
      backgroundColor: selectedScheme.tagBg,
      color: selectedScheme.tagColor,
      padding: '0.25rem 0.65rem',
      borderRadius: '6px',
      fontSize: '0.78rem',
      fontWeight: 600,
    } as React.CSSProperties,
    ctaWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1.5rem',
      paddingTop: '1rem',
      borderTop: '1px solid #F1F5F9',
      color: selectedScheme.color,
      fontWeight: 700,
      fontSize: '0.9rem',
      transition: 'gap 0.3s ease',
    } as React.CSSProperties,
  };

  return (
    <div id={id} style={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {image ? (
        <div style={styles.imageWrapper}>
          <img src={image} alt={title} style={styles.cardImage} />
          <div style={styles.imageOverlay} />
          {badge && <div style={styles.badge}>{badge}</div>}
          <div style={styles.floatingIcon}>{icon}</div>
        </div>
      ) : null}

      <div style={styles.content}>
        <div style={styles.topBody}>
          {!image && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: isHovered ? selectedScheme.bgHover : selectedScheme.bg,
                color: isHovered ? '#FFFFFF' : selectedScheme.color,
                marginBottom: '0.5rem',
                transition: 'all 0.3s ease',
              }}
            >
              {icon}
            </div>
          )}
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.description}>{description}</p>

          {tags && tags.length > 0 && (
            <div style={styles.tagsWrapper}>
              {tags.map((t, idx) => (
                <span key={idx} style={styles.tag}>
                  ✓ {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ ...styles.ctaWrapper, gap: isHovered ? '0.75rem' : '0.5rem' }}>
          <span>Explorar servicio</span>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};

export default Card;