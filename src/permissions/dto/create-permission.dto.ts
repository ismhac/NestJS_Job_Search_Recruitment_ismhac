import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'ApiPath is required' })
    apiPath: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Method is required' })
    method: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Module is required' })
    module: string;
}
