import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post('/')
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careerService.create(createCareerDto);
  }

  @Get('/')
  findAll() {
    // populate instituteId of institute
    return this.careerService.findAll().populate('instituteId');
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.careerService.findOne(id);
  }

  //get by instituteId
  @Get('/institute/:id')
  findByInstituteId(@Param('id') id: string) {
    return this.careerService.findByInstituteId(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careerService.update(id, updateCareerDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.careerService.remove(id);
  }
}
