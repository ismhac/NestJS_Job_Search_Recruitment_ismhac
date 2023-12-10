import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsMongoId, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Company {
    _id: mongoose.Schema.Types.ObjectId
    name: string;
}

export class ResumeInfo {
    url: string
    name: string
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {
    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    avatar: string;

    @ApiProperty()
    @IsOptional()
    age: number;
    @IsOptional()
    gender: string;

    @ApiProperty()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsMongoId({ message: 'Role is must be a ObjectId' })
    role: mongoose.Schema.Types.ObjectId;

    @ApiProperty()
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @IsOptional()
    listCv: ResumeInfo[]
}


export class UpdateUserPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    inputNewPassWord: string;

    @ApiProperty()
    @IsNotEmpty()
    confirmNewPassWord: string;
}