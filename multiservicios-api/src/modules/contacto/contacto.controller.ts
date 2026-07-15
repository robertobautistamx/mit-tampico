import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ContactoService } from './contacto.service';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Post()
  async enviarContacto(
    @Body() body: { nombre?: string; email?: string; telefono?: string; mensaje?: string },
  ) {
    const nombre = String(body?.nombre ?? '').trim();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const telefono = String(body?.telefono ?? '').trim();
    const mensaje = String(body?.mensaje ?? '').trim();

    if (!nombre) {
      throw new BadRequestException('El nombre es requerido.');
    }
    if (!email) {
      throw new BadRequestException('El correo electrónico es requerido.');
    }
    if (!telefono) {
      throw new BadRequestException('El teléfono es requerido.');
    }

    const success = await this.contactoService.enviarMensaje(nombre, email, telefono, mensaje);
    return {
      success,
      message: 'Mensaje de contacto enviado con éxito.',
    };
  }
}
