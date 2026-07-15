import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactoService {
  private readonly logger = new Logger(ContactoService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST', 'smtp.office365.com'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });
  }

  async enviarMensaje(nombre: string, email: string, telefono: string, mensaje?: string): Promise<boolean> {
    const to = this.configService.get<string>('SMTP_TO');
    const from = this.configService.get<string>('SMTP_FROM', `"Contacto MIT Tampico" <${this.configService.get<string>('SMTP_USER')}>`);

    if (!to || !this.configService.get<string>('SMTP_USER') || !this.configService.get<string>('SMTP_PASS')) {
      this.logger.error('SMTP configuration is incomplete in .env file.');
      throw new InternalServerErrorException('El servicio de correo no está configurado correctamente.');
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <div style="background-color: #0F172A; padding: 20px; text-align: center; color: #FFFFFF;">
          <h2 style="margin: 0; color: #3B82F6; font-size: 24px;">MIT TAMPICO</h2>
          <p style="margin: 5px 0 0 0; color: #94A3B8; font-size: 14px;">Nuevo Mensaje del Formulario de Contacto</p>
        </div>
        <div style="padding: 24px; background-color: #FFFFFF; color: #334155; line-height: 1.6;">
          <h3 style="margin-top: 0; color: #0F172A; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;">Detalles del remitente</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px; color: #475569;">Nombre:</td>
              <td style="padding: 6px 0; color: #0F172A;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #475569;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #475569;">Teléfono:</td>
              <td style="padding: 6px 0; color: #0F172A;">${telefono}</td>
            </tr>
          </table>

          <h3 style="color: #0F172A; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;">Mensaje</h3>
          <div style="background-color: #F8FAFC; padding: 16px; border-radius: 6px; border-left: 4px solid #3B82F6; font-style: italic; color: #1E293B; margin-top: 8px;">
            ${mensaje ? mensaje.replace(/\n/g, '<br/>') : '<span style="color: #94A3B8;">Sin mensaje adicional.</span>'}
          </div>
        </div>
        <div style="background-color: #F8FAFC; padding: 15px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0;">
          Este correo fue generado automáticamente por el sitio web de MIT Tampico.
        </div>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: from,
        to: to,
        subject: `Nuevo contacto: ${nombre}`,
        text: `Nuevo contacto de: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje || 'Sin mensaje adicional.'}`,
        html: htmlContent,
      });

      this.logger.log(`Mensaje de contacto enviado con éxito de ${email}`);
      return true;
    } catch (error) {
      this.logger.error('Error al enviar correo SMTP:', error);
      throw new InternalServerErrorException('Ocurrió un error al intentar enviar el correo electrónico.');
    }
  }
}
