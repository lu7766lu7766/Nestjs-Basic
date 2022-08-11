/**
 * Seeder
 * 除node_modules路徑外，import路徑需使用相對位置
 */

import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';

import { User } from '../../models/user';
import { Crypto } from '../../library/crypto';
import { Role } from '../../models/role';
import { Permission } from '../../models/permission';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Guest' },
      ])
      .execute();

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: 'lu7766lu7766@gmail.com',
          password: await Crypto.hash('lu90354'),
          role_id: 1,
        },
      ])
      .execute();

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values([
        { role_id: 1, code: 'READ', describe: 'read' },
        { role_id: 1, code: 'CREATE', describe: 'create' },
        { role_id: 1, code: 'UPDATE', describe: 'update' },
        { role_id: 1, code: 'DELETE', describe: 'delete' },
        { role_id: 2, code: 'READ', describe: 'read' },
      ])
      .execute();
  }
}
