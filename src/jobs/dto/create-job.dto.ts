import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

export class CreateJobDto {

    @ApiProperty({ example: "Frontend ReactJS Developer" })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ example: ["ReactJS", "Angular"] })
    @IsNotEmpty({ message: 'Skills is required' })
    @IsArray({ message: 'Skills must be an array' })
    @IsString({ each: true, message: 'Each skill must be a string' })
    skills: string[];

    @IsNotEmpty()
    @ApiProperty({ example: "64871701c7573fac797f83ea" })
    company: string

    @ApiProperty({ example: "Menlo Park, California" })
    @IsNotEmpty({ message: 'Location is required' })
    location: string;

    @ApiProperty({ example: 2500 })
    @IsNotEmpty({ message: 'Salary is required' })
    salary: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: 'Quantity is required' })
    quantity: number;

    @ApiProperty({ example: "MIDDLE" })
    @IsNotEmpty({ message: 'Level is required' })
    level: string;

    @ApiProperty({ example: "Input description here" })
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @ApiProperty({ example: "2021-05-23T00:00:00.000Z" })
    @IsNotEmpty({ message: 'Start date is required' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'Start date must be a date' })
    startDate: Date;

    @ApiProperty({ example: "2021-06-23T00:00:00.000Z" })
    @IsNotEmpty({ message: 'End date is required' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'End date must be a date' })
    endDate: Date;

    @ApiProperty({ example: true })
    @IsNotEmpty({ message: 'Is active is required' })
    @IsBoolean({ message: 'Is active must be a boolean' })
    isActive: boolean;
}
