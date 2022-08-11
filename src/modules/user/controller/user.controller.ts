import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  list(@Query() body) {
    return this.userService.list(body);
  }

  @Get('total')
  total(@Query() body) {
    return this.userService.total(body);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() { email, password, role_id }: CreateUserDto) {
    return this.userService.create({ email, password, role_id });
  }

  @Put()
  @UsePipes(ValidationPipe)
  update(@Body() { id, email, password, role_id }: UpdateUserDto) {
    return this.userService.update({ id, email, password, role_id });
  }
}
