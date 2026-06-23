import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Producto } from './productos_entity';
import { ImageGallery } from './image_gallery';

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    nombre!: string;

    @OneToMany(() => Producto, producto => producto.categoria)
    productos!: Producto[];

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @OneToMany(() => ImageGallery, image => image.categoria)
    imagenes!: ImageGallery[];
}