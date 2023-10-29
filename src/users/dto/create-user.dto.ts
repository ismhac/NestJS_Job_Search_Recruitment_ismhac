import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

// data transfer object

class Company {


    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId


    @IsNotEmpty()
    name: string;
}

export class CreateUserDto {


    @IsNotEmpty({ message: 'Name is required' })
    name: string;


    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    password: string;


    @IsNotEmpty({ message: 'Age is required' })
    age: number;


    @IsNotEmpty({ message: 'Gender is required' })
    gender: string;


    @IsNotEmpty({ message: 'Address is required' })
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
    name: string;


    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    // @IsNotEmpty({ message: 'Age is required' })
    age: number;

    // @IsNotEmpty({ message: 'Gender is required' })
    gender: string;

    // @IsNotEmpty({ message: 'Address is required' })
    address: string;
}

export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'captainhac', description: 'username' })
    readonly username: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '123456',
        description: 'password',
    })
    readonly password: string;
}
