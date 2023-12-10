import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";
import { CreateCompanyDto } from "src/companies/dto/create-company.dto";

// data transfer object

class Company {


    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId


    @IsNotEmpty()
    name: string;
}

class Job {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId

    @IsNotEmpty()
    name: string
}

export class CreateUserDto {


    @IsNotEmpty({ message: 'Name is required' })
    name: string;


    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsOptional()
    avatar: string;


    @IsOptional()
    age: number;


    @IsOptional()
    gender: string;


    @IsOptional()
    address: string;


    @IsNotEmpty({ message: 'Role is required' })
    @IsMongoId({ message: 'Role is must be a ObjectId' })
    role: mongoose.Schema.Types.ObjectId;

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
    @ApiProperty({ example: "useremail@gmail.com" })
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty({ example: "userpassword" })
    password: string;

    // @IsNotEmpty({ message: 'Age is required' })
    @ApiHideProperty()
    age: number;

    // @IsNotEmpty({ message: 'Gender is required' })
    @ApiHideProperty()
    gender: string;

    // @IsNotEmpty({ message: 'Address is required' })
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
    listCv: {
        file: {
            url: string,
            name: string
        }
    }[]
}


export class RegisterRecruiterDto {


    @IsNotEmpty({ message: 'Name is required' })
    @ApiProperty({ example: "John Doe" })
    name: string;


    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    @ApiProperty({ example: "useremail@gmail.com" })
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty({ example: "userpassword" })
    password: string;

    // @IsNotEmpty({ message: 'Age is required' })
    @ApiHideProperty()
    age: number;


    // @IsNotEmpty({ message: 'Gender is required' })
    @ApiHideProperty()
    gender: string;

    // @IsNotEmpty({ message: 'Address is required' })
    @ApiHideProperty()
    address: string;

    @IsNotEmptyObject()
    company: CreateCompanyDto;
}



export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "useremail@gmail.com" })
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'userpassword' })
    readonly password: string;
}
