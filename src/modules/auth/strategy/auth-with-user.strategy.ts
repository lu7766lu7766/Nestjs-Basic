import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { DataSource } from 'typeorm';
import { authConfig } from 'src/config/auth';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class AuthWithUserStrategy extends PassportStrategy(
  Strategy,
  'auth-with-user',
) {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { uid: string; uidKey: string; guard: string }) {
    if (!payload) {
      throw new UnauthorizedException();
    } else {
      return this.dataSource
        .getRepository(authConfig.guards[payload.guard].model)
        .findOneBy({
          [payload.uidKey]: payload.uid,
        });
    }
  }
}
