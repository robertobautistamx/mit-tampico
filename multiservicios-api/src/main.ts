import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rawFrontend = process.env.FRONTEND_URL || '';
  const rawPanel = process.env.PANEL_URL || '';
  const allowedOrigins = [
    ...rawFrontend.split(','),
    ...rawPanel.split(','),
  ]
    .map(url => url.trim().replace(/\/$/, ''))
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (process.env.NODE_ENV !== 'production' || allowedOrigins.length === 0) {
        return callback(null, true);
      }

      const cleanOrigin = origin.replace(/\/$/, '');
      if (allowedOrigins.some(o => o === '*' || o === cleanOrigin)) {
        return callback(null, true);
      }

      return callback(null, true);
    },
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  console.clear();
  console.log(`
====================================================
   Server running on port: ${process.env.PORT ?? 3000}
   Environment: ${process.env.NODE_ENV ?? 'development'}
====================================================

          ███╗   ███╗██╗████████╗
          ████╗ ████║██║╚══██╔══╝
          ██╔████╔██║██║   ██║
          ██║╚██╔╝██║██║   ██║
          ██║ ╚═╝ ██║██║   ██║
          ╚═╝     ╚═╝╚═╝   ╚═╝

     Multiservicios Integrales Tampico
====================================================
`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();