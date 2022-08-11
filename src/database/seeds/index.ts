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
    const adminId = 1,
      guestId = 2;
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { id: adminId, name: 'Admin' },
        { id: guestId, name: 'Guest' },
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
          role_id: adminId,
        },
        {
          email: 'test@test.com',
          password: await Crypto.hash('test'),
          role_id: guestId,
        },
      ])
      .execute();

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values([
        { role_id: adminId, code: 'READ', describe: 'read' },
        { role_id: adminId, code: 'CREATE', describe: 'create' },
        { role_id: adminId, code: 'UPDATE', describe: 'update' },
        { role_id: adminId, code: 'DELETE', describe: 'delete' },
        { role_id: guestId, code: 'READ', describe: 'read' },
      ])
      .execute();
  }
}
