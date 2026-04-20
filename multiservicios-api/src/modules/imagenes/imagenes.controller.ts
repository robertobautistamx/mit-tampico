import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { Imagen } from '../../models/imagenes_entity';

@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  @Get()
  findAll(): Promise<Imagen[]> {
    return this.imagenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Imagen | null> {
    return this.imagenesService.findOne(Number(id));
  }

  @Post()
  create(@Body() imagen: Partial<Imagen>): Promise<Imagen> {
    return this.imagenesService.create(imagen);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() imagen: Partial<Imagen>): Promise<Imagen | null> {
    return this.imagenesService.update(Number(id), imagen);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.imagenesService.remove(Number(id));
  }
}
