import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { EventosModule } from './eventos/eventos.module';
import { ParceirosModule } from './parceiros/parceiros.module';

@Module({
  imports: [LoginModule, EventosModule, ParceirosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
