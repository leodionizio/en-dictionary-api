import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../../user/user.service'; // Caminho correto do UserService

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {
    console.log('UserService injected:', userService);
  } // Injeção do UserService

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.userService.findUserByEmail(email); // Verifica se o email já existe
    return !user; // Se o usuário já existir, retorna false (email não é único)
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Email is already in use'; // Mensagem personalizada para quando o email não for único
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
