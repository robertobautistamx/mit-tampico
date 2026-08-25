import { useState, useEffect, useCallback } from 'react';
import type { ImageGalleryItem } from "../../interfaces/image_gallery/useImage_gallery";

export interface Imagen extends ImageGalleryItem {
}

// Colección estática de imágenes y datos basada en la base de datos
export const STATIC_IMAGES: ImageGalleryItem[] = [
    {
        id: 1,
        titulo: "Reparación de aire acondicionado",
        descripcion: "Diagnóstico y reparación de equipos de aire acondicionado residencial y comercial.",
        image_url: "https://res.cloudinary.com/df7ejbrre/image/upload/v1784084508/imagen1_uelw0c.jpg",
        categoria: {
            id: 38,
            nombre: "Refrigeración"
        }
    },
    {
        id: 2,
        titulo: "Instalación de minisplit",
        descripcion: "Instalación profesional de equipos minisplit con acabados limpios y seguros, garantizando un funcionamiento eficiente y una mayor vida útil del equipo.",
        image_url: "https://res.cloudinary.com/df7ejbrre/image/upload/v1784085361/15_bdedaa.png",
        categoria: {
            id: 38,
            nombre: "Refrigeración"
        }
    },
    {
        id: 3,
        titulo: "Servicio Técnico en Computadoras",
        descripcion: "Mantenimiento preventivo y correctivo para computadoras y laptops, optimizando su rendimiento mediante limpieza, actualización y reparación de hardware y software.",
        image_url: "https://res.cloudinary.com/df7ejbrre/image/upload/v1784085361/i3_yrl5uw.jpg",
        categoria: {
            id: 39,
            nombre: "Sistemas Informáticos"
        }
    },
    {
        id: 4,
        titulo: "Instalación y Reemplazo de SSD",
        descripcion: "Mejora el rendimiento de tu computadora con la instalación de unidades SSD, migración de datos y actualización de componentes para mayor velocidad y confiabilidad.",
        image_url: "https://res.cloudinary.com/df7ejbrre/image/upload/v1784085361/ii_jmirot.jpg",
        categoria: {
            id: 39,
            nombre: "Sistemas Informáticos"
        }
    },
    {
        id: 5,
        titulo: "Mantenimiento e Instalaciones Eléctricas",
        descripcion: "Instalación, mantenimiento y diagnóstico de sistemas eléctricos, utilizando herramientas especializadas para garantizar seguridad y un funcionamiento óptimo.",
        image_url: "https://res.cloudinary.com/df7ejbrre/image/upload/v1784085361/electricidad_ixzrff.jpg",
        categoria: {
            id: 40,
            nombre: "Electricidad"
        }
    },
    {
        id: 6,
        titulo: "Mantenimiento de Refrigeración",
        descripcion: "Instalación de equipos de climatización con materiales de calidad y siguiendo las mejores prácticas para asegurar eficiencia y durabilidad.",
        image_url: "https://res.cloudinary.com/df7ejbrre/image/upload/v1784085361/14_wzzv9h.png",
        categoria: {
            id: 38,
            nombre: "Refrigeración"
        }
    }
];

export const useImageGallery = () => {
    // Inicialización de estado con datos estáticos
    const [images, setImages] = useState<ImageGalleryItem[]>(STATIC_IMAGES);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            /* 
            // =========================================================================
            // CÓDIGO DE ACCESO A BASE DE DATOS / API (COMENTADO POR SOLICITUD DE USUARIO)
            // =========================================================================
            const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
            const response = await fetch(`${apiBase}/image_gallery`);
            if (!response.ok) {
                throw new Error(`Error al obtener las imágenes: ${response.statusText}`);
            }
            const data = await response.json();
            // La API puede devolver { value: [...], Count: N } o directamente un array
            const items = Array.isArray(data) ? data : (data.value ?? []);
            setImages(items);
            // =========================================================================
            */

            // Uso de imágenes estáticas
            setImages(STATIC_IMAGES);
        } catch (err: any) {
            setError(err.message || 'Error de conexión con el servidor de la API.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // fetchImages(); // Comentado para usar imágenes estáticas sin consultar BD al cargar
    }, [fetchImages]);

    return { images, loading, error, refetch: fetchImages };
};

export const useImageGalleryItem = (id: number) => {
    const staticItem = STATIC_IMAGES.find(img => img.id === id) || null;
    const [image, setImage] = useState<ImageGalleryItem | null>(staticItem);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImage = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            /*
            // =========================================================================
            // CÓDIGO DE ACCESO A BASE DE DATOS / API (COMENTADO POR SOLICITUD DE USUARIO)
            // =========================================================================
            const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
            const response = await fetch(`${apiBase}/image_gallery/${id}`);
            if (!response.ok) {
                throw new Error(`Error al obtener la imagen: ${response.statusText}`);
            }
            const data = await response.json();
            setImage(data);
            // =========================================================================
            */

            const item = STATIC_IMAGES.find(img => img.id === id) || null;
            setImage(item);
        } catch (err: any) {
            setError(err.message || 'Error de conexión con el servidor de la API.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        // fetchImage(); // Comentado para usar imagen estática sin consultar BD al cargar
    }, [fetchImage]);

    return { image, loading, error, refetch: fetchImage };
};
