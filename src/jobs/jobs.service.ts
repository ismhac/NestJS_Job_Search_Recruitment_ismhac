import { Injectable, Logger } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { DatabasesService } from 'src/databases/databases.service';
import { Resume, ResumeDocument } from 'src/resumes/schemas/resume.schema';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,

    @InjectModel(Resume.name)
    private resumeModel: SoftDeleteModel<ResumeDocument>,
  ) { }

  private readonly logger = new Logger(DatabasesService.name);

  async create(createJobDto: CreateJobDto, user: IUser) {
    const {
      name, skills, company, location, salary,
      quantity, level, description, startDate, endDate, isActive
    } = createJobDto;
    return await this.jobModel.create({
      name, skills, company, location, salary,
      quantity, level, description, startDate, endDate, isActive,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  convertStringToRegExp(filter) {
    for (let key in filter) {
      if (typeof filter[key] === 'string') {
        if (filter[key] === '' || filter[key] === '//i') {
          delete filter[key];
        } else {
          let match = filter[key].match(new RegExp('^/(.*?)/([gimy]*)$'));
          if (match) {
            filter[key] = new RegExp(match[1], match[2]);
          }
        }
      } else if (Array.isArray(filter[key])) {
        filter[key] = filter[key].filter(value => value !== '' && value !== '//i').map(value => {
          if (typeof value === 'string') {
            let match = value.match(new RegExp('^/(.*?)/([gimy]*)$'));
            if (match) {
              return new RegExp(match[1], match[2]);
            }
          }
          return value;
        });
        if (filter[key].length === 0) {
          delete filter[key];
        }
      } else if (typeof filter[key] === 'object') {
        if (Object.keys(filter[key]).length === 0 ||
          ('$gte' in filter[key] && (filter[key]['$gte'] === '' || filter[key]['$gte'] === undefined)) ||
          ('$lte' in filter[key] && (filter[key]['$lte'] === '' || filter[key]['$lte'] === undefined)) ||
          ('$in' in filter[key] && (filter[key]['$in'].length === 0))) {
          delete filter[key];
        } else {
          this.convertStringToRegExp(filter[key]);
        }
      }
    }
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    let { filter, sort, population } = aqp(queryString);
    delete filter.current;
    delete filter.pageSize;

    this.convertStringToRegExp(filter);
    // this.logger.log(filter);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const results = await this.jobModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      results
    }
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found job';
    }
    return this.jobModel.findById(id);
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    return await this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found job';
    }

    await this.jobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )

    return this.jobModel.softDelete({ _id: id });
  }
}
