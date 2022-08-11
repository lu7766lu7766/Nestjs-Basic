import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthWithUserStrategy } from './strategy/auth-with-user.strategy';
import { AuthStrategy } from './strategy/auth.strategy';
import { authConfig } from 'src/config/auth';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: authConfig.expiresIn },
    }),
  ],
  providers: [AuthService, AuthStrategy, AuthWithUserStrategy],
  exports: [AuthService],
})
export class AuthModule {}
