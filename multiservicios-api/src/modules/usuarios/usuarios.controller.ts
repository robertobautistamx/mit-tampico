import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../../models/usuarios_entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('login')
  async login(
    @Body() body: { email?: string; password?: string },
  ): Promise<Omit<Usuario, 'password'>> {
    const email = String(body?.email ?? '').trim().toLowerCase();
    const password = String(body?.password ?? '');

    if (!email || !password.trim()) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const user = await this.usuariosService.findByEmail(email);
    if (!user || !user.activo) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const ok = await this.usuariosService.verifyPasswordAndMigrateIfNeeded(user, password);
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const { password: _password, ...safe } = user;
    return safe;
  }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Usuario | null> {
    return this.usuariosService.findOne(Number(id));
  }

  @Post()
  create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.create(usuario);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() usuario: Partial<Usuario>): Promise<Usuario | null> {
    return this.usuariosService.update(Number(id), usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usuariosService.remove(Number(id));
  }
}
