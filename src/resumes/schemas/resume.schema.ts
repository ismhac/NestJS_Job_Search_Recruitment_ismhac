import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from 'src/base_schemas/base.schema';
import { Company } from 'src/companies/schemas/company.schema';
import { Job } from 'src/jobs/schemas/job.schema';
import { User } from 'src/users/schemas/user.schema';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume extends BaseSchema {

    @Prop()
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Object })
    // url: string;
    file: {
        url: string,
        name: string
    }

    @Prop()
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    company: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Job.name })
    job: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.Array })
    history: {
        status: string,
        updatedAt: Date,
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId,
            email: string
        };
    }[]
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
