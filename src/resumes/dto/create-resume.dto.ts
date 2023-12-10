import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsObject } from "class-validator";
import mongoose from "mongoose";

export class CreateResumeDto {

    @IsNotEmpty({ message: 'Email is required' })
    email: string;


    @IsNotEmpty({ message: 'UserId is required' })
    userId: mongoose.Schema.Types.ObjectId;


    @IsNotEmpty({ message: 'Url is required' })
    url: string;


    @IsNotEmpty({ message: 'Status is required' })
    status: string;


    @IsNotEmpty({ message: 'CompanyId is required' })
    companyId: mongoose.Schema.Types.ObjectId;


    @IsNotEmpty({ message: 'JobId is required' })
    jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {

    // @IsNotEmpty({ message: 'Url is required' })
    // url: string;
    @ApiProperty()
    @IsObject()
    file: {
        url: string,
        name: string
    }

    @ApiProperty()
    @IsNotEmpty({ message: 'CompanyId is required' })
    @IsMongoId({ message: 'companyId is a mongoId' })
    companyId: mongoose.Schema.Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty({ message: 'JobId is required' })
    @IsMongoId({ message: 'jobId is a mongoId' })
    jobId: mongoose.Schema.Types.ObjectId;
}


export class createStorageResumeDto {

}
