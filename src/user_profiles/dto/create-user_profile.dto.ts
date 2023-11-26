import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";
import { CreateCompanyDto } from "src/companies/dto/create-company.dto";

export class CreateUserProfileDto {
    @IsNotEmpty()
    skills: string[];

    @IsNotEmpty()
    level: string;

    @IsOptional()
    isPublic: boolean;
}
