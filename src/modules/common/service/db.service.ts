import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityTarget } from 'typeorm';

@Injectable()
export class DB {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async transaction(fn) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const res = await fn();
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return res;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  table<T>(table: EntityTarget<T>) {
    return this.dataSource.createQueryBuilder(table, 'table');
  }
}
