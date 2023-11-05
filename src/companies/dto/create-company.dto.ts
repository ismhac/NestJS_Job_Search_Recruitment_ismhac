import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

// data transfer object
export class CreateCompanyDto {

    @IsNotEmpty({ message: 'Name is required' })
    @ApiProperty({ example: 'Facebook' })
    name: string;

    @IsNotEmpty({ message: 'Address is required' })
    @ApiProperty({ example: 'USA' })
    address: string;

    @IsNotEmpty({ message: 'Description is required' })
    @ApiProperty({ example: 'Facebook is a social networking site that makes it easy for you to connect and share with family and friends online.' })
    description: string;

    @IsNotEmpty({ message: 'Logo is required' })
    @ApiProperty({ example: 'https://www.facebook.com/images/fb_icon_325x325.png' })
    logo: string;
}
