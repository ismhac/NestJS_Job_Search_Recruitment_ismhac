import { Module } from '@nestjs/common';
import { UsersRegisterTempsController } from './user_register_temps.controller';
import { UsersRegisterTempsService } from './user_register_temps.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRegisterTempSchema, UsersRegisterTemp } from './schema/user_register_temp.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { Company, CompanySchema } from 'src/companies/schemas/company.schema';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';
import { Resume, ResumeSchema } from 'src/resumes/schemas/resume.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersRegisterTemp.name, schema: UserRegisterTempSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Job.name, schema: JobSchema },
      { name: Resume.name, schema: ResumeSchema },
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
  providers: [UsersRegisterTempsService, UsersService, RolesService],
})
export class UserRegisterTempsModule { }
