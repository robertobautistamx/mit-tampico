import { useEffect, useState } from "react";

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

export function useDashboardSummary() {
	const [data, setData] = useState<DashboardSummary | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/dashboard/summary`, {
			credentials: 'include',
		})
			.then(async (res) => {
				if (!res.ok) throw new Error('Error al obtener datos del dashboard');
				const json = await res.json();
				setData(json);
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	return { data, loading, error };
}
