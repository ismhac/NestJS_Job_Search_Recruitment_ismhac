import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import mongoose from 'mongoose';
import { IsOptional } from 'class-validator';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {

    @IsOptional()
    email: string;

    @IsOptional()
    userId: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    url: string;

    @IsOptional()
    status: string;

    @IsOptional()
    companyId: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    jobId: mongoose.Schema.Types.ObjectId;
}
