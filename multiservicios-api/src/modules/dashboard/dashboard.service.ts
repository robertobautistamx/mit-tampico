import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bitacora } from '../../models/bitacora_entity';
import { Categoria } from '../../models/categorias_entity';
import { Imagen } from '../../models/imagenes_entity';
import { Producto } from '../../models/productos_entity';
import { Usuario } from '../../models/usuarios_entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,

    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,

    @InjectRepository(Imagen)
    private readonly imagenesRepository: Repository<Imagen>,

    @InjectRepository(Bitacora)
    private readonly bitacoraRepository: Repository<Bitacora>,
  ) {}

  async getSummary() {
    const [usuarios, productos, categorias, imagenes, bitacoras] = await Promise.all([
      this.usuariosRepository.count(),
      this.productosRepository.count(),
      this.categoriasRepository.count(),
      this.imagenesRepository.count(),
      this.bitacoraRepository.count(),
    ]);

    const recentUsers = await this.usuariosRepository.find({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        activo: true,
        created_at: true,
      },
      order: { created_at: 'DESC' },
      take: 5,
    });

    const recentProducts = await this.productosRepository.find({
      relations: { categoria: true },
      select: {
        id: true,
        nombre: true,
        precio: true,
        stock: true,
        activo: true,
        created_at: true,
        categoria: {
          id: true,
          nombre: true,
        },
      },
      order: { created_at: 'DESC' },
      take: 5,
    });

    const recentActivity = await this.bitacoraRepository.find({
      relations: { usuario: true },
      order: { fecha: 'DESC' },
      take: 10,
    });

    return {
      counts: {
        usuarios,
        productos,
        categorias,
        imagenes,
        bitacoras,
      },
      recentUsers,
      recentProducts,
      recentActivity: recentActivity.map((b) => ({
        id: b.id,
        accion: b.accion,
        descripcion: b.descripcion,
        tabla_afectada: b.tabla_afectada,
        registro_id: b.registro_id,
        fecha: b.fecha,
        usuario: b.usuario
          ? {
              id: b.usuario.id,
              nombre: b.usuario.nombre,
              email: b.usuario.email,
            }
          : null,
      })),
    };
  }
}
