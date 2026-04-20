import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../../models/categorias_entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  findOne(id: number): Promise<Categoria | null> {
    return this.categoriaRepository.findOneBy({ id });
  }

  create(categoria: Partial<Categoria>): Promise<Categoria> {
    const nuevo = this.categoriaRepository.create(categoria);
    return this.categoriaRepository.save(nuevo);
  }

  async update(id: number, categoria: Partial<Categoria>): Promise<Categoria | null> {
    await this.categoriaRepository.update(id, categoria);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
