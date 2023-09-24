import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company {
    @IsNotEmpty({ message: '_id is required' })
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: `Company's name is required` })
    name: string;

    @IsNotEmpty({ message: `Company's logo is required` })
    logo: string;
}


export class CreateJobDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Skills is required' })
    @IsArray({ message: 'Skills must be an array' })
    @IsString({ each: true, message: 'Each skill must be a string' })
    skills: string[];

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @IsNotEmpty({ message: 'Location is required' })
    location: string;

    @IsNotEmpty({ message: 'Salary is required' })
    salary: number;

    @IsNotEmpty({ message: 'Quantity is required' })
    quantity: number;

    @IsNotEmpty({ message: 'Level is required' })
    level: string;

    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @IsNotEmpty({ message: 'Start date is required' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'Start date must be a date' })
    startDate: Date;

    @IsNotEmpty({ message: 'End date is required' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'End date must be a date' })
    endDate: Date;

    @IsNotEmpty({ message: 'Is active is required' })
    @IsBoolean({ message: 'Is active must be a boolean' })
    isActive: boolean;
}
