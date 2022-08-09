import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { User } from 'src/models/user';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(user: User) {
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
