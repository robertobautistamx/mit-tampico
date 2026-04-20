import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Producto } from '../../models/productos_entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  findOne(id: number): Promise<Producto | null> {
    return this.productoRepository.findOneBy({ id });
  }

  async create(producto: Partial<Producto>): Promise<Producto> {
    try {
      const nuevo = this.productoRepository.create(producto);
      return await this.productoRepository.save(nuevo);
    } catch (err) {
      throw this.mapDbError(err);
    }
  }

  async update(id: number, producto: Partial<Producto>): Promise<Producto | null> {
    try {
      await this.productoRepository.update(id, producto);
      return this.findOne(id);
    } catch (err) {
      throw this.mapDbError(err);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.productoRepository.delete(id);
    } catch (err) {
      throw this.mapDbError(err);
    }
  }

  private mapDbError(err: unknown): Error {
    if (err instanceof QueryFailedError) {
      const driverError = (err as QueryFailedError & { driverError?: any }).driverError;
      const code = driverError?.code;

      // FK: categoria_id apunta a categoria inexistente
      if (code === 'ER_NO_REFERENCED_ROW_2' || code === 'ER_NO_REFERENCED_ROW') {
        return new BadRequestException('La categoría indicada no existe. Crea la categoría primero o deja "Categoría ID" vacío.');
      }

      // FK: no se puede borrar porque hay registros hijos (por ejemplo imágenes)
      if (code === 'ER_ROW_IS_REFERENCED_2' || code === 'ER_ROW_IS_REFERENCED') {
        return new BadRequestException('No se puede eliminar el producto porque tiene registros relacionados.');
      }
    }

    return new BadRequestException('No se pudo completar la operación.');
  }
}
