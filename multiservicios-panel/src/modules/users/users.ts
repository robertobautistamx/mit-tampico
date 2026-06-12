import { useState, useEffect, useCallback } from 'react';
import { Usuario } from '../../pages/users/users';

// Ajusta esta URL o usa tu instancia de Axios si tienes una configurada
const API_URL = 'http://localhost:3000/api/v1/usuarios';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar los usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const createUsuario = async (usuario: Partial<Usuario>) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.message || 'Error al crear usuario');
    }
    await fetchUsuarios();
  };

  const updateUsuario = async (id: number, usuario: Partial<Usuario>) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.message || 'Error al actualizar usuario');
    }
    await fetchUsuarios();
  };

  const deleteUsuario = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.message || 'Error al eliminar usuario');
    }
    await fetchUsuarios();
  };

  return { usuarios, loading, error, createUsuario, updateUsuario, deleteUsuario, fetchUsuarios };
};