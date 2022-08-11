import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { User2000 } from 'src/constants/api-code/user2000';

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsExists } from 'src/decorators/validate/is-exists.decorator';
import { User } from 'src/models/user';
import { Confirm } from 'src/decorators/validate/confirm.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsExists(
    { table: User, column: 'id' },
    { message: User2000.UESR_NOT_FOUND.toString() },
  )
  public readonly id: number;

  @IsString()
  @IsOptional()
  @MinLength(4, { message: User2000.PASSWORD_TOO_SHORT.toString() })
  public readonly password?: string;

  @Confirm('password', {
    message: User2000.PASSWORD_CONFIRM_NOT_MATCH.toString(),
  })
  public readonly password_confirm?: string;
}
