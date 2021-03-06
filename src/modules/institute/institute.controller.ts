import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { InstituteService } from './institute.service';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';

@Controller('institute')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post('/')
  create(@Body() createInstituteDto: CreateInstituteDto) {
    return this.instituteService.create(createInstituteDto);
  }

  @Get('/')
  findAll() {
    return this.instituteService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(id);
  }

  @Get('/grade/:grade')
  findBySchoolGrade(@Param('grade') grade: string) {
    return this.instituteService.findBySchoolGrade(grade);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateInstituteDto: UpdateInstituteDto) {
    return this.instituteService.update(id, updateInstituteDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.instituteService.remove(id);
  }
}
