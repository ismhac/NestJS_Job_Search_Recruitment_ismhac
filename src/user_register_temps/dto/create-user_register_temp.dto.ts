import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";


class createCompanyDto {

    @ApiProperty({ example: "Facebook" })
    @IsOptional()
    name: string

    @ApiProperty({ example: "USA" })
    @IsOptional()
    address: string

    @ApiProperty({ example: "facebook is a big tech" })
    @IsOptional()
    description: string

    @ApiProperty({ example: "http://facebook.jpg" })
    @IsOptional()
    logo: string
}

export class CreateUsersRegisterTempDto {
    @ApiProperty({ example: "hiuser@gmail.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "input password here" })
    @IsNotEmpty()
    password: string

    @ApiProperty({ example: "HiUser" })
    @IsOptional()
    name: string

    @ApiProperty({ example: 21 })
    @IsOptional()
    age: number

    @ApiProperty({ example: "MALE" })
    @IsOptional()
    gender: string

    @ApiProperty({ example: "HCM City" })
    @IsOptional()
    address: string

    @ApiProperty()
    @IsOptional()
    company: createCompanyDto
}
