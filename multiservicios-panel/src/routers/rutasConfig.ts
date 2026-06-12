import FolderFilledIcon from '@mui/icons-material/FolderOpen';
import BoxIcon from '@mui/icons-material/Inventory2Outlined';
import PhotoIcon from '@mui/icons-material/PhotoOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ShieldIcon from '@mui/icons-material/GppGoodOutlined';
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SearchFileIcon from '@mui/icons-material/ManageSearchOutlined';
import TuneIcon from '@mui/icons-material/TuneOutlined';
import { SvgIconComponent } from '@mui/icons-material';

export interface Acceso {
  opcion: string;
  tag: string;
  ruta?: string;
  icono?: SvgIconComponent;
  color?: string;
  children?: Acceso[];
}

export interface Agrupador {
  opcion: string;
  tag: string;
  icono?: SvgIconComponent;
  color?: string;
  categorias: Acceso[];
}

// ─── Rutas de la aplicación ──────────────────────────────────────────────────

export const RUTAS_CONFIG: Agrupador[] = [
  {
    opcion: 'Catálogo',
    tag: 'catalogo',
    color: '#a78bfa',
    categorias: [
      {
        opcion: 'Categorías',
        tag: 'categorias',
        ruta: '/catalogo/categorias',
        icono: FolderFilledIcon,
        color: '#4c1d95',
      },
      {
        opcion: 'Productos',
        tag: 'productos',
        ruta: '/catalogo/productos',
        icono: BoxIcon,
        color: '#5b21b6',
      },
      {
        opcion: 'Imágenes',
        tag: 'imagenes',
        ruta: '/catalogo/imagenes',
        icono: PhotoIcon,
        color: '#3730a3',
      },
    ],
  },
  {
    opcion: 'Usuarios',
    tag: 'usuarios',
    color: '#34d399',
    categorias: [
      {
        opcion: 'Lista de usuarios',
        tag: 'lista_usuarios',
        ruta: '/usuarios',
        icono: PeopleIcon,
        color: '#064e3b',
      },
      {
        opcion: 'Roles y permisos',
        tag: 'permisos',
        ruta: '/usuarios/permisos',
        icono: ShieldIcon,
        color: '#065f46',
      },
    ],
  },
  {
    opcion: 'Bitácora',
    tag: 'bitacora',
    color: '#fb923c',
    categorias: [
      {
        opcion: 'Registro de actividad',
        tag: 'actividad',
        ruta: '/bitacora/actividad',
        icono: ListIcon,
        color: '#7c2d12',
      },
      {
        opcion: 'Auditoría',
        tag: 'auditoria',
        ruta: '/bitacora/auditoria',
        icono: SearchFileIcon,
        color: '#92400e',
      },
    ],
  },
  {
    opcion: 'Configuración',
    tag: 'configuracion',
    color: '#f87171',
    categorias: [
      {
        opcion: 'Ajustes generales',
        tag: 'ajustes',
        ruta: '/configuracion',
        icono: TuneIcon,
        color: '#7f1d1d',
      },
    ],
  },
];