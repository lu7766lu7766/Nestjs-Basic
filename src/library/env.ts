import { NotFoundException } from '@nestjs/common';
require('dotenv').config();

export class Env {
  constructor() {}

  static get(key, defaultVal = '') {
    return process.env[key] || defaultVal;
  }

  static getOrThrow(key) {
    if (process.env[key]) {
      return process.env[key];
    } else {
      throw new NotFoundException();
    }
  }

  static isDev() {
    return this.get('NODE_ENV') == 'development';
  }
}
