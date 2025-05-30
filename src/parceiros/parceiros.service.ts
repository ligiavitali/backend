import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParceiroEntity } from './entities/parceiro.entity';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { UpdateParceiroDto } from './dto/update-parceiro.dto';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class ParceiroService {
  constructor(
    @InjectRepository(ParceiroEntity)
    private readonly parceiroRepository: Repository<ParceiroEntity>,
  ) {}

  async findAll(): Promise<ParceiroEntity[]> {
    return this.parceiroRepository.find();
  }

  async findOne(id: number): Promise<ParceiroEntity> {
    const parceiro = await this.parceiroRepository.findOne({ where: { id } });

    if (!parceiro) {
      throw new NotFoundException('Parceiro não encontrado!');
    }

    return parceiro;
  }

  async create(
    createParceiroDto: CreateParceiroDto,
    file?: Express.Multer.File,
  ): Promise<ParceiroEntity> {
    if (file) {
  const dir = path.resolve(process.cwd(), 'src', 'pictures');
      await fs.mkdir(dir, { recursive: true });
  
      const filePath = path.join(dir, file.originalname);
      await fs.writeFile(filePath, file.buffer);
  
      createParceiroDto.imagem_url = `pictures/${file.originalname}`;
    }
   const parceiro = this.parceiroRepository.create(createParceiroDto);
    return this.parceiroRepository.save(parceiro);
  }

   async update(
      id: number,
      updateParceiroDto: UpdateParceiroDto,
      file?: Express.Multer.File,
    ): Promise<ParceiroEntity> {
      const parceiro = await this.findOne(id);
  
      if (file) {
        const dir = path.resolve(process.cwd(), 'src', 'pictures');
        await fs.mkdir(dir, { recursive: true });
  
        const filePath = path.join(dir, file.originalname);
        await fs.writeFile(filePath, file.buffer);
  
        updateParceiroDto.imagem_url = `pictures/${file.originalname}`;
      }
  
      const updatedParceiro = this.parceiroRepository.merge(
        parceiro,
        updateParceiroDto,
      );
      return this.parceiroRepository.save(updatedParceiro);
    }

  async remove(id: number): Promise<ParceiroEntity> {
    const parceiro = await this.findOne(id);
    return this.parceiroRepository.remove(parceiro);
  }
}
