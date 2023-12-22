import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas/job.schema';
import { Resume, ResumeSchema } from 'src/resumes/schemas/resume.schema';
import { Company, CompanySchema } from 'src/companies/schemas/company.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: Resume.name, schema: ResumeSchema },
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule { }
