import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntityTarget } from 'typeorm';
import { IsExistsValidator } from 'src/modules/common/validator/is-exists.validator';

export function IsExists<T>(
  option: { table: EntityTarget<T>; column: string },
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [option.table, option.column],
      validator: IsExistsValidator,
    });
  };
}
