import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from './entities/login.entity';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoginEntity])],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
