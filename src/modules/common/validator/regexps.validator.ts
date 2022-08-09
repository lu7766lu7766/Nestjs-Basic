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
export class RegExpsValidator implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const regexp: RegExp[] = args.constraints;

    return regexp.reduce(
      (result, regexp) => result && regexp.test(value),
      true,
    );
  }

  defaultMessage(args: ValidationArguments) {
    const regexps: RegExp[] = args.constraints;
    return `${args.property} doesn't match ${regexps
      .filter((r) => !r.test(args.object[args.property]))
      .map((r) => r.source)
      .join(', ')}!`;
  }
}
