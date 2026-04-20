import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from '../../models/imagenes_entity';

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
  ) {}

  findAll(): Promise<Imagen[]> {
    return this.imagenRepository.find();
  }

  findOne(id: number): Promise<Imagen | null> {
    return this.imagenRepository.findOneBy({ id });
  }

  create(imagen: Partial<Imagen>): Promise<Imagen> {
    const nuevo = this.imagenRepository.create(imagen);
    return this.imagenRepository.save(nuevo);
  }

  async update(id: number, imagen: Partial<Imagen>): Promise<Imagen | null> {
    await this.imagenRepository.update(id, imagen);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.imagenRepository.delete(id);
  }
}
