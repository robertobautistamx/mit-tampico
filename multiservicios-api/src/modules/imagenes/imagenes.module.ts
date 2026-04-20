import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from '../../models/imagenes_entity';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen])],
  providers: [ImagenesService],
  controllers: [ImagenesController],
  exports: [ImagenesService],
})
export class ImagenesModule {}
