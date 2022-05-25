import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AggressorService } from './aggressor.service';
import { CreateAggressorDto } from './dto/create-aggressor.dto';
import { UpdateAggressorDto } from './dto/update-aggressor.dto';

@Controller('aggressor')
export class AggressorController {
  constructor(private readonly aggressorService: AggressorService) {}

  @Post('/')
  create(@Body() createAggressorDto: CreateAggressorDto) {
    console.log('entro')
    return this.aggressorService.create(createAggressorDto);
  }

  @Get('/')
  findAll() {
    return this.aggressorService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.aggressorService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateAggressorDto: UpdateAggressorDto) {
    return this.aggressorService.update(+id, updateAggressorDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.aggressorService.remove(+id);
  }
}
