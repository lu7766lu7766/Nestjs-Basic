import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistsValidator implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async validate(uid: any, args: ValidationArguments) {
    const [table, column] = args.constraints;

    return (
      0 <
      (await this.dataSource
        .createQueryBuilder(table, 'tmp')
        .where({ [column]: uid })
        .getCount())
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'Data is exists!';
  }
}
