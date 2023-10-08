import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company {

    @ApiProperty()
    @IsNotEmpty({ message: '_id is required' })
    _id: mongoose.Schema.Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty({ message: `Company's name is required` })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: `Company's logo is required` })
    logo: string;
}


export class CreateJobDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Skills is required' })
    @IsArray({ message: 'Skills must be an array' })
    @IsString({ each: true, message: 'Each skill must be a string' })
    skills: string[];

    @ApiProperty()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @ApiProperty()
    @IsNotEmpty({ message: 'Location is required' })
    location: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Salary is required' })
    salary: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Quantity is required' })
    quantity: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Level is required' })
    level: string;


    @ApiProperty()
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Start date is required' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'Start date must be a date' })
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'End date is required' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'End date must be a date' })
    endDate: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'Is active is required' })
    @IsBoolean({ message: 'Is active must be a boolean' })
    isActive: boolean;
}
