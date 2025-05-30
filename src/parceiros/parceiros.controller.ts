import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { ParceiroService } from './parceiros.service';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { UpdateParceiroDto } from './dto/update-parceiro.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('parceiros')
export class ParceirosController {
  constructor(private readonly parceirosService: ParceiroService) {}

  

  @Get()
  findAll() {
    return this.parceirosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parceirosService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
    async create(
      @UploadedFile() file: Express.Multer.File,
      @Body() createParceiroDto: CreateParceiroDto,
    ) {
      return this.parceirosService.create(createParceiroDto, file);
    }

  @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
      @Param('id') id: string,
      @UploadedFile() file: Express.Multer.File,
      @Body() updateParceiroDto: UpdateParceiroDto,
    ) {
      return this.parceirosService.update(+id, updateParceiroDto, file);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parceirosService.remove(+id);
  }
}
