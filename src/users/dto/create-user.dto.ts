import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";
import { CreateCompanyDto } from "src/companies/dto/create-company.dto";
import { ResumeInfo } from "./update-user.dto";

// data transfer object

class Company {

    @ApiProperty({ example: "65479203803672ec272a5e01" })
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId

    @ApiProperty({ example: "Facebook" })
    @IsNotEmpty()
    name: string;
}

class Job {

    @ApiProperty({ example: "65707aa5e8f7f017b0c0c737" })
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId

    @ApiProperty({ example: "Frontend Developer" })
    @IsNotEmpty()
    name: string
}

export class CreateUserDto {

    @ApiProperty({ example: "Nguyen A" })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ example: "nguyenvana@gmail.com" })
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ example: "input password here" })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @ApiHideProperty()
    @IsOptional()
    avatar: string;

    @ApiHideProperty()
    @IsOptional()
    age: number;

    @ApiHideProperty()
    @IsOptional()
    gender: string;

    @ApiHideProperty()
    @IsOptional()
    address: string;


    @ApiProperty({ example: "6562bc2e580be515cf155743" })
    @IsNotEmpty({ message: 'Role is required' })
    @IsMongoId({ message: 'Role is must be a ObjectId' })
    role: mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        example: {
            "_id": "65479203803672ec272a5e01",
            "name": "Facebook"
        }
    })
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}

export class RegisterUserDto {


    @IsNotEmpty({ message: 'Name is required' })
    @ApiProperty({ example: "John Doe" })
    name: string;


    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    @ApiProperty({ example: "johndoe@gmail.com" })
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty({ example: "input password here" })
    password: string;

    @ApiHideProperty()
    age: number;

    @ApiHideProperty()
    gender: string;

    @ApiHideProperty()
    address: string;

    @IsOptional()
    @ApiHideProperty()
    preferJobs: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string
    }[]

    @IsOptional()
    @ApiHideProperty()
    listCv: ResumeInfo[]
}


export class RegisterRecruiterDto {


    @IsNotEmpty({ message: 'Name is required' })
    @ApiProperty({ example: "John Doe" })
    name: string;


    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    @ApiProperty({ example: "johndoe@gmail.com" })
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty({ example: "input password here" })
    password: string;

    @ApiHideProperty()
    age: number;


    @ApiHideProperty()
    gender: string;

    @ApiHideProperty()
    address: string;

    @ApiProperty({
        example: {
            "name": "Facebook",
            "address": "USA",
            "description": "Facebook is a social networking site that makes it easy for you to connect and share with family and friends online.",
            "logo": "https://www.facebook.com/images/fb_icon_325x325.png"
        }
    })
    @IsNotEmptyObject()
    company: CreateCompanyDto;
}



export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "johndoe@gmail.com" })
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'input password here' })
    readonly password: string;
}
