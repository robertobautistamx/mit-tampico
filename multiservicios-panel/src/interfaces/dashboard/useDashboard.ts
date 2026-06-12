
export interface DashboardSummary {
    counts: {
        usuarios: number;
        productos: number;
        categorias: number;
        imagenes: number;
        bitacoras: number;
    };
    recentUsers: Array<{
        id: number;
        nombre: string;
        email: string;
        rol: string;
        activo: boolean;
        created_at: string;
    }>;
    recentProducts: Array<{
        id: number;
        nombre: string;
        precio: number;
        stock: number;
        activo: boolean;
        created_at: string;
        categoria: { id: number; nombre: string };
    }>;
    recentActivity: Array<{
        id: number;
        accion: string;
        descripcion: string;
        tabla_afectada: string;
        registro_id: number;
        fecha: string;
        usuario: null | { id: number; nombre: string; email: string };
    }>;
}