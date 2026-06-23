import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.NODE_ENV === 'production'
      ? [
          process.env.FRONTEND_URL,
          process.env.PANEL_URL,
        ].filter((url): url is string => !!url)
      : true,
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