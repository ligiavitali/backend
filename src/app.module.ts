import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { EventosModule } from './eventos/eventos.module';
import { ParceirosModule } from './parceiros/parceiros.module';
import { NoticiasModule } from 'src/noticias/noticias.module';

@Module({
  
  imports: [LoginModule, EventosModule, ParceirosModule, NoticiasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
