import React, { useState } from 'react';
import { exportCotizacionExcel, CotizacionItem, CotizacionData } from '../../utils/excelExporter';
import { numeroALetras } from '../../utils/numberToWords';

interface CotizadorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_CATALOGO = [
  {
    clave: '101',
    concepto: 'INSTALACION DE ACOMETIDA DE 110V INCLUYE MATERIAL ELECTRICO, TUBERIA 1 1/4, CABLE C.8, MUFA, BASE DE MEDICION, VARILLA DE TIERRA, TUBO DE 1/2 CON CONECTOR, CENTRO DE CARGA 2 POLOS, 1 NEUTRO CAPACIDAD DE 60 AMP NOMINAL CON TENSION DE CABLE CALIBRE 10 AWG.',
    unidad: 'LOTE',
    precioUnitario: 2846.62,
  },
  {
    clave: '407',
    concepto: 'MANO DE OBRA EN INSTALACION DE ACOMETIDA, CENTRO DE CARGA Y CABLEADO BASICO DE LINEA DE CALIBRE 10 AWG DEL POSTE A CENTRO DEL DOMICILIO A NO MAYOR DE 12 MTRS DE DISTANCIA.',
    unidad: 'SERVICO',
    precioUnitario: 1350.00,
  },
  {
    clave: '102',
    concepto: 'INSTALACION DE ACOMETIDA DE 220V BIFÁSICA INCLUYE BASE DE MEDICION 220V, CENTRO DE CARGA, INTERRUPTORES TERMOMAGNÉTICOS, VARILLA DE TIERRA Y CABLEADO.',
    unidad: 'LOTE',
    precioUnitario: 3950.00,
  },
  {
    clave: '103',
    concepto: 'CAMBIO Y ACTUALIZACIÓN DE TABLERO ELÉCTRICO RESIDENCIAL DE 4 A 8 CIRCUITOS CON PASTILLAS TERMOMAGNÉTICAS.',
    unidad: 'SERVICIO',
    precioUnitario: 2200.00,
  },
  {
    clave: '104',
    concepto: 'INSTALACIÓN DE CENTRO DE CARGA DE 2 A 4 PASTILLAS TERMOMAGNÉTICAS CON PASTILLAS INCLUIDAS.',
    unidad: 'PZA',
    precioUnitario: 1500.00,
  },
  {
    clave: '105',
    concepto: 'INSTALACIÓN Y CABLEADO DE CONTACTOS DUPLICES Y APAGADORES SENCILLOS EN PUNTOS EXISTENTES.',
    unidad: 'PZA',
    precioUnitario: 250.00,
  },
  {
    clave: '106',
    concepto: 'LOCALIZACIÓN Y REPARACIÓN DE FALLA / CORTOCIRCUITO EN CIRCUITO ELÉCTRICO RESIDENCIAL O COMERCIAL.',
    unidad: 'SERVICIO',
    precioUnitario: 850.00,
  },
];

