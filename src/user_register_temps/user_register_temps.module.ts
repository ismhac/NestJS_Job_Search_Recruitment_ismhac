import { Module } from '@nestjs/common';
import { UsersRegisterTempsController } from './user_register_temps.controller';
import { UsersRegisterTempsService } from './user_register_temps.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRegisterTempSchema, UsersRegisterTemp } from './schema/user_register_temp.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersRegisterTemp.name, schema: UserRegisterTempSchema },
    ]),

    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_AUTH_USER'),
            pass: configService.get<string>('EMAIL_AUTH_PASS'),
          },
        },

        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        preview: configService.get<string>('EMAIL_PREVIEW') === 'true' ? true : false,
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [UsersRegisterTempsController],
  providers: [UsersRegisterTempsService],
})
export class UserRegisterTempsModule { }
