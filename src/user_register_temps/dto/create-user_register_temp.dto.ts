import { IsEmail, IsOptional } from "class-validator";


class createCompanyDto {
    @IsOptional()
    name: string

    @IsOptional()
    address: string

    @IsOptional()
    description: string

    @IsOptional()
    logo: string
}

export class CreateUsersRegisterTempDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    password: string

    @IsOptional()
    name: string

    @IsOptional()
    age: number

    @IsOptional()
    gender: string

    @IsOptional()
    address: string

    @IsOptional()
    company: createCompanyDto
}
