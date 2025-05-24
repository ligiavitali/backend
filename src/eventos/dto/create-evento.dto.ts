import { IsNotEmpty, IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsDateString()
  data_evento: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  local: string;

  @IsOptional()
  @IsString()
  imagem_url?: string;
}