const CotizadorElectricidadModal: React.FC<CotizadorModalProps> = ({ isOpen, onClose }) => {
  const [cliente, setCliente] = useState('');
  const [obra, setObra] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcionTrabajos, setDescripcionTrabajos] = useState('');
  const [consecutivo, setConsecutivo] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  const [items, setItems] = useState<CotizacionItem[]>([
    {
      clave: '',
      concepto: '',
      unidad: 'SERVICIO',
      cantidad: 1,
      precioUnitario: 0,
    },
  ]);

  const handleClearAll = () => {
    setCliente('');
    setObra('');
    setUbicacion('');
    setDescripcionTrabajos('');
    setConsecutivo('');
    setItems([
      {
        clave: '',
        concepto: '',
        unidad: 'SERVICIO',
        cantidad: 1,
        precioUnitario: 0,
      },
    ]);
  };

  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleAddItem = (presetIndex?: number) => {
    if (presetIndex !== undefined && PRESET_CATALOGO[presetIndex]) {
      const p = PRESET_CATALOGO[presetIndex];
      setItems([
        ...items,
        {
          clave: p.clave,
          concepto: p.concepto,
          unidad: p.unidad,
          cantidad: 1,
          precioUnitario: p.precioUnitario,
        },
      ]);
    } else {
      setItems([
        ...items,
        {
          clave: `${100 + items.length + 1}`,
          concepto: '',
          unidad: 'SERVICIO',
          cantidad: 1,
          precioUnitario: 0,
        },
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: keyof CotizacionItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  // Cálculos
  const subtotal = items.reduce((acc, item) => acc + (Number(item.cantidad) || 0) * (Number(item.precioUnitario) || 0), 0);
  const iva = subtotal * 0.16;
  const granTotal = subtotal + iva;

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const data: CotizacionData = {
        cliente,
        obra,
        ubicacion,
        descripcionTrabajos,
        consecutivo,
        fecha,
        items,
      };
      await exportCotizacionExcel(data);
    } catch (err) {
      console.error('Error al generar Excel:', err);
      alert('Hubo un problema al generar el archivo de Excel.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSendWhatsApp = () => {
    let msg = `*COTIZACIÓN ELÉCTRICA - MIT TAMPICO*\n`;
    msg += `📋 *Cliente:* ${cliente}\n`;
    msg += `🏗️ *Obra:* ${obra}\n`;
    msg += `📍 *Ubicación:* ${ubicacion}\n`;
    msg += `📝 *Trabajos:* ${descripcionTrabajos}\n\n`;
    msg += `*CONCEPTOS:*\n`;
    items.forEach((item, idx) => {
      const imp = (item.cantidad || 0) * (item.precioUnitario || 0);
      msg += `${idx + 1}. [${item.clave}] ${item.concepto.substring(0, 50)}...\n   Cant: ${item.cantidad} ${item.unidad} | P.U: $${item.precioUnitario.toLocaleString()} | Imp: $${imp.toLocaleString()}\n`;
    });
    msg += `\n*Subtotal:* $${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n`;
    msg += `*IVA (16%):* $${iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n`;
    msg += `*GRAN TOTAL:* $${granTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n`;
    msg += `\n${numeroALetras(granTotal)}`;

    const url = `https://wa.me/528331474478?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header Modal */}
        <div style={styles.header}>
          <div>
            <span style={styles.badge}>GENERA TU COTIZACIÓN OFICIAL</span>
            <h2 style={{ ...styles.title, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Cotizador de Electricidad (Excel)
            </h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Cerrar modal">✕</button>
        </div>

        {/* Content */}
        <div style={styles.body}>
          {/* Fila 1: Datos Generales */}
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>1. Datos de la Obra y Cliente</h3>
            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>Cliente / Empresa:</label>
                <input
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  style={styles.input}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div>
                <label style={styles.label}>Obra / Tipo de Trabajo:</label>
                <input
                  type="text"
                  value={obra}
                  onChange={(e) => setObra(e.target.value)}
                  style={styles.input}
                  placeholder="Ej. Instalación eléctrica"
                />
              </div>
              <div>
                <label style={styles.label}>Ubicación:</label>
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  style={styles.input}
                  placeholder="Ej. Tampico, Tamaulipas"
                />
              </div>
              <div>
                <label style={styles.label}>No. Consecutivo / Folio:</label>
                <input
                  type="text"
                  value={consecutivo}
                  onChange={(e) => setConsecutivo(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={styles.label}>Descripción General de los Trabajos:</label>
                <input
                  type="text"
                  value={descripcionTrabajos}
                  onChange={(e) => setDescripcionTrabajos(e.target.value)}
                  style={styles.input}
                  placeholder="Ej. INSTALACION DE ACOMETIDA 110 V"
                />
              </div>
            </div>
          </div>

          {/* Fila 2: Conceptos */}
          <div style={styles.sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={styles.sectionTitle}>2. Conceptos y Mano de Obra</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  onChange={(e) => {
                    if (e.target.value !== '') {
                      handleAddItem(Number(e.target.value));
                      e.target.value = '';
                    }
                  }}
                  style={styles.selectPreset}
                >
                  <option value="">+ Agregar concepto predefinido...</option>
                  {PRESET_CATALOGO.map((cat, i) => (
                    <option key={i} value={i}>
                      [{cat.clave}] {cat.concepto.substring(0, 45)}... (${cat.precioUnitario})
                    </option>
                  ))}
                </select>

                <button onClick={() => handleAddItem()} style={styles.btnSec}>
                  + Fila en Blanco
                </button>
              </div>
            </div>

            {/* Lista de Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item, idx) => {
                const itemImporte = (Number(item.cantidad) || 0) * (Number(item.precioUnitario) || 0);
                return (
                  <div key={idx} style={styles.itemRow}>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 90px 110px 120px 40px', gap: '0.5rem', alignItems: 'center' }}>
                      <div>
                        <label style={styles.miniLabel}>Clave</label>
                        <input
                          type="text"
                          value={item.clave}
                          onChange={(e) => handleItemChange(idx, 'clave', e.target.value)}
                          style={styles.inputSmall}
                        />
                      </div>
                      <div>
                        <label style={styles.miniLabel}>Concepto de Trabajo</label>
                        <input
                          type="text"
                          value={item.concepto}
                          onChange={(e) => handleItemChange(idx, 'concepto', e.target.value)}
                          style={styles.inputSmall}
                        />
                      </div>
                      <div>
                        <label style={styles.miniLabel}>Unidad</label>
                        <input
                          type="text"
                          value={item.unidad}
                          onChange={(e) => handleItemChange(idx, 'unidad', e.target.value)}
                          style={styles.inputSmall}
                        />
                      </div>
                      <div>
                        <label style={styles.miniLabel}>Cantidad</label>
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad}
                          onChange={(e) => handleItemChange(idx, 'cantidad', parseFloat(e.target.value) || 0)}
                          style={styles.inputSmall}
                        />
                      </div>
                      <div>
                        <label style={styles.miniLabel}>P. Unitario ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.precioUnitario}
                          onChange={(e) => handleItemChange(idx, 'precioUnitario', parseFloat(e.target.value) || 0)}
                          style={styles.inputSmall}
                        />
                      </div>
                      <div>
                        <label style={styles.miniLabel}>Importe</label>
                        <div style={styles.importeBox}>
                          ${itemImporte.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <label style={styles.miniLabel}>&nbsp;</label>
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          disabled={items.length <= 1}
                          style={styles.removeBtn}
                          title="Eliminar fila"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fila 3: Resumen de Totales */}
          <div style={styles.totalsCard}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>MONTO EN LETRAS:</span>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>
                {numeroALetras(granTotal)}
              </p>
            </div>

            <div style={styles.totalsColumn}>
              <div style={styles.totalRow}>
                <span>Subtotal:</span>
                <strong>${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              </div>
              <div style={styles.totalRow}>
                <span>IVA (16%):</span>
                <strong>${iva.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              </div>
              <div style={styles.granTotalRow}>
                <span>GRAN TOTAL:</span>
                <span>${granTotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={styles.footerActions}>
          <button onClick={onClose} style={styles.btnCancel}>
            Cerrar
          </button>
          <button onClick={handleExportExcel} disabled={isExporting} style={{ ...styles.btnExcel, display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="8" y1="13" x2="16" y2="13"></line>
              <line x1="8" y1="17" x2="16" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {isExporting ? 'Generando Excel...' : 'Descargar Cotización en Excel (.xlsx)'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(5px)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  } as React.CSSProperties,
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  } as React.CSSProperties,
  header: {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #E2E8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
  } as React.CSSProperties,
  badge: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#2563EB',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  } as React.CSSProperties,
  title: {
    margin: '0.25rem 0 0',
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#0F172A',
  } as React.CSSProperties,
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#64748B',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    borderRadius: '8px',
  } as React.CSSProperties,
  body: {
    padding: '1.5rem 2rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  } as React.CSSProperties,
  sectionCard: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '1.25rem',
  } as React.CSSProperties,
  sectionTitle: {
    margin: '0 0 0.85rem',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#1E293B',
  } as React.CSSProperties,
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '0.85rem',
  } as React.CSSProperties,
  label: {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '0.25rem',
  } as React.CSSProperties,
  miniLabel: {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: '#64748B',
    marginBottom: '0.2rem',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '0.88rem',
    outline: 'none',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  inputSmall: {
    width: '100%',
    padding: '0.4rem 0.5rem',
    borderRadius: '6px',
    border: '1px solid #CBD5E1',
    fontSize: '0.82rem',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  importeBox: {
    padding: '0.4rem 0.5rem',
    backgroundColor: '#E2E8F0',
    borderRadius: '6px',
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#0F172A',
    textAlign: 'right',
  } as React.CSSProperties,
  selectPreset: {
    padding: '0.4rem 0.75rem',
    borderRadius: '8px',
    border: '1px solid #94A3B8',
    fontSize: '0.82rem',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    maxWidth: '280px',
  } as React.CSSProperties,
  btnSec: {
    padding: '0.4rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #2563EB',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'pointer',
  } as React.CSSProperties,
  itemRow: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    padding: '0.75rem',
  } as React.CSSProperties,
  removeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    opacity: 0.8,
  } as React.CSSProperties,
  totalsCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: '12px',
    padding: '1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  totalsColumn: {
    minWidth: '220px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  } as React.CSSProperties,
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#334155',
  } as React.CSSProperties,
  granTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.1rem',
    fontWeight: 800,
    color: '#1E3A8A',
    borderTop: '2px solid #CBD5E1',
    paddingTop: '0.4rem',
    marginTop: '0.2rem',
  } as React.CSSProperties,
  footerActions: {
    padding: '1.25rem 2rem',
    borderTop: '1px solid #E2E8F0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    backgroundColor: '#F8FAFC',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  btnCancel: {
    padding: '0.65rem 1.25rem',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    backgroundColor: '#FFFFFF',
    color: '#475569',
    fontWeight: 600,
    cursor: 'pointer',
  } as React.CSSProperties,
  btnWhatsApp: {
    padding: '0.65rem 1.25rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#16A34A',
    color: '#FFFFFF',
    fontWeight: 700,
    cursor: 'pointer',
  } as React.CSSProperties,
  btnExcel: {
    padding: '0.65rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#1E3A8A',
    color: '#FFFFFF',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
  } as React.CSSProperties,
};

export default CotizadorElectricidadModal;
