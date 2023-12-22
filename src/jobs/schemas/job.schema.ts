import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/base_schemas/base.schema';
import { Company } from 'src/companies/schemas/company.schema';
import { User } from 'src/users/schemas/user.schema';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job extends BaseSchema {

    @Prop()
    name: string;

    @Prop()
    skills: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
    company: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "USer" })
    likedUsers: mongoose.Schema.Types.ObjectId[];

    // list user applied job
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "User" })
    appliedUsers: mongoose.Schema.Types.ObjectId[];

    @Prop()
    location: string;

    @Prop()
    salary: number;

    @Prop()
    quantity: number;

    @Prop()
    level: string;

    @Prop()
    description: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    isActive: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
