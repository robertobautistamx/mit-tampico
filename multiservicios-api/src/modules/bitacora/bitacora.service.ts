import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bitacora } from '../../models/bitacora_entity';

@Injectable()
export class BitacoraService {
  constructor(
    @InjectRepository(Bitacora)
    private readonly bitacoraRepository: Repository<Bitacora>,
  ) {}

  findAll(): Promise<Bitacora[]> {
    return this.bitacoraRepository.find();
  }

  findOne(id: number): Promise<Bitacora | null> {
    return this.bitacoraRepository.findOneBy({ id });
  }

  create(bitacora: Partial<Bitacora>): Promise<Bitacora> {
    const nuevo = this.bitacoraRepository.create(bitacora);
    return this.bitacoraRepository.save(nuevo);
  }

  async update(id: number, bitacora: Partial<Bitacora>): Promise<Bitacora | null> {
    await this.bitacoraRepository.update(id, bitacora);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bitacoraRepository.delete(id);
  }
}
