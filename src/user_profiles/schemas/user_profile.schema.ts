import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { type } from 'os';

export type UserProfileDocument = HydratedDocument<UserProfile>;

@Schema({ timestamps: true })

export class UserProfile {

    @Prop({ type: Object })
    resumeInfo: {
        _id: mongoose.Schema.Types.ObjectId;
        url: string,
    }

    @Prop({ type: Object })
    userInfo: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string,
        age: number,
        address: string,
        email: string,
    }

    @Prop({ type: [String] })
    skills: string[];

    @Prop({ type: String })
    level: string;

    @Prop({ tyle: Boolean })
    isPublic: boolean;

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

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
