import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from '../../models/categorias_entity';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Categoria | null> {
    return this.categoriasService.findOne(Number(id));
  }

  @Post()
  create(@Body() categoria: Partial<Categoria>): Promise<Categoria> {
    return this.categoriasService.create(categoria);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoria: Partial<Categoria>): Promise<Categoria | null> {
    return this.categoriasService.update(Number(id), categoria);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriasService.remove(Number(id));
  }
}
