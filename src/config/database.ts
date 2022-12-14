require('dotenv').config();
import { Env } from '../library/env';

const path = require('path');
const resolve = (...subpath) => path.join(__dirname, '..', '..', ...subpath);

const dbConfig = {
  type: 'mysql',
  host: Env.get('DB_HOST'),
  port: Env.get('DB_PORT'),
  username: Env.get('DB_USERNAME'),
  password: Env.get('DB_PASSWORD'),
  database: Env.get('DB_NAME'),
  seeds: [resolve('src/database/seeds/**/*{.ts,.js}')],
  factories: [resolve('src/database/factories/*{.ts,.js}')],
  synchronize: true,
  migrations: [resolve('src/database/migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migration_schema',
  entities: [resolve('src/models/*{.ts,.js}')],
  logging: true,
};

module.exports = dbConfig;
