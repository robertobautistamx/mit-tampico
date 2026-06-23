import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Categoria } from "./categorias_entity";

@Entity('image_gallery')
export class ImageGallery {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    categoria_id!: number;

    @ManyToOne(() => Categoria, categoria => categoria.imagenes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'categoria_id' })
    categoria!: Categoria;

    @Column({ length: 150 })
    titulo!: string;

    @Column({ type: 'text', nullable: true })
    descripcion!: string;

    @Column({ length: 500 })
    image_url!: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;
}