import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bitacora } from '../../models/bitacora_entity';
import { Categoria } from '../../models/categorias_entity';
import { Imagen } from '../../models/imagenes_entity';
import { Producto } from '../../models/productos_entity';
import { Usuario } from '../../models/usuarios_entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Producto, Categoria, Imagen, Bitacora])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
