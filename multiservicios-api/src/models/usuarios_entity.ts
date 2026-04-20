import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Bitacora } from './bitacora_entity';

@Entity('usuarios')
export class Usuario {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 100 })
	nombre!: string;

	@Column({ length: 150, unique: true })
	email!: string;

	@Column({ length: 255 })
	password!: string;

	@Column({ type: 'enum', enum: ['admin', 'empleado'], default: 'empleado' })
	rol!: 'admin' | 'empleado';

	@Column({ type: 'tinyint', default: 1 })
	activo!: boolean;

	@CreateDateColumn({ name: 'created_at' })
	created_at!: Date;

	@OneToMany(() => Bitacora, bitacora => bitacora.usuario)
	bitacoras!: Bitacora[];
}