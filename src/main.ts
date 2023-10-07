import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);                   // using .env
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));               // use guard - jwt-auth.guard.ts
  app.useGlobalInterceptors(new TransformInterceptor(reflector)); // custom response - transform.interceptor.ts

  app.useStaticAssets(join(__dirname, '..', 'public'));           // js, css, images
  app.setBaseViewsDir(join(__dirname, '..', 'views'));            // views
  app.setViewEngine('ejs');                                       // view engine

  app.useGlobalPipes(new ValidationPipe());

  // config cookies
  // app.use(cookieParser());

  // config CORS
  app.enableCors({
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true
  });

  // config versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI, // default: /v 
    defaultVersion: ['1', '2'] // => /api/v1 or /api/v2
  });

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('RM SWAGGER')
    .setDescription('The API description')
    .setVersion('1.0')
    // .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
