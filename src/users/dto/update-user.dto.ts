import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsMongoId, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';

class Company {
    _id: mongoose.Schema.Types.ObjectId
    name: string;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {
    @IsNotEmpty({ message: '_id is required' })
    _id: string;

    @IsOptional()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    avatar: string;

    @IsOptional()
    age: number;
    @IsOptional()
    gender: string;

    @IsOptional()
    address: string;

    @IsMongoId({ message: 'Role is must be a ObjectId' })
    role: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}
