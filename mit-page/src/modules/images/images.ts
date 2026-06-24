import { useState, useEffect, useCallback } from 'react';
import type { ImageGalleryItem } from "../../interfaces/image_gallery/useImage_gallery";
export interface Imagen extends ImageGalleryItem {
}

export const useImageGallery = () => {
    const [images, setImages] = useState<ImageGalleryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
            const response = await fetch(`${apiBase}/image_gallery`);
            if (!response.ok) {
                throw new Error(`Error al obtener las imágenes: ${response.statusText}`);
            }
            const data = await response.json();
            // La API puede devolver { value: [...], Count: N } o directamente un array
            const items = Array.isArray(data) ? data : (data.value ?? []);
            setImages(items);
        } catch (err: any) {
            setError(err.message || 'Error de conexión con el servidor de la API.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return { images, loading, error, refetch: fetchImages };
};

export const useImageGalleryItem = (id: number) => {
    const [image, setImage] = useState<ImageGalleryItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchImage = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
            const response = await fetch(`${apiBase}/image_gallery/${id}`);
            if (!response.ok) {
                throw new Error(`Error al obtener la imagen: ${response.statusText}`);
            }
            const data = await response.json();
            setImage(data);
        } catch (err: any) {
            setError(err.message || 'Error de conexión con el servidor de la API.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    return { image, loading, error, refetch: fetchImage };
};