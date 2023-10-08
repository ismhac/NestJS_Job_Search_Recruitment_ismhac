import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

// data transfer object
export class CreateCompanyDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Address is required' })
    address: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Logo is required' })
    logo: string;
}
