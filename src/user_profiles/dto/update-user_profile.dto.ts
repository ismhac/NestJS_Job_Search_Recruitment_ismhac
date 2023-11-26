import { PartialType } from '@nestjs/swagger';
import { CreateUserProfileDto } from './create-user_profile.dto';
import mongoose from 'mongoose';
import { IsOptional } from 'class-validator';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
    @IsOptional()
    resumeInfo: {
        _id: mongoose.Schema.Types.ObjectId;
        url: string,
    }

    @IsOptional()
    skills: string[];

    @IsOptional()
    level: string;

    @IsOptional()
    isPublic: boolean;
}
