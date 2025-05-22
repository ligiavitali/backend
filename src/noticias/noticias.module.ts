import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticiaEntity } from './entities/noticia.entity';
import { NoticiaService } from './noticias.service';
import { NoticiaController } from './noticias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoticiaEntity])],
  providers: [NoticiaService],
  controllers: [NoticiaController],
})
export class NoticiaModule {}
