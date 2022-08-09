import { Env } from 'src/library/env';

export const jwtConstants = {
  secret: Env.getOrThrow('APP_KEY'),
};
