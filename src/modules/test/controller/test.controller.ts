import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Test_1000 } from 'src/constants/api-code/test-1000';
import { ApiException } from 'src/exception/api.exception';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { TestPostDto } from '../dto/post.dto';
import { CurrentUser } from 'src/decorators/context/current-user.decorate';
import { User } from 'src/models/user';
import { UserService } from 'src/modules/user/service/user.service';
import { AuthWithUserGuard } from 'src/modules/auth/guard/auth-with-user.guard';
import { DB } from 'src/modules/common/service/db.service';
import { LocalGuard } from '../../common/guard/local.guard';

@Controller('test')
@UseGuards(LocalGuard)
export class TestController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private DB: DB,
  ) {}

  @Get('error')
  exception(): string {
    throw new ApiException(Test_1000.ERROR, 'just error');
  }

  @Get()
  get(): string {
    return 'return test';
  }

  @Post()
  @UsePipes(ValidationPipe)
  post(@Body() dto: TestPostDto): Object {
    return dto;
  }

  @Post('login')
  async login(@Body() { uid, email, password }) {
    return this.authService.login(uid, password);
  }

  @Get('profile')
  @UseGuards(AuthWithUserGuard)
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Get('token')
  @UseGuards(AuthGuard)
  getToken(@CurrentUser() user: User) {
    return user;
  }

  @Get('check')
  @UseGuards(AuthGuard)
  check(@CurrentUser() user: User) {
    return this.authService.use('user').check(user);
  }

  @Get('local')
  defend(@Ip() ip) {
    return ip;
  }
}
