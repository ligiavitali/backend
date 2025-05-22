import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginEntity } from './entities/login.entity';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
  ) {}

  async create(createLoginDto: CreateLoginDto): Promise<LoginEntity> {
    const login = this.loginRepository.create(createLoginDto);
    return this.loginRepository.save(login);
  }

  findAll(): Promise<LoginEntity[]> {
    return this.loginRepository.find();
  }

  async findOne(id: number): Promise<LoginEntity> {
    const login = await this.loginRepository.findOneBy({ id });
    if (!login) {
      throw new NotFoundException(`Login #${id} não encontrado`);
    }
    return login;
  }

  async update(id: number, updateLoginDto: UpdateLoginDto): Promise<LoginEntity> {
    const login = await this.findOne(id);
    const updated = Object.assign(login, updateLoginDto);
    return this.loginRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.loginRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Login #${id} não encontrado`);
    }
  }
}
