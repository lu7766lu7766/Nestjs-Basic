import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Auth1000 } from 'src/constants/api-code/auth1000';

export class LoginDto {
  @IsEmail({ message: Auth1000.USER_NOT_FOUND.toString() })
  public readonly email: string;

  @IsString({ message: Auth1000.PASSWORD_NOT_MATCH.toString() })
  public readonly password: string;
}
