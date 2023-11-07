import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { IsOptional } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @IsOptional()
    name: string;

    @IsOptional()
    apiPath: string;


    @IsOptional()
    method: string;


    @IsOptional()
    module: string;
}
