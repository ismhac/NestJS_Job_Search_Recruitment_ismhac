import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { DatabasesModule } from './databases/databases.module';
import { FilesModule } from './files/files.module';
import { JobsModule } from './jobs/jobs.module';
import { MailModule } from './mail/mail.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ResumesModule } from './resumes/resumes.module';
import { RolesModule } from './roles/roles.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,  // import UsersModule

    AuthModule,  // import AuthModule

    CompaniesModule, // import CompaniesModule

    JobsModule, // import JobsModule

    FilesModule, // import FilesModule

    ResumesModule, // import ResumesModule

    PermissionsModule,  // import PermissionsModule

    RolesModule, // import RolesModule
    DatabasesModule, SubscribersModule, MailModule, HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule { }
