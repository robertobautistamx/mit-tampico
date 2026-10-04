import React, { useState, useRef, useEffect } from 'react';

interface FaqChatbotProps {
  onOpenCotizador?: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

const normalizeText = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'hi'],
    answer: 'Hola, ¿en qué podemos ayudarte?',
  },
  {
    keywords: ['cotiz', 'cotizacion', 'presupuesto', 'cuanto cuesta', 'precio', 'cotizar'],
    answer: 'Puedes generar una cotización oficial de electricidad al instante y descargarla en Excel. Haz clic en el botón a continuación para abrir el cotizador interactivo.',
    isCotizador: true,
  },
  {
    keywords: ['telefono', 'celular', 'llamar', 'numero', 'contacto', 'horario', 'hora', 'atienden'],
    answer: 'Teléfonos de contacto:\n• +52 833 147 4478\n• +52 833 382 1860\n\nHorario de atención:\nLun - Vie: 08:00 - 18:00\nSáb: 08:00 - 13:00',
  },
  {
    keywords: ['zona', 'donde', 'cobertura', 'tampico', 'madero', 'altamira', 'ubica', 'tabasco', 'ciudad', 'direccion'],
    answer: 'Brindamos servicio a domicilio en Tampico, Ciudad Madero, Altamira y zonas conurbadas en Tamaulipas, así como proyectos en Villahermosa, Tabasco.',
  },
  {
    keywords: ['clima', 'aire', 'minisplit', 'refrigeracion', 'refrigerac', 'climatiz', 'mantenimiento clima', 'gas', 'frio', 'climas'],
    answer: 'Servicios de Climatización y Refrigeración:\n• Instalación de Minisplit y Split\n• Mantenimiento preventivo y correctivo\n• Carga de gas refrigerante\n• Reparación de fallas en A/C y cambio de refacciones.',
  },
  {
    keywords: ['pagina', 'web', 'computadora', 'laptop', 'sistema', 'app', 'aplicacion', 'desarrollo', 'informatica', 'software'],
    answer: 'Servicios de Informática y Tecnología:\n• Desarrollo de páginas web y landing pages\n• Desarrollo de aplicaciones móviles\n• Reparación de laptops y computadoras\n• Instalación de software y formateo\n• Soporte técnico remoto y presencial.',
  },
  {
    keywords: ['electric', 'luz', 'acometida', 'tablero', 'corto', 'tierra', 'pastilla', 'falla'],
    answer: 'Servicios Eléctricos:\n• Instalación de acometidas 110V y 220V\n• Cambio y actualización de tableros eléctricos\n• Reparación de cortocircuitos y fallas\n• Instalación de lámparas, contactos y centros de carga.',
  },
  {
    keywords: ['whatsapp', 'mensaj', 'chat', 'directo', 'hablar'],
    answer: 'Teléfonos de atención directa y chat por WhatsApp:\n• +52 833 147 4478\n• +52 833 382 1860\n\nHaz clic en el número con el que deseas chatear a continuación:',
    isWhatsApp: true,
  },
  {
    keywords: ['pago', 'anticipo', 'factura', 'transferencia', 'tarjeta'],
    answer: 'Aceptamos transferencias bancarias, efectivo y depósitos. Para proyectos y trabajos mayores se solicita un 60% de anticipo para iniciar la compra de materiales y programación del servicio.',
  },
];

