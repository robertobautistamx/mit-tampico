import { useEffect, useState } from "react";

export interface Categoria {
  id: number;
  nombre: string;
  created_at?: string;
}

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/categorias`, { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error('Error al obtener categorías');
        setCategorias(await res.json());
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(fetchCategorias, []);

  const createCategoria = async (categoria: Partial<Categoria>) => {
    // Solo enviar el campo nombre
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/categorias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ nombre: categoria.nombre }),
    });
    if (!res.ok) throw new Error('Error al crear categoría');
    fetchCategorias();
    return await res.json();
  };

  const updateCategoria = async (id: number, categoria: Partial<Categoria>) => {
    // Solo enviar el campo nombre
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/categorias/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ nombre: categoria.nombre }),
    });
    if (!res.ok) throw new Error('Error al actualizar categoría');
    fetchCategorias();
    return await res.json();
  };

  const deleteCategoria = async (id: number) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/categorias/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al eliminar categoría');
    fetchCategorias();
  };

  return { categorias, loading, error, createCategoria, updateCategoria, deleteCategoria, fetchCategorias };
}
