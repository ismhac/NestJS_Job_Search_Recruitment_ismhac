import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';

@Injectable()
export class ResumesService {

  constructor(
    @InjectModel(Resume.name)
    private resumeModel: SoftDeleteModel<ResumeDocument>,

    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,

  ) { }

  async findByUsers(user: IUser) {
    return await this.resumeModel.find({ userId: user._id })
      .sort("-createdAt")
      .populate([
        {
          path: "companyId", // join 
          select: { name: 1 }
        },
        {
          path: "jobId", // join
          select: { name: 1 }
        }
      ]);
  }

  async create(createUserCvDto: CreateUserCvDto, user: IUser) {
    const { file, companyId, jobId } = createUserCvDto;
    const { email, _id } = user;

    const existingResume = await this.resumeModel.findOne({ jobId, userId: _id });
    if (existingResume) throw new BadRequestException(`Resume of user with _id ${_id} for job ${jobId} is already exist`)

    const currentJob = await this.jobModel.find({ _id: jobId }).select({ "name": 1 });
    const jobName = currentJob[0].name;


    const newCv = await this.resumeModel.create({
      file, companyId, jobId, email, userId: _id,
      status: "PENDING",
      createdBy: { _id, email },
      history: [
        {
          status: "PENDING",
          updateAt: new Date,
          updateBy: {
            _id: user._id,
            email: user.email
          }
        }
      ]
    })

    await this.jobModel.updateOne(
      { _id: jobId },
      {
        $addToSet: {
          appliedUsers: {
            _id: user._id,
            name: user.name,
            email: user.email
          }
        },
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )

    await this.userModel.updateOne(
      { _id: user._id },
      {
        $addToSet: {
          appliedJobs: {
            _id: jobId,
            name: jobName,
          }
        },
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return newCv;
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, sort, population, projection } = aqp(queryString);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.resumeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.resumeModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found resume');
    }

    return await this.resumeModel.findById(id);
  }

  async update(id: string, status: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found resume');
    }

    const updateResume = await this.resumeModel.updateOne(
      { _id: id },
      {
        status,
        updatedBy: {
          _id: user._id,
          email: user.email
        },
        $push: {
          history: {
            status: status,
            updateAt: new Date,
            updateBy: {
              _id: user._id,
              email: user.email
            }
          }
        }
      });

    return updateResume;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found resume');
    }

    await this.resumeModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )

    return this.resumeModel.softDelete({ _id: id });
  }
}
