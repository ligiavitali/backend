import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import * as path from 'path';
import * as fs from 'fs/promises';
import { OficinasEntity } from './entities/oficina.entity';
import { CreateOficinasDto } from './dto/create-oficina.dto';
import { UpdateOficinaDto } from './dto/update-oficina.dto';

@Injectable()
export class OficinasService {
  constructor(
    @InjectRepository(OficinasEntity)
    private readonly oficinasRepository: Repository<OficinasEntity>,
  ) {}

  async findAll(): Promise<OficinasEntity[]> {
    return this.oficinasRepository.find();
  }

  async findOne(id: number): Promise<OficinasEntity> {
    const oficinas = await this.oficinasRepository.findOne({ where: { id } });
    if (!oficinas) {
      throw new NotFoundException('Notícia não encontrada!');
    }
    return oficinas;
  }

  async create(
    createOficinasDto: CreateOficinasDto,
    file?: Express.Multer.File,
  ): Promise<OficinasEntity> {
    if (file) {
      const dir = path.resolve(process.cwd(), 'src', 'pictures');
      await fs.mkdir(dir, { recursive: true });

      const filePath = path.join(dir, file.originalname);
      await fs.writeFile(filePath, file.buffer);

      createOficinasDto.imagem_url = `pictures/${file.originalname}`;
    }

    const oficinas = this.oficinasRepository.create(createOficinasDto);
    return this.oficinasRepository.save(oficinas);
  }

  async update(
    id: number,
    updateOficinasDto: UpdateOficinaDto,
    file?: Express.Multer.File,
  ): Promise<OficinasEntity> {
    const oficinas = await this.findOne(id);

    if (file) {
      const dir = path.resolve(process.cwd(), 'src', 'pictures');
      await fs.mkdir(dir, { recursive: true });

      const filePath = path.join(dir, file.originalname);
      await fs.writeFile(filePath, file.buffer);

      updateOficinasDto.imagem_url = `pictures/${file.originalname}`;
    }

    const updateOficinas = this.oficinasRepository.merge(
      oficinas,
      updateOficinasDto,
    );
    return this.oficinasRepository.save(updateOficinas);
  }

  async remove(id: number): Promise<OficinasEntity> {
    const oficinas = await this.findOne(id);
    return this.oficinasRepository.remove(oficinas);
  }
}
