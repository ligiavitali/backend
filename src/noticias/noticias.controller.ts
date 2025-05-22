import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { NoticiaService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';

@Controller('noticias')
export class NoticiaController {
  constructor(private readonly noticiaService: NoticiaService) {}

  @Get()
  findAll() {
    return this.noticiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticiaService.findOne(+id);
  }

  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiaService.create(createNoticiaDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoticiaDto: UpdateNoticiaDto,
  ) {
    return this.noticiaService.update(+id, updateNoticiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticiaService.remove(+id);
  }
}
