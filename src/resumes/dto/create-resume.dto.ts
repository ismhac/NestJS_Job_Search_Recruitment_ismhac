import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateResumeDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'UserId is required' })
    userId: mongoose.Schema.Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty({ message: 'Url is required' })
    url: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Status is required' })
    status: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'CompanyId is required' })
    companyId: mongoose.Schema.Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty({ message: 'JobId is required' })
    jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Url is required' })
    url: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'CompanyId is required' })
    @IsMongoId({ message: 'companyId is a mongoId' })
    companyId: mongoose.Schema.Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty({ message: 'JobId is required' })
    @IsMongoId({ message: 'jobId is a mongoId' })
    jobId: mongoose.Schema.Types.ObjectId;
}
