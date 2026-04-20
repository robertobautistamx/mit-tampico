import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Producto } from './productos_entity';

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
}