const FaqChatbot: React.FC<FaqChatbotProps> = ({ onOpenCotizador }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '¡Hola! Bienvenido a Multiservicios Integrales Tampico. ¿En qué podemos ayudarte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [messages, isOpen]);

  const addBotResponse = (text: string, isCotizador?: boolean, isWhatsApp?: boolean) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      text,
      timestamp: time,
    };

    if (isCotizador && onOpenCotizador) {
      newMsg.quickActions = [
        {
          label: 'Abrir Cotizador de Electricidad',
          action: () => {
            setIsOpen(false);
            onOpenCotizador();
          },
        },
      ];
    } else if (isWhatsApp) {
      newMsg.quickActions = [
        {
          label: 'Chatear con +52 833 147 4478',
          action: () => window.open('https://wa.me/528331474478', '_blank'),
        },
        {
          label: 'Chatear con +52 833 382 1860',
          action: () => window.open('https://wa.me/528333821860', '_blank'),
        },
      ];
    }

    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputText.trim();
    if (!textToSend) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');

    // Procesar respuesta automática normalizando acentos
    setTimeout(() => {
      const normalizedQuery = normalizeText(textToSend);
      let match = FAQ_KNOWLEDGE_BASE.find((faq) =>
        faq.keywords.some((k) => normalizedQuery.includes(normalizeText(k)))
      );

      if (match) {
        addBotResponse(match.answer, match.isCotizador, match.isWhatsApp);
      } else {
        addBotResponse(
          'Gracias por comunicarte. Para brindarte información exacta sobre tu requerimiento específico, te sugerimos contactarnos directamente por teléfono (+52 833 147 4478) o WhatsApp.',
          false,
          true
        );
      }
    }, 400);
  };

  return (
    <>
      {/* Botón Flotante */}
      <div style={styles.floatingContainer}>
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} style={styles.floatingBtn} aria-label="Abrir Asistente Chatbot">
            <span style={styles.onlineDot} />
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span style={styles.btnBadge}>FAQ</span>
          </button>
        )}
      </div>

      {/* Fondo Bloqueado (Backdrop Overlay) */}
      {isOpen && (
        <div style={styles.backdropOverlay} onClick={() => setIsOpen(false)} />
      )}

      {/* Ventana de Chat Ampliada para PC */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.chatHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={styles.avatarBox}>
                <span style={styles.avatarDot} />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <circle cx="12" cy="5" r="2"></circle>
                  <path d="M12 7v4"></path>
                  <line x1="8" y1="16" x2="8.01" y2="16"></line>
                  <line x1="16" y1="16" x2="16.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>Asistente MIT</h4>
                <span style={{ fontSize: '0.78rem', color: '#93C5FD', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '7px', height: '7px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  En línea | Respuestas instantáneas
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeHeaderBtn} aria-label="Cerrar chat">✕</button>
          </div>

          {/* Body de Mensajes */}
          <div style={styles.chatBody}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.85rem 1.15rem',
                    borderRadius: m.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                    backgroundColor: m.sender === 'user' ? '#2563EB' : '#FFFFFF',
                    color: m.sender === 'user' ? '#FFFFFF' : '#1E293B',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    fontSize: '0.92rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {m.text}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.25rem', padding: '0 0.35rem' }}>
                  {m.timestamp}
                </span>

                {/* Botones de acción rápida si existen */}
                {m.quickActions && m.quickActions.map((qa, i) => (
                  <button
                    key={i}
                    onClick={qa.action}
                    style={styles.quickActionBtn}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    {qa.label}
                  </button>
                ))}
              </div>
            ))}

            {/* Opciones Frecuentes Rápidas perfectamente ordenadas */}
            <div style={styles.faqChipsBox}>
              <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, width: '100%', marginBottom: '0.4rem' }}>
                Preguntas sugeridas:
              </span>

              <div style={styles.faqChipsGrid}>
                <button onClick={() => handleSendMessage('¿Cómo puedo hacer una cotización de electricidad?')} style={styles.faqChip}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  <span>Cotizador de Electricidad</span>
                </button>

                <button onClick={() => handleSendMessage('¿Cuáles son sus números y horarios?')} style={styles.faqChip}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>Teléfonos y Horarios</span>
                </button>

                <button onClick={() => handleSendMessage('¿Qué servicios de refrigeración ofrecen?')} style={styles.faqChip}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"></path><path d="M20 12H2"></path><path d="m4.93 4.93 14.14 14.14"></path><path d="m19.07 4.93-14.14 14.14"></path>
                  </svg>
                  <span>Aires Acondicionados</span>
                </button>

                <button onClick={() => handleSendMessage('¿Qué servicios tienen de páginas web e informática?')} style={styles.faqChip}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <span>Sistemas e Informática</span>
                </button>

                <button onClick={() => handleSendMessage('¿En qué ciudades ofrecen servicio?')} style={styles.faqChip}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Cobertura y Ciudades</span>
                </button>

                <button onClick={() => handleSendMessage('Quiero hablar por WhatsApp')} style={styles.faqChip}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>Contacto directo por WhatsApp</span>
                </button>
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de Entrada */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={styles.chatFooter}
          >
            <input
              type="text"
              placeholder="Escribe tu duda aquí..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={styles.chatInput}
            />
            <button type="submit" style={styles.sendBtn} title="Enviar mensaje">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

