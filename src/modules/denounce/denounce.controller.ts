import { Controller, UseGuards, Get, Res, NotFoundException, HttpStatus, Post, Body, Put, Param, Delete, Req, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DenounceService } from './denounce.service';

@Controller('denounce')
export class DenounceController implements OnModuleInit{
    constructor(
        private DenounceService: DenounceService,
        private readonly moduleRef: ModuleRef,
    ) {}

    onModuleInit() {
        // console.log('DenounceController loaded');
    }

    @Get('/')
    async findAll() {
        return await this.DenounceService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        const denounce = await this.DenounceService.findOne(id);
        if (!denounce) {
            throw new NotFoundException('Denounce not found');
        }
        return denounce;
    }

    @Post('/')
    async create(@Body() body: any) {
        return await this.DenounceService.create(body);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() body: any) {
        return await this.DenounceService.update(id, body);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.DenounceService.delete(id);
    }

    @Get('/school/:school')
    async findBySchool(@Param('school') school: string) {
        return await this.DenounceService.findBySchool(school);
    }

    @Get('/school/:school/grade/:grade')
    async findBySchoolGrade(@Param('school') school: string, @Param('grade') grade: string) {
        return await this.DenounceService.findBySchoolGrade(school, grade);
    }

    @Get('/school/:school/grade/:grade/career/:career')
    async findBySchoolGradeAndCareer(@Param('school') school: string, @Param('grade') grade: string, @Param('career') career: string) {
        return await this.DenounceService.findBySchoolGradeAndCareer(school, grade, career);
    }

    @Get('/school/:school/grade/:grade/career/:career/violenceType/:violenceType')
    async findBySchoolGradeAndCareerAndViolenceType(@Param('school') school: string, @Param('grade') grade: string, @Param('career') career: string, @Param('violenceType') violenceType: string) {
        return await this.DenounceService.findBySchoolGradeAndCareerAndViolenceType(school, grade, career, violenceType);
    }

    @Get('/violenceType/:violenceType')
    async findByViolenceType(@Param('violenceType') violenceType: string) {
        return await this.DenounceService.findByViolenceType(violenceType);
    }

    @Get('/school/:school/grade/:grade/career/:career/violenceType/:violenceType/count')
    async countBySchoolGradeAndCareerAndViolenceType(@Param('school') school: string, @Param('grade') grade: string, @Param('career') career: string, @Param('violenceType') violenceType: string) {
        return await this.DenounceService.countBySchoolGradeAndCareerAndViolenceType(school, grade, career, violenceType);
    }
    
        
}
