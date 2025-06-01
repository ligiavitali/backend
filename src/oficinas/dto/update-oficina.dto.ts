import { PartialType } from '@nestjs/mapped-types';
import { CreateOficinasDto } from './create-oficina.dto';

export class UpdateOficinaDto extends PartialType(CreateOficinasDto) {}
