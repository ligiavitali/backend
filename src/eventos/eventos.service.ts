import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { EventoEntity } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(EventoEntity)
    private readonly eventoRepository: Repository<EventoEntity>,
  ) {}



  async findAll(): Promise<EventoEntity[]> {
  return this.eventoRepository.find({
    order: { data_evento: 'ASC' },
  });
}



  async findFuturos(): Promise<EventoEntity[]> {
  const hoje = new Date();
  
  hoje.setHours(0, 0, 0, 0); // <-- Zera hora, minutos, segundos e milissegundos
  return this.eventoRepository.find({
    where: { data_evento: MoreThanOrEqual(hoje) },
    order: { data_evento: 'ASC' },
  });
}

async findRealizados(): Promise<EventoEntity[]> {
  const hoje = new Date();
  
hoje.setHours(0, 0, 0, 0); // <-- Zera hora, minutos, segundos e milissegundos

  return this.eventoRepository.find({
    where: { data_evento: LessThan(hoje) },
    order: { data_evento: 'DESC' },
  });
}

  async findOne(id: number): Promise<EventoEntity> {
    const evento = await this.eventoRepository.findOne({ where: { id } });

    if (!evento) {
      throw new NotFoundException('Evento não encontrado!');
    }

    return evento;
  }

  async create(
    createEventoDto: CreateEventoDto,
    file?: Express.Multer.File,
  ): Promise<EventoEntity> {
    if (file) {
  const dir = path.resolve(process.cwd(), 'src', 'pictures');
      await fs.mkdir(dir, { recursive: true });
  
      const filePath = path.join(dir, file.originalname);
      await fs.writeFile(filePath, file.buffer);
  
      createEventoDto.imagem_url = `pictures/${file.originalname}`;
    }
  
    const evento = this.eventoRepository.create(createEventoDto);
    return this.eventoRepository.save(evento);
  }

 async update(
     id: number,
     updateEventoDto: UpdateEventoDto,
     file?: Express.Multer.File,
   ): Promise<EventoEntity> {
     const evento = await this.findOne(id);
 
     if (file) {
       const dir = path.resolve(process.cwd(), 'src', 'pictures');
       await fs.mkdir(dir, { recursive: true });
 
       const filePath = path.join(dir, file.originalname);
       await fs.writeFile(filePath, file.buffer);
 
       updateEventoDto.imagem_url = `pictures/${file.originalname}`;
     }
 
     const updatedEvento = this.eventoRepository.merge(
       evento,
       updateEventoDto,
     );
    return this.eventoRepository.save(updatedEvento);
  }

  async remove(id: number): Promise<EventoEntity> {
    const evento = await this.findOne(id);
    return this.eventoRepository.remove(evento);
  }
}
