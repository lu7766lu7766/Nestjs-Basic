/**
 * Seeder
 * 除node_modules路徑外，import路徑需使用相對位置
 */

import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';

import { User } from '../../models/user';
import { Crypto } from '../../library/crypto';
import { Post } from '../../models/post';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const insertRes = await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          uid: 'lu7766',
          email: 'lu7766lu7766@gmail.com',
          password: await Crypto.hash('lu90354'),
          name: 'Jac',
        },
      ])
      .execute();
    const userId = insertRes.identifiers[0].id;

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values([{ user_id: userId, title: 'title', content: 'content' }])
      .execute();
  }
}
