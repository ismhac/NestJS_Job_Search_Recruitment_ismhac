import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'IsActive is required' })
    @IsBoolean({ message: 'IsActive must be a boolean' })
    isActive: boolean;

    @ApiProperty()
    @IsNotEmpty({ message: 'Permissions is required' })
    @IsArray({ message: 'Permissions must be an array' })
    @IsMongoId({ each: true, message: 'Each permission must be a mongoId' })
    permissions: mongoose.Schema.Types.ObjectId[];
}
