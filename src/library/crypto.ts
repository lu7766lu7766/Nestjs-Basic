import * as bcrypt from 'bcrypt';

import { Env } from './env';

export class Crypto {
  static createAppKey() {
    return bcrypt.genSalt();
  }

  static hash(val) {
    return bcrypt.hash(val, Env.get('APP_KEY')); // process.env.APP_KEY
  }

  static compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
