import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAuthDto {

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly role?: string;  // opcional, ex: 'admin' ou 'user'
}
