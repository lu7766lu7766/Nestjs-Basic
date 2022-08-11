import { User } from 'src/models/user';

type iGuard = {
  /** oat entity */
  model: Object;
  /** uid fields */
  uids: string[];
  /** password field */
  password: string;
};

/**
 * Guard Name
 */
export type GuardModel = 'user'; // | 'user2'

type iAuthConfig = {
  guard: GuardModel;
  guards: { [p in GuardModel]: iGuard };
};

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
export const authConfig: iAuthConfig = {
  guard: 'user',
  guards: {
    user: {
      model: User,
      uids: ['email'],
      password: 'password',
    },
  },
};
