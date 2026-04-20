import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bitacora } from '../../models/bitacora_entity';
import { BitacoraService } from './bitacora.service';
import { BitacoraController } from './bitacora.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bitacora])],
  providers: [BitacoraService],
  controllers: [BitacoraController],
  exports: [BitacoraService],
})
export class BitacoraModule {}
