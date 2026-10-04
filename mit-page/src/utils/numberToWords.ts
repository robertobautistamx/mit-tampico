/**
 * Convierte un número decimal a su representación en letras en español (moneda MXN)
 * Ejemplo: 4868.08 -> "*** (CUATRO MIL OCHO CIENTOS SESENTA Y OCHO PESOS 08/100 M.N.) ***"
 */

function Unidades(num: number): string {
  switch (num) {
    case 1: return 'UN';
    case 2: return 'DOS';
    case 3: return 'TRES';
    case 4: return 'CUATRO';
    case 5: return 'CINCO';
    case 6: return 'SEIS';
    case 7: return 'SIETE';
    case 8: return 'OCHO';
    case 9: return 'NUEVE';
    default: return '';
  }
}

function DecenasY(strSin: string, numUnidades: number): string {
  if (numUnidades > 0) return strSin + ' Y ' + Unidades(numUnidades);
  return strSin;
}

function Decenas(num: number): string {
  const ten = Math.floor(num / 10);
  const unit = num % 10;

  switch (ten) {
    case 1:
      switch (unit) {
        case 0: return 'DIEZ';
        case 1: return 'ONCE';
        case 2: return 'DOCE';
        case 3: return 'TRECE';
        case 4: return 'CATORCE';
        case 5: return 'QUINCE';
        default: return 'DIECI' + Unidades(unit);
      }
    case 2:
      switch (unit) {
        case 0: return 'VEINTE';
        default: return 'VEINTI' + Unidades(unit);
      }
    case 3: return DecenasY('TREINTA', unit);
    case 4: return DecenasY('CUARENTA', unit);
    case 5: return DecenasY('CINCUENTA', unit);
    case 6: return DecenasY('SESENTA', unit);
    case 7: return DecenasY('SETENTA', unit);
    case 8: return DecenasY('OCHENTA', unit);
    case 9: return DecenasY('NOVENTA', unit);
    case 0: return Unidades(unit);
    default: return '';
  }
}

function Centenas(num: number): string {
  const hundred = Math.floor(num / 100);
  const tens = num % 100;

  switch (hundred) {
    case 1:
      if (tens > 0) return 'CIENTO ' + Decenas(tens);
      return 'CIEN';
    case 2: return 'DOSCIENTOS ' + Decenas(tens);
    case 3: return 'TRESCIENTOS ' + Decenas(tens);
    case 4: return 'CUATROCIENTOS ' + Decenas(tens);
    case 5: return 'QUINIENTOS ' + Decenas(tens);
    case 6: return 'SEISCIENTOS ' + Decenas(tens);
    case 7: return 'SETECIENTOS ' + Decenas(tens);
    case 8: return 'OCHOCIENTOS ' + Decenas(tens);
    case 9: return 'NOVECIENTOS ' + Decenas(tens);
    default: return Decenas(tens);
  }
}

function Seccion(num: number, divisor: number, strSingular: string, strPlural: string): string {
  const cientos = Math.floor(num / divisor);
  const resto = num % divisor;
  let letras = '';

  if (cientos > 0) {
    if (cientos > 1) letras = Centenas(cientos) + ' ' + strPlural;
    else letras = strSingular;
  }
  if (resto > 0) letras += '';
  return letras;
}

function Miles(num: number): string {
  const divisor = 1000;
  const cientos = Math.floor(num / divisor);
  const resto = num % divisor;

  const strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
  const strCentenas = Centenas(resto);

  if (strMiles === '') return strCentenas;
  return (strMiles + ' ' + strCentenas).trim();
}

function Millones(num: number): string {
  const divisor = 1000000;
  const cientos = Math.floor(num / divisor);
  const resto = num % divisor;

  const strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
  const strMiles = Miles(resto);

  if (strMillones === '') return strMiles;
  return (strMillones + ' ' + strMiles).trim();
}

export function numeroALetras(num: number): string {
  const entero = Math.floor(num);
  const centavos = Math.round((num - entero) * 100);
  const strCentavos = centavos < 10 ? `0${centavos}` : `${centavos}`;

  let letrasEntero = Millones(entero);
  if (entero === 0) letrasEntero = 'CERO';

  return `*** (${letrasEntero} PESOS ${strCentavos}/100 M.N.) ***`;
}
