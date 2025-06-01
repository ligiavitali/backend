import { Module } from '@nestjs/common';
import { OficinasService } from './oficinas.service';
import { OficinasController } from './oficinas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OficinasEntity } from './entities/oficina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OficinasEntity])],
  controllers: [OficinasController],
  providers: [OficinasService],
})
export class OficinasModule {}


