import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotPastDate', async: false })
export class IsNotPastDateConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    if (!value) return false;
    let valueInMilliseconds = Number(value);
    const valueIsNotInMilliseconds = isNaN(valueInMilliseconds);
    if (valueIsNotInMilliseconds) {
      valueInMilliseconds = new Date(value).getTime();
    }

    if (isNaN(valueInMilliseconds)) {
      return false;
    }
    const now = Date.now();
    return valueInMilliseconds > now;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not be in the past.`;
  }
}

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotPastDateConstraint,
    });
  };
}
