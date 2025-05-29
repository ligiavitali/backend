import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NoticiaService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNoticiaDto: CreateNoticiaDto,
  ) {
    return this.noticiaService.create(createNoticiaDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateNoticiaDto: UpdateNoticiaDto,
  ) {
    return this.noticiaService.update(+id, updateNoticiaDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticiaService.remove(+id);
  }
}
