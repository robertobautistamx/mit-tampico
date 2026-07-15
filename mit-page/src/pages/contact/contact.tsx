import React, { useState } from 'react';
import Button from '../../components/buttons/Button';
import Input from '../../components/input/Input';
import Textarea from '../../Textarea';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    aceptado: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.aceptado) {
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/v1/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          mensaje: '',
          aceptado: false,
        });
      } else {
        throw new Error(data.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const styles = {
    section: {
      position: 'relative',
      padding: '7rem 2rem',
      background: 'linear-gradient(135deg, #1E3A8A 0%, #172554 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    } as React.CSSProperties,
    container: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '4rem',
      alignItems: 'center',
    } as React.CSSProperties,
    leftCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      color: '#FFFFFF',
      textAlign: 'left',
    } as React.CSSProperties,
    badge: {
      fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
      fontWeight: 600,
      color: '#60A5FA',
      lineHeight: 1.4,
      maxWidth: '500px',
      letterSpacing: '0.01em',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#FFFFFF',
      margin: 0,
    } as React.CSSProperties,
    rightCol: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    } as React.CSSProperties,
    formCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      padding: '3rem 2.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '550px',
      boxSizing: 'border-box',
    } as React.CSSProperties,
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
    } as React.CSSProperties,
    checkboxContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      fontSize: '0.85rem',
      color: '#64748B',
      marginTop: '0.5rem',
      cursor: 'pointer',
    } as React.CSSProperties,
    checkbox: {
      marginTop: '0.15rem',
      cursor: 'pointer',
    } as React.CSSProperties,
    privacyLink: {
      color: '#2563EB',
      textDecoration: 'none',
      fontWeight: 600,
    } as React.CSSProperties,
    alertSuccess: {
      backgroundColor: '#ECFDF5',
      border: '1px solid #10B981',
      borderRadius: '8px',
      color: '#065F46',
      padding: '1rem',
      fontSize: '0.9rem',
      fontWeight: 500,
      textAlign: 'center',
    } as React.CSSProperties,
    alertError: {
      backgroundColor: '#FEF2F2',
      border: '1px solid #EF4444',
      borderRadius: '8px',
      color: '#991B1B',
      padding: '1rem',
      fontSize: '0.9rem',
      fontWeight: 500,
      textAlign: 'center',
    } as React.CSSProperties,
  };

  return (
    <section id="contacto" style={styles.section}>
      <style>
        {`
          @media (max-width: 768px) {
            #contacto {
              padding: 4rem 1.5rem !important;
            }
            .contact-container {
              gap: 2.5rem !important;
            }
            .contact-left-col {
              text-align: center !important;
              align-items: center !important;
            }
          }
        `}
      </style>
      
      <div className="contact-container" style={styles.container}>
        {/* Columna Izquierda - Mensaje */}
        <div className="contact-left-col" style={styles.leftCol}>
          <span style={styles.badge}>
            ¿Necesitas soporte técnico o un proyecto a tu medida?
          </span>
          <h2 style={styles.title}>
            Soluciones profesionales en climatización, electricidad y tecnología.
          </h2>
        </div>

        {/* Columna Derecha - Tarjeta de Formulario */}
        <div style={styles.rightCol}>
          <div style={styles.formCard}>
            <form style={styles.form} onSubmit={handleSubmit}>
              {status === 'success' && (
                <div style={styles.alertSuccess}>
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                </div>
              )}
              {status === 'error' && (
                <div style={styles.alertError}>
                  Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctanos por otro medio.
                </div>
              )}
              
              <Input 
                label="Nombre*" 
                type="text" 
                placeholder="Nombre*" 
                required 
                value={formData.nombre}
                disabled={status === 'submitting'}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
              <Input 
                label="Email*" 
                type="email" 
                placeholder="Email*" 
                required 
                value={formData.email}
                disabled={status === 'submitting'}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input 
                label="Teléfono*" 
                type="tel" 
                placeholder="Teléfono*" 
                required 
                value={formData.telefono}
                disabled={status === 'submitting'}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
              <Textarea 
                label="Mensaje (opcional)" 
                placeholder="Mensaje (opcional)" 
                value={formData.mensaje}
                disabled={status === 'submitting'}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              />
              
              <label style={styles.checkboxContainer}>
                <input 
                  type="checkbox" 
                  style={styles.checkbox} 
                  required
                  checked={formData.aceptado}
                  disabled={status === 'submitting'}
                  onChange={(e) => setFormData({ ...formData, aceptado: e.target.checked })}
                />
                <span>
                  He leído y acepto la <a href="#privacidad" style={styles.privacyLink}>política de privacidad</a>
                </span>
              </label>

              <Button 
                variant="primary" 
                type="submit"
                disabled={status === 'submitting'}
                customStyles={{ marginTop: '1rem', width: '100%', padding: '0.9rem' }}
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;