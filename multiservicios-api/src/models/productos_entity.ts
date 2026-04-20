import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from './categorias_entity';
import { Imagen } from './imagenes_entity';
import { OneToMany } from 'typeorm';

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 150 })
    nombre!: string;

    @Column({ type: 'text', nullable: true })
    descripcion!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio!: number;

    @Column({ type: 'int', default: 0 })
    stock!: number;

    @Column({ type: 'tinyint', default: 1 })
    activo!: boolean;

    @Column({ type: 'int', nullable: true })
    categoria_id!: number;

    @ManyToOne(() => Categoria, categoria => categoria.productos, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'categoria_id' })
    categoria!: Categoria;

    @OneToMany(() => Imagen, imagen => imagen.producto)
    imagenes!: Imagen[];

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;
}