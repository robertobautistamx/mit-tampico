import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../models/usuarios_entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly configService: ConfigService,
  ) {}

  private get saltRounds(): number {
    const raw = this.configService.get<string>('BCRYPT_SALT_ROUNDS', '10');
    const parsed = Number.parseInt(String(raw), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 10;
  }

  private isBcryptHash(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    return /^\$2[aby]\$\d{2}\$/.test(value);
  }

  private async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  async verifyPasswordAndMigrateIfNeeded(user: Usuario, plain: string): Promise<boolean> {
    const stored = String(user.password ?? '');

    if (!stored) return false;

    if (this.isBcryptHash(stored)) {
      return bcrypt.compare(plain, stored);
    }

    if (stored !== plain) return false;
    try {
      const nextHash = await this.hashPassword(plain);
      await this.usuarioRepository.update(user.id, { password: nextHash });
    } catch {
    }
    return true;
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ email });
  }

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    const normalizedEmail = usuario.email ? String(usuario.email).trim().toLowerCase() : undefined;
    const next: Partial<Usuario> = { ...usuario, email: normalizedEmail };

    if (typeof next.password === 'string' && next.password.trim()) {
      if (!this.isBcryptHash(next.password)) {
        next.password = await this.hashPassword(next.password);
      }
    }

    const nuevo = this.usuarioRepository.create(next);
    return this.usuarioRepository.save(nuevo);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
    const next: Partial<Usuario> = { ...usuario };

    if (typeof next.email === 'string') {
      next.email = next.email.trim().toLowerCase();
    }

    if (typeof next.password === 'string' && next.password.trim()) {
      if (!this.isBcryptHash(next.password)) {
        next.password = await this.hashPassword(next.password);
      }
    }

    await this.usuarioRepository.update(id, next);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
