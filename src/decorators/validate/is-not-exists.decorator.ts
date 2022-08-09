import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntityTarget } from 'typeorm';
import { IsNotExistsValidator } from 'src/modules/common/validator/is-not-exists.validator';

export function IsNotExists<T>(
  option: { table: EntityTarget<T>; column: string },
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [option.table, option.column],
      validator: IsNotExistsValidator,
    });
  };
}
