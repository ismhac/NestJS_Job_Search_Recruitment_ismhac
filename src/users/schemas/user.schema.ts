import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';
import { ResumeInfo } from '../dto/update-user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })

export class User {

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

    @Prop({ type: Object })
    company: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string
    }

    @Prop({ type: [Object] })
    listCv: ResumeInfo[]

    // list jobs user liked
    @Prop({ type: [Object] })
    preferJobs: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string
    }[]

    // list jobs user applied
    @Prop({ type: [Object] })
    appliedJobs: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string
    }[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
    role: mongoose.Schema.Types.ObjectId;

    @Prop()
    refreshToken: string;

    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpires: Date;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deleteAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
