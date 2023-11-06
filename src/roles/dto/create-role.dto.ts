import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {

    @IsNotEmpty({ message: 'Name is required' })
    name: string;


    @IsNotEmpty({ message: 'Description is required' })
    description: string;


    @IsNotEmpty({ message: 'IsActive is required' })
    @IsBoolean({ message: 'IsActive must be a boolean' })
    isActive: boolean;


    @IsNotEmpty({ message: 'Permissions is required' })
    @IsArray({ message: 'Permissions must be an array' })
    @IsMongoId({ each: true, message: 'Each permission must be a mongoId' })
    permissions: mongoose.Schema.Types.ObjectId[];
}
