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
import { FileInterceptor } from '@nestjs/platform-express';
import { OficinasService } from './oficinas.service';
import { CreateOficinasDto } from './dto/create-oficina.dto';
import { UpdateOficinaDto } from './dto/update-oficina.dto';

@Controller('oficinas')
export class OficinasController {
  constructor(private readonly oficinasService: OficinasService) {}

  @Get()
  findAll() {
    return this.oficinasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oficinasService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createOficinasDto: CreateOficinasDto,
  ) {
    return this.oficinasService.create(createOficinasDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateOficinasDto: UpdateOficinaDto,
  ) {
    return this.oficinasService.update(+id, updateOficinasDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oficinasService.remove(+id);
  }
}
