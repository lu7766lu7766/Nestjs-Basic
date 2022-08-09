import { registerDecorator, ValidationOptions } from 'class-validator';
import { ConfirmValidator } from 'src/modules/common/validator/confirm.validator';

export function Confirm(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: ConfirmValidator,
    });
  };
}
