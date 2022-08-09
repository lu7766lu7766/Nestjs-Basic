import { registerDecorator, ValidationOptions } from 'class-validator';
import { RegExpsValidator } from 'src/modules/common/validator/regexps.validator';

export function RegExps<T>(
  regexp: RegExp[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: regexp,
      validator: RegExpsValidator,
    });
  };
}
