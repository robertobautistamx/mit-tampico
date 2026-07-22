import React, { useState, useEffect } from 'react';
import { navItems } from '../../modules/header/header.data';
import { getStyles } from './header.styles';
import { DropdownIcon, MenuIcon, CartIcon, UserIcon, GlobeIcon } from './header.icons';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Lógica de ScrollSpy (Detectar qué sección está visible)
      const sections = [...navItems.map((item: any) => item.id), 'contacto'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Si la sección cruza una línea imaginaria de 150px desde el techo de la pantalla
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveItem(section);
          }
        }
      }
      // Asegurar que el botón "Contactar" se coloree al llegar al límite inferior de la página
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveItem('contacto');
      }
    };
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false); // Cierra el menú al cambiar a desktop
      }
    };

    handleResize(); // Comprobación inicial

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Prevenir el scroll del fondo cuando el menú móvil a pantalla completa está abierto
    if (isMobile) {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, isMobile]);

  const styles = getStyles(isScrolled, isMobile, hoveredItem, isMenuOpen, activeItem);

  // Función para manejar la navegación entre páginas y scroll suave
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, hasSubItems: boolean = false) => {
    e.preventDefault();

    window.location.hash = '#' + id;

    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 90;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }

    if (!hasSubItems && isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header style={styles.header}>
      <style>
        {`
          .dropdown-link:hover {
            background-color: ${isMobile ? 'transparent' : '#F1F5F9'} !important;
            color: #3B82F6 !important;
            padding-left: ${isMobile ? '1.5rem' : '1.75rem'} !important;
          }
          
          /* Animación de línea para links de navegación en Desktop */
          @media (min-width: 1025px) {
            .nav-link-custom {
              position: relative;
            }
            .nav-link-custom::after {
              content: '';
              position: absolute;
              bottom: -4px;
              left: 50%;
              width: 0;
              height: 2px;
              background: linear-gradient(90deg, #60A5FA 0%, #2563EB 100%);
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              transform: translateX(-50%);
              border-radius: 4px;
            }
            .nav-link-custom:hover::after, .nav-link-custom.active::after {
              width: 80%;
            }
          }
        `}
      </style>
      <div style={styles.container}>

        {/* LOGO */}
        <a href="#inicio" style={styles.logoContainer} onClick={(e) => handleNavClick(e, 'inicio')}>
          <img src="/Logo-PNG.png" alt="Logo MIT Tampico" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
          <span style={styles.logoText}>
            <span style={{ color: '#3B82F6', fontWeight: 800 }}>MIT</span>{' '}
            <span style={{ color: '#F8FAFC', fontWeight: 500 }}>TAMPICO</span>
          </span>
        </a>

        {/* BOTÓN MENÚ MÓVIL */}
        {isMobile && (
          <button
            style={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Alternar menú"
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        )}

        {/* MENÚ Y REDES (Colapsable en móvil) */}
        <div style={styles.navWrapper}>
          <nav style={styles.navCenter}>
            {navItems.map((item: any) => (
              <div
                key={item.id}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={`#${item.id}`}
                  className={`nav-link-custom ${activeItem === item.id ? 'active' : ''}`}
                  style={styles.navLink(item.id)}
                  onClick={(e) => handleNavClick(e, item.id, !!item.subItems)}
                >
                  {item.label}
                  {item.subItems && <DropdownIcon />}
                </a>

                {item.subItems && (
                  <div
                    style={styles.dropdown(hoveredItem === item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.subItems.map((sub: any) => (
                      <a
                        key={sub.id}
                        href={`#${sub.hash || sub.id}`}
                        className="dropdown-link"
                        style={styles.dropdownLink}
                        onClick={(e) => {
                          // No usar handleNavClick aquí.
                          // Dejar que el href nativo funcione para cambiar de página.
                          if (isMobile) setIsMenuOpen(false);
                        }}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={styles.rightSection}>
            {/* UTILIDADES: Idioma, Login, Carrito (Oculto temporalmente)
            <div style={styles.utilitiesContainer}>
              <button style={styles.utilityIcon('lang')} onMouseEnter={() => setHoveredItem('lang')} onMouseLeave={() => setHoveredItem(null)}>
                <GlobeIcon />
                <span style={{ fontSize: '0.85rem', marginLeft: '0.35rem', fontWeight: 600, letterSpacing: '0.02em', paddingTop: '1px' }}>ES</span>
              </button>
              <button style={styles.utilityIcon('user')} onMouseEnter={() => setHoveredItem('user')} onMouseLeave={() => setHoveredItem(null)}>
                <UserIcon />
              </button>
              <button style={styles.utilityIcon('cart')} onMouseEnter={() => setHoveredItem('cart')} onMouseLeave={() => setHoveredItem(null)}>
                <CartIcon />
              </button>
            </div>
            */}

            <a
              href="#contacto"
              style={styles.btnContact}
              onMouseEnter={() => setHoveredItem('contacto')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={(e) => handleNavClick(e, 'contacto')}
            >
              Contactar
            </a>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;