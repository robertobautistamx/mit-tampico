import { useEffect, useState } from "react";

export interface Imagen {
  id: number;
  producto_id: number;
  url: string;
}

export function useImagenes(productoId?: number | null, fetchAll: boolean = false) {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImagenes = async () => {
    if (!productoId && !fetchAll) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/imagenes`, { credentials: 'include' });
      if (!res.ok) throw new Error('Error al obtener imágenes');
      const data = await res.json();
      
      // Filtramos las imágenes del producto específico en el frontend
      const filtered = data.filter((img: Imagen) => img.producto_id === productoId);
      setImagenes(filtered);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagenes();
  }, [productoId]);

  const createImagen = async (imagen: Partial<Imagen>) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/imagenes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(imagen),
    });
    if (!res.ok) throw new Error('Error al crear imagen');
    fetchImagenes();
    return await res.json();
  };

  const deleteImagen = async (id: number) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/imagenes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al eliminar imagen');
    fetchImagenes();
  };

  return { imagenes, loading, error, createImagen, deleteImagen, fetchImagenes };
}