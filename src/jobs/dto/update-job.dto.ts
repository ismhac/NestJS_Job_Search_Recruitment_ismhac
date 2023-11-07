import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';

class Company {

    @IsOptional()
    _id: mongoose.Schema.Types.ObjectId;


    @IsOptional()
    name: string;


    @IsOptional()
    logo: string;
}

export class UpdateJobDto extends PartialType(CreateJobDto) {

    @IsOptional()
    name: string;


    @IsOptional()
    @IsArray({ message: 'Skills must be an array' })
    @IsString({ each: true, message: 'Each skill must be a string' })
    skills: string[];


    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;


    @IsOptional()
    location: string;


    @IsOptional()
    salary: number;


    @IsOptional()
    quantity: number;


    @IsOptional()
    level: string;



    @IsOptional()
    description: string;


    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'Start date must be a date' })
    startDate: Date;


    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'End date must be a date' })
    endDate: Date;


    @IsOptional()
    @IsBoolean({ message: 'Is active must be a boolean' })
    isActive: boolean;
}
