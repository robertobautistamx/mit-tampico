import { useEffect, useState } from "react";
import { Producto } from "../../interfaces/products/useProducts";

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = () => {
    setLoading(true);
    fetch('/api/v1/productos', { credentials: 'include' }) 
      .then(async (res) => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then(data => setProductos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const createProducto = async (producto: Partial<Producto>) => {
    if (!producto.nombre || typeof producto.nombre !== 'string' || producto.nombre.trim() === '') {
      throw new Error('Nombre de producto inválido');
    }

    const res = await fetch('/api/v1/productos', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...producto,
        nombre: producto.nombre.trim(),
      }),
    });
    if (!res.ok) throw new Error('Error al crear producto');
    await fetchProductos();
    return await res.json();
  };

  const updateProducto = async (id: number, producto: Partial<Producto>) => {
    if (!producto.nombre || typeof producto.nombre !== 'string' || producto.nombre.trim() === '') {
      throw new Error('Nombre de producto inválido');
    }

    const res = await fetch(`/api/v1/productos/${id}`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...producto,
        nombre: producto.nombre.trim(),
      }),
    });
    if (!res.ok) throw new Error('Error al actualizar producto');
    await fetchProductos();
    return await res.json();
  };

  const deleteProducto = async (id: number) => {
    const res = await fetch(`/api/v1/productos/${id}`, { 
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al eliminar producto');
    await fetchProductos();
  };

  return { productos, loading, error, createProducto, updateProducto, deleteProducto, fetchProductos };
}