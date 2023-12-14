import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import mongoose from 'mongoose';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {

    @ApiProperty({ example: "nguyenvana@gmail.com", required: false })
    @IsOptional()
    email: string;

    @ApiProperty({ example: "65733d2bf9bb786589249c33", required: false })
    @IsOptional()
    userId: mongoose.Schema.Types.ObjectId;


    @ApiProperty({
        example: {
            "url": "https://drive.google.com/uc?id=1Vn85QZC32LC_zUAhfc8-qNo-PNc8NIph",
            "name": "Contract-1702203700883.pdf"
        },
        required: false
    })
    file: {
        url: string,
        name: string
    };

    @ApiProperty({ example: "PENDING", required: false })
    @IsOptional()
    status: string;

    @ApiProperty({ example: "64871701c7573fac797f83ea", required: false })
    @IsOptional()
    companyId: mongoose.Schema.Types.ObjectId;

    @ApiProperty({ example: "6487e52ae263fe0b853d752a", required: false })
    @IsOptional()
    jobId: mongoose.Schema.Types.ObjectId;
}
