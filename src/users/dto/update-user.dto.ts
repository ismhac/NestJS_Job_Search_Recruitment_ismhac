import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsMongoId, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Company {

    @ApiProperty({ example: "65479203803672ec272a5e01" })
    _id: mongoose.Schema.Types.ObjectId

    @ApiProperty({ example: "Facebook" })
    name: string;
}

export class ResumeInfo {

    @ApiProperty({ example: "https://drive.google.com/uc?id=17X3xddksWlByMNqoRJ74v-JbZc28Pva5" })
    url: string

    @ApiProperty({ example: "C3_CaoCongThanh_20119374-1702547610110.pdf" })
    name: string
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {


    @ApiProperty({ example: "Nguyen Van A", required: false })
    @IsOptional()
    name: string;

    @ApiProperty({ example: "nguyenvana@gmail.com", required: false })
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "https://drive.google.com/uc?id=1ionPjJBgy1G5ewsfxhNb_VfbNJa1WCPo", required: false })
    @IsOptional()
    avatar: string;

    @ApiProperty({ example: 21, required: false })
    @IsOptional()
    age: number;

    @ApiProperty({ example: "MALE", required: false })
    @IsOptional()
    gender: string;

    @ApiProperty({ example: "Ho Chi Minh City", required: false })
    @IsOptional()
    address: string;

    @ApiProperty({ example: "6562bc2e580be515cf155743", required: false })
    @IsOptional()
    @IsMongoId({ message: 'Role is must be a ObjectId' })
    role: mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        example: {
            "_id": "65479203803672ec272a5e01",
            "name": "Facebook"
        },
        required: false
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @ApiProperty({
        example: [
            {
                url: "https://drive.google.com/uc?id=17X3xddksWlByMNqoRJ74v-JbZc28Pva5",
                name: "C3_CaoCongThanh_20119374-1702547610110.pdf"
            },
            {
                url: "https://drive.google.com/uc?id=17X3xddksWlByMNqoRJ74v-JbZc28Pva6",
                name: "C3_NguyenVanA_20119374-1702547610110.pdf"
            },
        ],
        required: false
    })
    @IsOptional()
    listCv: ResumeInfo[]
}


export class UpdateUserPasswordDto {

    @ApiProperty({ example: "input your new password here" })
    @IsNotEmpty()
    inputNewPassWord: string;

    @ApiProperty({ example: "retype your new password here" })
    @IsNotEmpty()
    confirmNewPassWord: string;
}