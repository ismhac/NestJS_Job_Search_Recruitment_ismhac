import { IsEmail, IsNotEmpty } from "class-validator";

// data transfer object
export class CreateCompanyDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Address is required' })
    address: string;

    @IsNotEmpty({ message: 'Description is required' })
    description: string;
}
