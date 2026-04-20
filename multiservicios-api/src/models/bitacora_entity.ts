import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuarios_entity';

@Entity('bitacora')
export class Bitacora {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'int', nullable: true })
	usuario_id!: number;

	@Column({ length: 100 })
	accion!: string;

	@Column({ type: 'text', nullable: true })
	descripcion!: string;

	@Column({ length: 100, nullable: true })
	tabla_afectada!: string;

	@Column({ type: 'int', nullable: true })
	registro_id!: number;

	@CreateDateColumn({ name: 'fecha' })
	fecha!: Date;

	@ManyToOne(() => Usuario, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'usuario_id' })
	usuario!: Usuario;
}
