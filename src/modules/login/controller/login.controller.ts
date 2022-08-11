import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { CurrentUser } from 'src/decorators/context/current-user.decorate';
import { User } from 'src/models/user';
import { AuthWithUserGuard } from 'src/modules/auth/guard/auth-with-user.guard';
import { LoginDto } from '../dto/login.dto';

@Controller()
export class LoginController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Get('profile')
  @UseGuards(AuthWithUserGuard)
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
