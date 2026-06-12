import { Acceso } from '../../routers/rutasConfig';

export interface FlatMenuItem {
  ruta?: string;
  tag?: string;
  label?: string;
}

export interface BreadcrumbItem {
  tag?: string;
  label?: string;
  stackIndex?: number;
}

export interface UseMenuNavigationReturn {
  currentItems: Acceso[];
  breadcrumbs: BreadcrumbItem[];
  pushLevel: (items: Acceso[], label?: string, tag?: string) => void;
  popLevel: () => void;
  jumpToLevel: (index: number) => void;
  isRoot: boolean;
  selectedKey?: string;
  setSelectedKey: (key: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: FlatMenuItem[];
  isSearching: boolean;
  clearSearch: () => void;
}

export default null as unknown as UseMenuNavigationReturn;
