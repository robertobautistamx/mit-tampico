import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from './productos_entity';

@Entity('imagenes')
export class Imagen {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'int', nullable: true })
	producto_id!: number;

	@Column({ length: 255 })
	url!: string;

	@ManyToOne(() => Producto, producto => producto.imagenes, { onDelete: 'CASCADE', nullable: true })
	@JoinColumn({ name: 'producto_id' })
	producto!: Producto;
}
