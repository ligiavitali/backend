import { Module } from '@nestjs/common';
import { EventoService } from './eventos.service';
import { EventoController } from './eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from './entities/evento.entity';

@Module({imports: [TypeOrmModule.forFeature([EventoEntity])], 
  controllers: [EventoController],
  providers: [EventoService],
})
export class EventosModule {}
