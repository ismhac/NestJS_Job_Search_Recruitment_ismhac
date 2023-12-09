import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas/job.schema';
import { Resume, ResumeSchema } from 'src/resumes/schemas/resume.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: Resume.name, schema: ResumeSchema },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule { }
