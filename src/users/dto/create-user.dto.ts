import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

// data transfer object

class Company {

    @ApiProperty()
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId

    @ApiProperty()
    @IsNotEmpty()
    name: string;
}

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Age is required' })
    age: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Gender is required' })
    gender: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Address is required' })
    address: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Role is required' })
    @IsMongoId({ message: 'Role is must be a ObjectId' })
    role: mongoose.Schema.Types.ObjectId;

    @ApiProperty()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}

export class RegisterUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty()
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
