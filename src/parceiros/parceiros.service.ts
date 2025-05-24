import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParceiroEntity } from './entities/parceiro.entity';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { UpdateParceiroDto } from './dto/update-parceiro.dto';

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

  async create(createParceiroDto: CreateParceiroDto): Promise<ParceiroEntity> {
    const parceiro = this.parceiroRepository.create(createParceiroDto);
    return this.parceiroRepository.save(parceiro);
  }

  async update(id: number, updateParceiroDto: UpdateParceiroDto): Promise<ParceiroEntity> {
    const parceiro = await this.findOne(id);
    const updatedParceiro = this.parceiroRepository.merge(parceiro, updateParceiroDto);
    return this.parceiroRepository.save(updatedParceiro);
  }

  async remove(id: number): Promise<ParceiroEntity> {
    const parceiro = await this.findOne(id);
    return this.parceiroRepository.remove(parceiro);
  }
}
