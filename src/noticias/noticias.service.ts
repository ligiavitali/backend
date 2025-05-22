import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticiaEntity } from './entities/noticia.entity';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';

@Injectable()
export class NoticiaService {
  constructor(
    @InjectRepository(NoticiaEntity)
    private readonly noticiaRepository: Repository<NoticiaEntity>,
  ) {}

  async findAll(): Promise<NoticiaEntity[]> {
    return this.noticiaRepository.find();
  }

  async findOne(id: number): Promise<NoticiaEntity> {
    const noticia = await this.noticiaRepository.findOne({ where: { id } });

    if (!noticia) {
      throw new NotFoundException('Notícia não encontrada!');
    }

    return noticia;
  }

  async create(createNoticiaDto: CreateNoticiaDto): Promise<NoticiaEntity> {
    const noticia = this.noticiaRepository.create(createNoticiaDto);
    return this.noticiaRepository.save(noticia);
  }

  async update(id: number, updateNoticiaDto: UpdateNoticiaDto): Promise<NoticiaEntity> {
    const noticia = await this.findOne(id);

    const updatedNoticia = this.noticiaRepository.merge(noticia, updateNoticiaDto);
    return this.noticiaRepository.save(updatedNoticia);
  }

  async remove(id: number): Promise<NoticiaEntity> {
    const noticia = await this.findOne(id);
    return this.noticiaRepository.remove(noticia);
  }
}
