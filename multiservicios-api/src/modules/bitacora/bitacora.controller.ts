import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { Bitacora } from '../../models/bitacora_entity';

@Controller('bitacora')
export class BitacoraController {
  constructor(private readonly bitacoraService: BitacoraService) {}

  @Get()
  findAll(): Promise<Bitacora[]> {
    return this.bitacoraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Bitacora | null> {
    return this.bitacoraService.findOne(Number(id));
  }

  @Post()
  create(@Body() bitacora: Partial<Bitacora>): Promise<Bitacora> {
    return this.bitacoraService.create(bitacora);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bitacora: Partial<Bitacora>): Promise<Bitacora | null> {
    return this.bitacoraService.update(Number(id), bitacora);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bitacoraService.remove(Number(id));
  }
}
