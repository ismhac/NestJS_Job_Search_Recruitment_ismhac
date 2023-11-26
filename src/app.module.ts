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
import { HealthModule } from './health/health.module';
import { JobsModule } from './jobs/jobs.module';
import { MailModule } from './mail/mail.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ResumesModule } from './resumes/resumes.module';
import { RolesModule } from './roles/roles.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { UsersModule } from './users/users.module';
import { DatabasesService } from './databases/databases.service';
import { DatabasesController } from './databases/databases.controller';
import { UserProfilesModule } from './user_profiles/user_profiles.module';

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

    UsersModule,
    AuthModule,
    CompaniesModule,
    JobsModule,
    FilesModule,
    ResumesModule,
    PermissionsModule,
    RolesModule,
    DatabasesModule,
    SubscribersModule,
    MailModule,
    HealthModule,
    UserProfilesModule,
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
