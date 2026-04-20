import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from '../../models/productos_entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll(): Promise<Producto[]> {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Producto | null> {
    return this.productosService.findOne(Number(id));
  }

  @Post()
  create(@Body() producto: Partial<Producto>): Promise<Producto> {
    return this.productosService.create(producto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() producto: Partial<Producto>): Promise<Producto | null> {
    return this.productosService.update(Number(id), producto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productosService.remove(Number(id));
  }
}
