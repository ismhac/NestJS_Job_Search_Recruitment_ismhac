import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';
import { ResumeInfo } from '../dto/update-user.dto';
import { Job } from 'src/jobs/schemas/job.schema';
import { BaseSchema } from 'src/base_schemas/base.schema';
import { Company } from 'src/companies/schemas/company.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })

export class User extends BaseSchema {

    @Prop()
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    avatar: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    address: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    company: mongoose.Schema.Types.ObjectId

    @Prop({ type: [Object] })
    listCv: ResumeInfo[]

    // list jobs user liked
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Job.name })
    likeJobs: mongoose.Schema.Types.ObjectId[];

    // list jobs user applied
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Job.name })
    appliedJobs: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
    role: mongoose.Schema.Types.ObjectId;

    @Prop()
    refreshToken: string;

    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
