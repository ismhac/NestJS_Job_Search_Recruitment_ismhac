import { PartialType } from '@nestjs/swagger';
import { CreateUsersRegisterTempDto } from './create-user_register_temp.dto';

export class UpdateUserRegisterTempDto extends PartialType(CreateUsersRegisterTempDto) { }
