import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventosModule } from 'src/eventos/eventos.module';
import { LoginModule } from 'src/login/login.module';
import { NoticiasModule } from 'src/noticias/noticias.module';
import { ParceirosModule } from 'src/parceiros/parceiros.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),

    LoginModule,
    EventosModule,
    ParceirosModule,
    NoticiasModule,
  ],
})
export class AppModule {}
