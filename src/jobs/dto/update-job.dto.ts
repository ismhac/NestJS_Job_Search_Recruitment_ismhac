import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

class Company {

    @ApiProperty({ example: "64871701c7573fac797f83ea", required: false })
    @IsOptional()
    _id: mongoose.Schema.Types.ObjectId;


    @ApiProperty({ example: "Meta-Facebook", required: false })
    @IsOptional()
    name: string;

    @ApiProperty({ example: "https://www.facebook.com/images/fb_icon_325x325.png", required: false })
    @IsOptional()
    logo: string;
}

export class UpdateJobDto extends PartialType(CreateJobDto) {

    @ApiProperty({ example: "Senior Frontend Developer", required: false })
    @IsOptional()
    name: string;


    @ApiProperty({ example: ["NextJS", "Redux"], required: false })
    @IsOptional()
    @IsArray({ message: 'Skills must be an array' })
    @IsString({ each: true, message: 'Each skill must be a string' })
    skills: string[];


    // @ApiProperty({
    //     example: {
    //         "_id": "64871701c7573fac797f83ea",
    //         "name": "Facebook",
    //         "logo": "https://www.facebook.com/images/fb_icon_325x325.png"
    //     },
    //     required: false
    // })
    // @IsOptional()
    // @IsObject()
    // @ValidateNested()
    // @Type(() => Company)
    // company: Company;

    @IsOptional()
    @ApiProperty({ example: "64871701c7573fac797f83ea" })
    company: string


    @ApiProperty({ example: "NewYork", required: false })
    @IsOptional()
    location: string;

    @ApiProperty({ example: 3000, required: false })
    @IsOptional()
    salary: number;

    @ApiProperty({ example: 2, required: false })
    @IsOptional()
    quantity: number;


    @ApiProperty({ example: "SENIOR", required: false })
    @IsOptional()
    level: string;

    @ApiProperty({ example: "Input description here", required: false })
    @IsOptional()
    description: string;


    @ApiProperty({ example: "2021-05-23T00:00:00.000Z", required: false })
    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'Start date must be a date' })
    startDate: Date;

    @ApiProperty({ example: "2021-06-23T00:00:00.000Z", required: false })
    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'End date must be a date' })
    endDate: Date;

    @ApiProperty({ example: false, required: false })
    @IsOptional()
    @IsBoolean({ message: 'Is active must be a boolean' })
    isActive: boolean;
}
