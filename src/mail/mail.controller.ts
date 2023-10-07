import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { Subscriber, SubscriberDocument } from 'src/subscribers/schemas/subscriber.schema';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,

    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,

    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,

  ) { }

  @Get()
  @Public()
  @ResponseMessage("Test email")
  async handleTestEmail() {
    const jobs = [
      {
        name: "ssss",
        company: "ssss",
        salary: "80000",
        skills: ["hih", "nodejs"]
      },
      {
        name: "ssss",
        company: "ssss",
        salary: "80000",
        skills: ["hih", "nodejs"]
      }
    ]

    const subscribers = await this.subscriberModel.find({});
    for (const subs of subscribers) {
      const subsSkills = subs.skills;
      const jobWithMatchingSkills = await this.jobModel.find({ skills: { $in: subsSkills } });
      if (jobWithMatchingSkills.length > 0) {
        const jobs = jobWithMatchingSkills.map(item => {
          return {
            name: item.name,
            company: item.company.name,
            salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " đ",
            skills: item.skills
          }
        })

        await this.mailerService.sendMail({
          to: "hachac2k2@gmail.com",
          from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Nice App! Confirm your Email',
          template: 'new-job',
          context: {
            receiver: subs.name,
            jobs: jobs,
          }
        });
      }
    }
  }
}
