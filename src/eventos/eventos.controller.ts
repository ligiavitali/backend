import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { EventoService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findOne(+id);
  }

  @Post()
 @UseInterceptors(FileInterceptor('file'))
   async create(
     @UploadedFile() file: Express.Multer.File,
     @Body() createEventoDto: CreateEventoDto,
   ) {
     return this.eventoService.create(createEventoDto, file);
   }
 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventoService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoService.remove(+id);
  }
}
