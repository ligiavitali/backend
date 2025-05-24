import { IsNotEmpty, IsOptional, IsString, MaxLength, IsUrl } from 'class-validator';

export class CreateParceiroDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nome: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  site_url: string;

  @IsOptional()
  @IsString()
  imagem_url?: string;
}
