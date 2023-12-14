import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
import { HydratedDocument } from "mongoose";


export type UserRegisterTempDocument = HydratedDocument<UsersRegisterTemp>;

@Schema({ timestamps: true })


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

export class UsersRegisterTemp {

    @Prop()
    registerToken: string;

    @Prop()
    registerTokenExpires: Date

    @Prop()
    @IsEmail()
    email: string;

    @Prop()
    password: string

    @Prop()
    name: string

    @Prop()
    age: number

    @Prop()
    gender: string

    @Prop()
    address: string

    @Prop()
    company: companyTemp
}

export const UserRegisterTempSchema = SchemaFactory.createForClass(UsersRegisterTemp);
