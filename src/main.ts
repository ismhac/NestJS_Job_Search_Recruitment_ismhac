import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import expressListRoutes from 'express-list-routes';
import { PermissionsService } from './permissions/permissions.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);                   // using .env
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));               // use guard - jwt-auth.guard.ts
  app.useGlobalInterceptors(new TransformInterceptor(reflector)); // custom response - transform.interceptor.ts

  app.useStaticAssets(join(__dirname, '..', 'public'));           // js, css, images
  app.setBaseViewsDir(join(__dirname, '..', 'views'));            // views
  app.setViewEngine('ejs');                                       // view engine

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  // config cookies
  // app.use(cookieParser());

  // config CORS
  app.enableCors({
    origin: [
      /^(.*)/,
    ],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true,
  });

  // config versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI, // default: /v 
    defaultVersion: ['1'] // => /api/v1 or /api/v2
  });

  // config helmet
  app.use(helmet());

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('RM APIs Document')
    .setDescription('The API description')
    .setVersion('1.0')
    // .addTag('')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      // defaultModelsExpandDepth: -1, // disable show dto
    },
  });

  await app.listen(configService.get<string>('PORT') || 8000);


  // const server: any = app.getHttpServer();
  // const existingRoutes = server._events.request._router;
  // expressListRoutes(existingRoutes);
  // // console.log(existingRoutes);

  // const routesWithRoute = existingRoutes.stack.filter(layer => layer.route);

  // console.log(`Tổng số routes có Route: ${routesWithRoute.length}`);

  // routesWithRoute.forEach((route, index) => {
  //   const method = Object.keys(route.route.methods)[0].toUpperCase();
  //   const path = route.route.path;
  //   console.log(`Route ${index + 1}: Method: ${method}, Path: ${path}`);
  // });
  const permissionService = app.get(PermissionsService);

  // Lấy thông tin từ existingRoutes
  const server: any = app.getHttpServer();
  const existingRoutes = server._events.request._router;
  const routesWithRoute = existingRoutes.stack.filter(layer => layer.route);

  // Tạo mảng permissions từ thông tin routes
  const initialPermissions = routesWithRoute.map(route => ({
    apiPath: route.route.path,
    method: Object.keys(route.route.methods)[0].toUpperCase(),
  }));

  // Khởi tạo dữ liệu quyền
  console.table(initialPermissions);
  await permissionService.initializePermissions(initialPermissions);


}
bootstrap();
