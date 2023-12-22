import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {

    @ApiProperty({ example: "ROLE_USER" })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ example: "User/Candidate in system" })
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @ApiProperty({ example: true })
    @IsNotEmpty({ message: 'IsActive is required' })
    @IsBoolean({ message: 'IsActive must be a boolean' })
    isActive: boolean;


    @ApiProperty({
        example: [
            "657afa841d6a274224a45ee8",
            "657afa841d6a274224a45ee9"
        ]
    })
    @IsNotEmpty({ message: 'Permissions is required' })
    @IsArray({ message: 'Permissions must be an array' })
    @IsMongoId({ each: true, message: 'Each permission must be a mongoId' })
    permissions: mongoose.Schema.Types.ObjectId[];
}
