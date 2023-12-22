import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Resume.name, schema: ResumeSchema },
    { name: User.name, schema: UserSchema },
    { name: Job.name, schema: JobSchema }
  ])],
  controllers: [ResumesController],
  providers: [ResumesService],
  exports: [ResumesService]
})
export class ResumesModule { }