const styles = {
  floatingContainer: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9990,
  } as React.CSSProperties,
  floatingBtn: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#2563EB',
    border: 'none',
    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.2s',
  } as React.CSSProperties,
  onlineDot: {
    position: 'absolute',
    top: '3px',
    right: '3px',
    width: '14px',
    height: '14px',
    backgroundColor: '#10B981',
    border: '2px solid #FFFFFF',
    borderRadius: '50%',
  } as React.CSSProperties,
  btnBadge: {
    position: 'absolute',
    bottom: '-4px',
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    fontSize: '0.68rem',
    fontWeight: 800,
    padding: '2px 7px',
    borderRadius: '8px',
  } as React.CSSProperties,
  backdropOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    backdropFilter: 'blur(3px)',
    zIndex: 9991,
  } as React.CSSProperties,
  chatWindow: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '460px',
    maxWidth: 'calc(100vw - 32px)',
    height: '640px',
    maxHeight: 'calc(100vh - 40px)',
    backgroundColor: '#F8FAFC',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.4)',
    zIndex: 9995,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1px solid #CBD5E1',
  } as React.CSSProperties,
  chatHeader: {
    backgroundColor: '#1E3A8A',
    padding: '1.1rem 1.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,
  avatarBox: {
    position: 'relative',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  avatarDot: {
    position: 'absolute',
    bottom: 0, right: 0,
    width: '11px', height: '11px',
    backgroundColor: '#10B981',
    borderRadius: '50%',
    border: '2px solid #1E3A8A',
  } as React.CSSProperties,
  closeHeaderBtn: {
    background: 'none',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '1.3rem',
    cursor: 'pointer',
    opacity: 0.85,
    padding: '0.2rem 0.5rem',
  } as React.CSSProperties,
  chatBody: {
    flex: 1,
    padding: '1.25rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  quickActionBtn: {
    marginTop: '0.5rem',
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#1E3A8A',
    color: '#FFFFFF',
    fontSize: '0.85rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
  } as React.CSSProperties,
  faqChipsBox: {
    marginTop: '1.25rem',
    paddingTop: '0.85rem',
    borderTop: '1px dashed #CBD5E1',
  } as React.CSSProperties,
  faqChipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.45rem',
    width: '100%',
  } as React.CSSProperties,
  faqChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    width: '100%',
    padding: '0.55rem 0.65rem',
    borderRadius: '10px',
    border: '1px solid #CBD5E1',
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  } as React.CSSProperties,
  chatFooter: {
    padding: '0.85rem 1.15rem',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E2E8F0',
    display: 'flex',
    gap: '0.6rem',
    alignItems: 'center',
  } as React.CSSProperties,
  chatInput: {
    flex: 1,
    padding: '0.7rem 1rem',
    borderRadius: '24px',
    border: '1px solid #CBD5E1',
    fontSize: '0.9rem',
    outline: 'none',
  } as React.CSSProperties,
  sendBtn: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
};

export default FaqChatbot;
