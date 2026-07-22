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
import { ImageGalleryModule } from './modules/image_gallery/image_gallery.module';
import { ContactoModule } from './modules/contacto/contacto.module';
import { ImageGallery } from './models/image_gallery';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('====================================');
        console.log('DATABASE CONFIGURATION DEBUG:');
        console.log('config DB_HOST:', config.get<string>('DB_HOST'));
        console.log('process.env.DB_HOST:', process.env.DB_HOST);
        console.log('config DB_PORT:', config.get<string>('DB_PORT'));
        console.log('process.env.DB_PORT:', process.env.DB_PORT);
        console.log('====================================');
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST', 'localhost'),
          port: parseInt(config.get<string>('DB_PORT', '3306'), 10),
          username: config.get<string>('DB_USERNAME', 'root'),
          password: config.get<string>('DB_PASSWORD', ''),
          database: config.get<string>('DB_DATABASE', 'test'),
          entities: [Usuario, Producto, Categoria, Imagen, Bitacora, ImageGallery],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature([Usuario, Producto, Categoria, Imagen, Bitacora, ImageGallery]),
    UsuariosModule,
    ProductosModule,
    CategoriasModule,
    ImagenesModule,
    BitacoraModule,
    DashboardModule,
    ImageGalleryModule,
    ContactoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
