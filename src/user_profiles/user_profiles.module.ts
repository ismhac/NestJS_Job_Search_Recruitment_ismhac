import { Module } from '@nestjs/common';
import { UserProfilesService } from './user_profiles.service';
import { UserProfilesController } from './user_profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Resume, ResumeSchema } from 'src/resumes/schemas/resume.schema';
import { UserProfile, UserProfileSchema } from './schemas/user_profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Resume.name, schema: ResumeSchema },
      { name: UserProfile.name, schema: UserProfileSchema }
    ]),
  ],
  controllers: [UserProfilesController],
  providers: [UserProfilesService],
  exports: [UserProfilesService]
})
export class UserProfilesModule { }
