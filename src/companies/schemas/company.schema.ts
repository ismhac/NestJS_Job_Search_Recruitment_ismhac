import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
    @Prop()
    private createdAt: Date;
    @Prop()
    private deleteAt: Date;
    @Prop()
    private isDeleted: boolean;
    @Prop()
    private updatedAt: Date;
    @Prop()
    address: string;
    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }
    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }
    @Prop()
    description: string;
    @Prop()
    logo: string;
    @Prop()
    name: string;
    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }
}

export const CompanySchema = SchemaFactory.createForClass(Company);
