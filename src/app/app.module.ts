import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventosModule } from 'src/eventos/eventos.module';
import { LoginModule } from 'src/login/login.module';
import { NoticiasModule } from 'src/noticias/noticias.module';
import { ParceirosModule } from 'src/parceiros/parceiros.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from './email/mailer.module';
import * as path from 'path';
import { OficinasModule } from 'src/oficinas/oficinas.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), 'src', 'pictures'),
      serveRoot: '/img/pictures', // http://localhost:3001/img/pictures/
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
    OficinasModule,
    MailerModule,
    AuthModule,
  ],
})
export class AppModule {}
