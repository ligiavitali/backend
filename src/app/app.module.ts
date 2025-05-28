import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from 'src/eventos/eventos.module';
import { LoginModule } from 'src/login/login.module';
import { NoticiasModule } from 'src/noticias/noticias.module';
import { ParceirosModule } from 'src/parceiros/parceiros.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'projetoextensao',
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
