import ExcelJS from 'exceljs';
import { numeroALetras } from './numberToWords';

export interface CotizacionItem {
  clave: string;
  concepto: string;
  unidad: string;
  cantidad: number;
  precioUnitario: number;
}

export interface CotizacionData {
  cliente: string;
  obra: string;
  ubicacion: string;
  descripcionTrabajos: string;
  consecutivo: string;
  fecha: string;
  items: CotizacionItem[];
}

export async function exportCotizacionExcel(data: CotizacionData): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Multiservicios Integrales Tampico';
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet('Cotización Electricidad', {
    views: [{ showGridLines: true }],
    pageSetup: { paperSize: 9, orientation: 'portrait' },
  });

  // Anchos de columna
  worksheet.columns = [
    { key: 'clave', width: 12 },
    { key: 'concepto', width: 52 },
    { key: 'unidad', width: 14 },
    { key: 'cantidad', width: 12 },
    { key: 'pu', width: 15 },
    { key: 'importe', width: 18 },
  ];

  const thinBorder: Partial<ExcelJS.Borders> = {
    top: { style: 'thin', color: { argb: 'FF000000' } },
    left: { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    right: { style: 'thin', color: { argb: 'FF000000' } },
  };

  // --- FILAS DE ENCABEZADO ---

  // Fila 1: Título Principal
  worksheet.mergeCells('A1:F1');
  const titleCell = worksheet.getCell('A1');
  titleCell.value = 'Multiservicios Integrales Tampico';
  titleCell.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FF0F172A' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Fila 2: Subtítulo Azul
  worksheet.mergeCells('A2:F2');
  const subTitleCell = worksheet.getCell('A2');
  subTitleCell.value = 'SERVICIOS ELÉCTRICOS GENERAL';
  subTitleCell.font = { name: 'Calibri', size: 13, bold: true, color: { argb: 'FFFFFFFF' } };
  subTitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563EB' } };
  subTitleCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Fila 3: Responsable
  worksheet.mergeCells('A3:F3');
  const respCell = worksheet.getCell('A3');
  respCell.value = 'ALIPIO VICENTE ZALAYA';
  respCell.font = { name: 'Calibri', size: 12, bold: true };
  respCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Fila 4: Dirección
  worksheet.mergeCells('A4:F4');
  const addrCell = worksheet.getCell('A4');
  addrCell.value = 'Tampico, Tamaulipas.';
  addrCell.font = { name: 'Calibri', size: 10, italic: false };
  addrCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Fila 5: Teléfonos
  worksheet.mergeCells('A5:F5');
  const telCell = worksheet.getCell('A5');
  telCell.value = 'TELÉFONO: 833 147 4478   |   OFICINA: 833 147 4478';
  telCell.font = { name: 'Calibri', size: 10, bold: true };
  telCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Fila 6: Barra Negra
  worksheet.mergeCells('A6:F6');
  const bannerCell = worksheet.getCell('A6');
  bannerCell.value = 'AIRES ACONDICIONADOS – ELECTRICIDAD INDUSTRIAL – MANTENIMIENTO';
  bannerCell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
  bannerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  bannerCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Fila 7: OBRA & FECHA
  worksheet.getCell('A7').value = 'OBRA:';
  worksheet.getCell('A7').font = { bold: true, size: 9 };
  worksheet.mergeCells('B7:C7');
  worksheet.getCell('B7').value = data.obra || 'Instalación eléctrica';
  worksheet.getCell('B7').alignment = { horizontal: 'left' };

  worksheet.getCell('D7').value = 'FECHA:';
  worksheet.getCell('D7').font = { bold: true, size: 9 };
  worksheet.mergeCells('E7:F7');
  worksheet.getCell('E7').value = data.fecha || new Date().toLocaleDateString('es-MX');
  worksheet.getCell('E7').alignment = { horizontal: 'center' };

  // Fila 8: CLIENTE & CONSECUTIVO
  worksheet.getCell('A8').value = 'CLIENTE:';
  worksheet.getCell('A8').font = { bold: true, size: 9 };
  worksheet.mergeCells('B8:C8');
  worksheet.getCell('B8').value = data.cliente || 'PÚBLICO EN GENERAL';
  worksheet.getCell('B8').alignment = { horizontal: 'left' };

  worksheet.getCell('D8').value = 'NO. CONSECUTIVO:';
  worksheet.getCell('D8').font = { bold: true, size: 9 };
  worksheet.mergeCells('E8:F8');
  worksheet.getCell('E8').value = data.consecutivo || '01';
  worksheet.getCell('E8').alignment = { horizontal: 'center' };

  // Fila 9: UBICACIÓN
  worksheet.getCell('A9').value = 'UBICACIÓN:';
  worksheet.getCell('A9').font = { bold: true, size: 9 };
  worksheet.mergeCells('B9:F9');
  worksheet.getCell('B9').value = data.ubicacion || 'Tampico, Tam.';
  worksheet.getCell('B9').alignment = { horizontal: 'left' };

  // Fila 10: DESCRIPCIÓN DE TRABAJOS
  worksheet.getCell('A10').value = 'DESCRIPCIÓN DE TRABAJOS:';
  worksheet.getCell('A10').font = { bold: true, size: 9 };
  worksheet.mergeCells('B10:F10');
  worksheet.getCell('B10').value = data.descripcionTrabajos || 'INSTALACIÓN Y SERVICIO ELÉCTRICO';
  worksheet.getCell('B10').alignment = { horizontal: 'left' };

  // Aplicar bordes a las filas de datos cliente (7-10)
  for (let r = 7; r <= 10; r++) {
    for (let c = 1; c <= 6; c++) {
      worksheet.getCell(r, c).border = thinBorder;
    }
  }

  // --- FILA 11: ENCABEZADOS DE LA TABLA ---
  const headers = ['CLAVE', 'CONCEPTO DE TRABAJO A REALIZAR', 'UNIDAD', 'CANTIDAD', 'P.U.', 'IMPORTE'];
  headers.forEach((h, idx) => {
    const cell = worksheet.getCell(11, idx + 1);
    cell.value = h;
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF0F172A' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
    cell.alignment = { horizontal: idx === 1 ? 'left' : (idx >= 3 ? 'right' : 'center'), vertical: 'middle' };
    cell.border = thinBorder;
  });

  // --- FILAS DE ITEMS (A partir de fila 12) ---
  let currentRow = 12;
  let subtotalSum = 0;

  data.items.forEach((item) => {
    const cantidad = Number(item.cantidad) || 0;
    const pu = Number(item.precioUnitario) || 0;
    const importe = cantidad * pu;
    subtotalSum += importe;

    // Clave
    const cellClave = worksheet.getCell(currentRow, 1);
    cellClave.value = item.clave || '';
    cellClave.alignment = { horizontal: 'center', vertical: 'middle' };
    cellClave.border = thinBorder;

    // Concepto
    const cellConcepto = worksheet.getCell(currentRow, 2);
    cellConcepto.value = item.concepto || '';
    cellConcepto.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    cellConcepto.border = thinBorder;

    // Unidad
    const cellUnidad = worksheet.getCell(currentRow, 3);
    cellUnidad.value = item.unidad || 'SERVICIO';
    cellUnidad.alignment = { horizontal: 'center', vertical: 'middle' };
    cellUnidad.border = thinBorder;

    // Cantidad
    const cellCantidad = worksheet.getCell(currentRow, 4);
    cellCantidad.value = cantidad;
    cellCantidad.alignment = { horizontal: 'center', vertical: 'middle' };
    cellCantidad.border = thinBorder;

    // Precio Unitario
    const cellPU = worksheet.getCell(currentRow, 5);
    cellPU.value = pu;
    cellPU.numFmt = '"$"#,##0.00';
    cellPU.alignment = { horizontal: 'right', vertical: 'middle' };
    cellPU.border = thinBorder;

    // Importe
    const cellImporte = worksheet.getCell(currentRow, 6);
    cellImporte.value = { formula: `D${currentRow}*E${currentRow}`, result: importe };
    cellImporte.numFmt = '"$"#,##0.00';
    cellImporte.alignment = { horizontal: 'right', vertical: 'middle' };
    cellImporte.border = thinBorder;

    currentRow++;
  });

  // Si hay menos de 5 ítems, agregar filas vacías estéticas para mantener buena estructura
  while (currentRow < 17) {
    for (let c = 1; c <= 6; c++) {
      const cell = worksheet.getCell(currentRow, c);
      cell.border = thinBorder;
    }
    currentRow++;
  }

  const itemsStartRow = 12;
  const itemsEndRow = currentRow - 1;

  // --- FILAS DE TOTALES ---
  // Subtotal
  const subtotalRow = currentRow;
  worksheet.getCell(subtotalRow, 5).value = 'SUBTOTAL';
  worksheet.getCell(subtotalRow, 5).font = { bold: true, size: 10 };
  worksheet.getCell(subtotalRow, 5).alignment = { horizontal: 'right' };
  worksheet.getCell(subtotalRow, 5).border = thinBorder;

  const cellSubtotalVal = worksheet.getCell(subtotalRow, 6);
  cellSubtotalVal.value = { formula: `SUM(F${itemsStartRow}:F${itemsEndRow})`, result: subtotalSum };
  cellSubtotalVal.numFmt = '"$"#,##0.00';
  cellSubtotalVal.font = { bold: true };
  cellSubtotalVal.alignment = { horizontal: 'right' };
  cellSubtotalVal.border = thinBorder;
  currentRow++;

  // IVA (16%)
  const ivaRow = currentRow;
  worksheet.getCell(ivaRow, 5).value = 'IVA 16%';
  worksheet.getCell(ivaRow, 5).font = { bold: true, size: 10 };
  worksheet.getCell(ivaRow, 5).alignment = { horizontal: 'right' };
  worksheet.getCell(ivaRow, 5).border = thinBorder;

  const cellIvaVal = worksheet.getCell(ivaRow, 6);
  cellIvaVal.value = { formula: `F${subtotalRow}*0.16`, result: subtotalSum * 0.16 };
  cellIvaVal.numFmt = '"$"#,##0.00';
  cellIvaVal.font = { bold: true };
  cellIvaVal.alignment = { horizontal: 'right' };
  cellIvaVal.border = thinBorder;
  currentRow++;

  // GRAN TOTAL
  const granTotalRow = currentRow;
  worksheet.getCell(granTotalRow, 5).value = 'GRAN TOT';
  worksheet.getCell(granTotalRow, 5).font = { bold: true, size: 11, color: { argb: 'FF0F172A' } };
  worksheet.getCell(granTotalRow, 5).alignment = { horizontal: 'right' };
  worksheet.getCell(granTotalRow, 5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
  worksheet.getCell(granTotalRow, 5).border = thinBorder;

  const granTotalSum = subtotalSum * 1.16;
  const cellGranTotVal = worksheet.getCell(granTotalRow, 6);
  cellGranTotVal.value = { formula: `F${subtotalRow}+F${ivaRow}`, result: granTotalSum };
  cellGranTotVal.numFmt = '"$"#,##0.00';
  cellGranTotVal.font = { bold: true, size: 11, color: { argb: 'FF0F172A' } };
  cellGranTotVal.alignment = { horizontal: 'right' };
  cellGranTotVal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
  cellGranTotVal.border = thinBorder;
  currentRow++;

  // --- MONTO EN LETRAS (SON) ---
  const sonRow = currentRow;
  worksheet.getCell(sonRow, 1).value = 'SON:';
  worksheet.getCell(sonRow, 1).font = { bold: true, size: 9 };

  worksheet.mergeCells(`B${sonRow}:D${sonRow}`);
  const cellSonText = worksheet.getCell(`B${sonRow}`);
  cellSonText.value = numeroALetras(granTotalSum);
  cellSonText.font = { bold: true, size: 9 };
  cellSonText.alignment = { horizontal: 'center' };

  for (let c = 1; c <= 4; c++) {
    worksheet.getCell(sonRow, c).border = thinBorder;
  }
  currentRow += 2;

  // --- NOTAS Y PIE DE PÁGINA ---
  const nota1 = worksheet.getCell(`A${currentRow}`);
  nota1.value = 'SIN MAS POR EL MOMENTO Y EN ESPERA DE VERNOS FAVORECIDOS, QUEDO DE USTED PARA CUALQUIER ACLARACION O COMENTARIO AL RESPECTO.';
  nota1.font = { size: 8, italic: true };
  currentRow++;

  const nota2 = worksheet.getCell(`A${currentRow}`);
  nota2.value = 'LOS PRECIOS SON A CAMBIO SIN PREVIO AVISO. Se requiere el 60 % de anticipo para valorar el trabajo.';
  nota2.font = { size: 8, bold: true };
  currentRow += 2;

  const firm1 = worksheet.getCell(`A${currentRow}`);
  firm1.value = 'LAE. ALIPIO VICENTE ZALAYA';
  firm1.font = { size: 9, bold: true };
  currentRow++;

  const firm2 = worksheet.getCell(`A${currentRow}`);
  firm2.value = 'SERVICIOS AIRES ACONDICIONADOS Y ELECTRICIDAD';
  firm2.font = { size: 9 };
  currentRow++;

  const firm3 = worksheet.getCell(`A${currentRow}`);
  firm3.value = 'TEL. 833 147 4478';
  firm3.font = { size: 9, bold: true };
  currentRow++;

  const firm4 = worksheet.getCell(`A${currentRow}`);
  firm4.value = 'EMAIL. Alipio.vicente@gmail.com';
  firm4.font = { size: 9 };

  // --- EXPORTAR ARCHIVO EN NAVEGADOR ---
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const filename = `Cotizacion_Electricidad_${data.cliente ? data.cliente.replace(/[^a-zA-Z0-9]/g, '_') : 'MIT'}.xlsx`;
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
