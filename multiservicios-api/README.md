# Multiservicios API (NestJS + TypeORM)

API para **Multiservicios Integrales Tampico** construida con NestJS, TypeORM y MySQL.

## Requisitos

- Node.js 
- MySQL (o MariaDB compatible)

## Configuración

1) Instalar dependencias:

```bash
npm install
```

2) Variables de entorno

Este proyecto usa `@nestjs/config` y lee variables desde un archivo `.env`.

```env
PORT=3000
NODE_ENV=development

# Opcional (default: 10)
BCRYPT_SALT_ROUNDS=10

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=MIT_TAMPICO
```

Notas:

- `synchronize` está en `false`, así que **la base de datos debe existir con su esquema**.
- CORS está habilitado (`origin: true`, `credentials: true`).

## Ejecutar

```bash
# modo desarrollo
npm run start

# watch mode
npm run start:dev

# producción (requiere build previo)
npm run build
npm run start:prod
```

La API levanta por defecto en `http://localhost:3000` y usa el prefijo global:

```
/api/v1
```

## Rutas principales

Todas las rutas están bajo `/api/v1`.

- `POST /usuarios/login`
- `GET /usuarios` | `GET /usuarios/:id` | `POST /usuarios` | `PUT /usuarios/:id` | `DELETE /usuarios/:id`
- `GET /productos` | `GET /productos/:id` | `POST /productos` | `PUT /productos/:id` | `DELETE /productos/:id`
- `GET /categorias` | `GET /categorias/:id` | `POST /categorias` | `PUT /categorias/:id` | `DELETE /categorias/:id`
- `GET /imagenes` | `GET /imagenes/:id` | `POST /imagenes` | `PUT /imagenes/:id` | `DELETE /imagenes/:id`
- `GET /bitacora` | `GET /bitacora/:id`
- `GET /dashboard`

## Pruebas

```bash
npm run test
npm run test:e2e
```

## Notas de seguridad

- La contraseña se guarda con **hash bcrypt** (usando `bcryptjs`).
- Si existían usuarios con contraseña en texto plano, al primer login exitoso se migra automáticamente a hash.