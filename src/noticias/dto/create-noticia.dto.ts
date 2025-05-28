import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNoticiaDto {
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @IsString({ message: 'O título deve ser uma string.' })
  @MaxLength(150, { message: 'O título deve ter no máximo 150 caracteres.' })
  titulo: string;

  @IsNotEmpty({ message: 'O conteúdo é obrigatório.' })
  @IsString({ message: 'O conteúdo deve ser uma string.' })
  conteudo: string;

  @IsOptional()
  @IsString({ message: 'A URL da imagem deve ser uma string.' })
  imagem_url?: string; // Este campo será preenchido pelo service se o arquivo for enviado
}
