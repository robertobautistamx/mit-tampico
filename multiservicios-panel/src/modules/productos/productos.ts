import { useEffect, useState } from "react";

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  activo: boolean;
  categoria_id?: number;
  created_at?: string;
}

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/productos`, { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error('Error al obtener productos');
        setProductos(await res.json());
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(fetchProductos, []);

  const createProducto = async (producto: Partial<Producto>) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(producto),
    });
    if (!res.ok) throw new Error('Error al crear producto');
    fetchProductos();
    return await res.json();
  };

  const updateProducto = async (id: number, producto: Partial<Producto>) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(producto),
    });
    if (!res.ok) throw new Error('Error al actualizar producto');
    fetchProductos();
    return await res.json();
  };

  const deleteProducto = async (id: number) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/productos/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al eliminar producto');
    fetchProductos();
  };

  return { productos, loading, error, createProducto, updateProducto, deleteProducto, fetchProductos };
}
