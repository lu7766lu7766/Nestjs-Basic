import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { User2000 } from 'src/constants/api-code/user2000';
import { Confirm } from 'src/decorators/validate/confirm.decorator';
import { IsExists } from 'src/decorators/validate/is-exists.decorator';
import { IsNotExists } from 'src/decorators/validate/is-not-exists.decorator';
import { Role } from 'src/models/role';
import { User } from 'src/models/user';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotExists(
    { table: User, column: 'email' },
    { message: User2000.USER_EXISTS.toString() },
  )
  public readonly email: string;

  @IsString()
  @MinLength(4, { message: User2000.PASSWORD_TOO_SHORT.toString() })
  public readonly password: string;

  @Confirm('password', {
    message: User2000.PASSWORD_CONFIRM_NOT_MATCH.toString(),
  })
  public readonly password_confirm: string;

  @IsNumber()
  @IsExists(
    { table: Role, column: 'id' },
    { message: User2000.ROLE_ID_NOT_IN_REF.toString() },
  )
  public readonly role_id: number;
}
