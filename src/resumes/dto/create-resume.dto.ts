
/* 
Model resume:
- email: string
- userId: objectId
- url: string
- status: string// PENDING-REVIEWING-APPROVED-REJECTED
- companyId: objectId
- jobId: objectId
- history: [
{ status: string, updatedAt: Date, updatedBy: { _id, email} }
]
- createdAt: Date
- updatedAt: Date
- deletedAt: Date
- isDeleted: boolean
- createdBy: {_id, email},
- updatedBy: {_id, email},
- deletedBy: {_id, email}
*/

import { IsMongoId, IsNotEmpty, isMongoId } from "class-validator";
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

export class createUserCv {
    @IsNotEmpty({ message: 'Url is required' })
    url: string;

    @IsNotEmpty({ message: 'CompanyId is required' })
    @IsMongoId()
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'JobId is required' })
    @IsMongoId()
    jobId: mongoose.Schema.Types.ObjectId;
}
