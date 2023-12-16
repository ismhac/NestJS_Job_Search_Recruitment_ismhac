import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsOptional } from "class-validator";
import { HydratedDocument } from "mongoose";
import { BaseSchema } from "src/base_schemas/base.schema";


export type UserRegisterTempDocument = HydratedDocument<UsersRegisterTemp>;

class companyTemp {
    @Prop()
    name: string

    @Prop()
    address: string

    @Prop()
    description: string

    @Prop()
    logo: string
}

@Schema({ timestamps: true })
export class UsersRegisterTemp extends BaseSchema {

    @Prop()
    @IsOptional()
    registerToken: string;

    @Prop()
    @IsOptional()
    registerTokenExpires: Date

    @Prop()
    @IsEmail()
    email: string;

    @Prop()
    password: string

    @Prop()
    @IsOptional()
    name: string

    @Prop()
    @IsOptional()
    age: number

    @Prop()
    @IsOptional()
    gender: string

    @Prop()
    @IsOptional()
    address: string

    @Prop()
    @IsOptional()
    company: companyTemp
}

export const UserRegisterTempSchema = SchemaFactory.createForClass(UsersRegisterTemp);
