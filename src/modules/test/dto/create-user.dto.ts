import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { User2000 } from 'src/constants/api-code/user2000';
import { Confirm } from 'src/decorators/validate/confirm.decorator';
import { IsNotExists } from 'src/decorators/validate/is-not-exists.decorator';
import { RegExps } from 'src/decorators/validate/regexs.decorator';
import { User } from 'src/models/user';

enum Gender {
  MAIL = 'MAIL',
  FEMAIL = 'FEMAIL',
}

export class CreateUserDto {
  @IsString()
  @IsNotExists(
    { table: User, column: 'uid' },
    { message: User2000.USER_EXISTS.toString() },
  )
  public readonly uid: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(4, { message: User2000.PASSWORD_TOO_SHORT.toString() })
  @RegExps([/[a-z]/, /[A-Z]/, /[0-9]/])
  public readonly password: string;

  @Confirm('password')
  public readonly password_confirm: string;

  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsIn([1, 2])
  public readonly type: number;

  @IsOptional()
  @IsEnum(Gender)
  public readonly gender: string;
}
