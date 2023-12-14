import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company {


    @ApiProperty({ example: "64871701c7573fac797f83ea" })
    @IsNotEmpty({ message: '_id is required' })
    _id: mongoose.Schema.Types.ObjectId;


    @ApiProperty({ example: "Amazon" })
    @IsNotEmpty({ message: `Company's name is required` })
    name: string;

    @ApiProperty({ example: "https://www.facebook.com/images/fb_icon_325x325.png" })
    @IsNotEmpty({ message: `Company's logo is required` })
    logo: string;
}


export class CreateJobDto {

    @ApiProperty({ example: "Frontend ReactJS Developer" })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;


    @ApiProperty({ example: ["ReactJS", "Angular"] })
    @IsNotEmpty({ message: 'Skills is required' })
    @IsArray({ message: 'Skills must be an array' })
    @IsString({ each: true, message: 'Each skill must be a string' })
    skills: string[];


    @ApiProperty({
        example: {
            "_id": "64871701c7573fac797f83ea",
            "name": "Facebook",
            "logo": "https://www.facebook.com/images/fb_icon_325x325.png"
        }
    })
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @ApiHideProperty()
    @IsOptional()
    @IsArray({ message: 'Preferred users must be an array' })
    @IsObject({ each: true, message: 'Each preferred user must be an object' })
    preferredUsers: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
        email: string;
    }[];


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
