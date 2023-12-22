import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsObject } from "class-validator";
import mongoose from "mongoose";

export class CreateResumeDto {

    @ApiProperty({ example: "nguyenvana@gmail.com" })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ example: "65733d2bf9bb786589249c33" })
    @IsNotEmpty({ message: 'UserId is required' })
    userId: mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        example: {
            "url": "https://drive.google.com/uc?id=1Vn85QZC32LC_zUAhfc8-qNo-PNc8NIph",
            "name": "Contract-1702203700883.pdf"
        }
    })
    @IsNotEmpty({ message: 'Url is required' })
    file: {
        url: string,
        name: string
    };

    @ApiProperty({ example: "PENDING" })
    @IsNotEmpty({ message: 'Status is required' })
    status: string;


    @ApiProperty({ example: "64871701c7573fac797f83ea" })
    @IsNotEmpty({ message: 'CompanyId is required' })
    companyId: mongoose.Schema.Types.ObjectId;

    @ApiProperty({ example: "6487e52ae263fe0b853d752a" })
    @IsNotEmpty({ message: 'JobId is required' })
    jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {

    // @IsNotEmpty({ message: 'Url is required' })
    // url: string;
    @ApiProperty({
        example: {
            "url": "https://drive.google.com/uc?id=1Vn85QZC32LC_zUAhfc8-qNo-PNc8NIph",
            "name": "Contract-1702203700883.pdf"
        }
    })
    @IsObject()
    file: {
        url: string,
        name: string
    }

    @ApiProperty({ example: "64871701c7573fac797f83ea" })
    @IsNotEmpty({ message: 'CompanyId is required' })
    companyId: string;

    @ApiProperty({ example: "6487e52ae263fe0b853d752a" })
    @IsNotEmpty({ message: 'JobId is required' })
    jobId: string;
}


export class createStorageResumeDto {

}
