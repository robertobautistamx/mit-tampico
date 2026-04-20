import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './models/usuarios_entity';
import { Producto } from './models/productos_entity';
import { Categoria } from './models/categorias_entity';
import { Imagen } from './models/imagenes_entity';
import { Bitacora } from './models/bitacora_entity';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ProductosModule } from './modules/productos/productos.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ImagenesModule } from './modules/imagenes/imagenes.module';
import { BitacoraModule } from './modules/bitacora/bitacora.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '3306'), 10),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_DATABASE', 'test'),
        entities: [Usuario, Producto, Categoria, Imagen, Bitacora],
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([Usuario, Producto, Categoria, Imagen, Bitacora]),
    UsuariosModule,
    ProductosModule,
    CategoriasModule,
    ImagenesModule,
    BitacoraModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
