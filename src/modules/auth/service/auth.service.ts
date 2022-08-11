import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authConfig } from 'src/config/auth';
import { ApiException } from 'src/exception/api.exception';
import { Crypto } from 'src/library/crypto';
import { User } from 'src/models/user';
import { Auth1000 } from 'src/constants/api-code/auth1000';
import type { GuardModel } from 'src/config/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {
    this._guard = authConfig.guard;
  }

  private _guard: string;
  private get guarder() {
    return authConfig.guards[this._guard];
  }

  use(_guard: GuardModel) {
    this._guard = _guard;
    return this;
  }

  async check(model: any) {
    return model.constructor == this.guarder.model;
  }

  async login(uid: string, password: string) {
    let user: User, currentUidKey;

    const query = this.userRepo.createQueryBuilder();
    for (const uidKey of this.guarder.uids) {
      query.orWhere({ [uidKey]: uid });
    }
    user = await query.getOne();
    if (!user) {
      throw new ApiException(Auth1000.USER_NOT_FOUND);
    }
    for (const uidKey of this.guarder.uids) {
      currentUidKey = user[uidKey] == uid ? uidKey : currentUidKey;
    }
    if (!(await Crypto.compare(password, user[this.guarder.password]))) {
      throw new ApiException(Auth1000.PASSWORD_NOT_MATCH);
    }

    return this.generate({ uid, uidKey: currentUidKey, guard: this._guard });
  }

  async generate(payload: any) {
    const { uid, uidKey, guard } = payload;
    return {
      access_token: `Bearer ${this.jwtService.sign({ uid, uidKey, guard })}`,
    };
  }
}
