import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateLoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;
}

