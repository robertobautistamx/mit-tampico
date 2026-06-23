export interface ImageGalleryItem {
    id: number;
    titulo: string;
    descripcion?: string;
    image_url: string;
    categoria?: {
        id: number;
        nombre: string;
    };
}
