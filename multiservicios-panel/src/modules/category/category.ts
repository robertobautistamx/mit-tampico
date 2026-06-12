import { useEffect, useState } from "react";
import { Categoria } from "../../interfaces/category/useCategory";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = () => {
    setLoading(true);
    fetch('/api/v1/categorias', { credentials: 'include' }) 
      .then(async (res) => {
        if (!res.ok) throw new Error('Error al obtener categorías');
        return res.json();
      })
      .then(data => setCategorias(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const createCategoria = async (categoria: Partial<Categoria>) => {
    if (!categoria.nombre || typeof categoria.nombre !== 'string' || categoria.nombre.trim() === '') {
      throw new Error('Nombre de categoría inválido');
    }

    const res = await fetch('/api/v1/categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ nombre: categoria.nombre.trim() }),
    });
    if (!res.ok) throw new Error('Error al crear categoría');
    await fetchCategorias();
    return await res.json();
  };

  const updateCategoria = async (id: number, categoria: Partial<Categoria>) => {
    if (!categoria.nombre || typeof categoria.nombre !== 'string' || categoria.nombre.trim() === '') {
      throw new Error('Nombre de categoría inválido');
    }

    const res = await fetch(`/api/v1/categorias/${id}`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ nombre: categoria.nombre.trim() }),
    });
    if (!res.ok) throw new Error('Error al actualizar categoría');
    await fetchCategorias();
    return await res.json();
  };

  const deleteCategoria = async (id: number) => {
    const res = await fetch(`/api/v1/categorias/${id}`, {  
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al eliminar categoría');
    await fetchCategorias();
  };

  return { categorias, loading, error, createCategoria, updateCategoria, deleteCategoria, fetchCategorias };
}