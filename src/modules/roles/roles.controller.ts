import { Controller, Get, UseGuards, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Delete, BadRequestException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Response } from 'express';
import { CreateRoleDTO } from './dto/create-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAll(@Res() res: Response) {

        const roles = await this.roleService.getAll();

        res.status(HttpStatus.OK).json(roles);

    }

    @UseGuards(JwtAuthGuard)
    @Get('/:roleID')
    async getById(@Res() res: Response, @Param() params) {

        const role = await this.roleService.getById(params.roleID);

        if (!role) {
            throw new NotFoundException('El rol no existe');
        }

        res.status(HttpStatus.OK).json(role);

    }

    @UseGuards(JwtAuthGuard)
    @Get('/name/:roleName')
    async getByName(@Res() res: Response, @Param() params) {

        const role = await this.roleService.getByName(params.roleName);

        if (!role) {
            throw new NotFoundException('El rol no existe');
        }

        res.status(HttpStatus.OK).json(role);

    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Body() createRoleDTO: CreateRoleDTO, @Res() res: Response) {

        const exists = await this.roleService.getByName(createRoleDTO.name);

        if (exists) {
            throw new BadRequestException('El rol ya existe');
        }

        const role = await this.roleService.create(createRoleDTO);

        res.status(HttpStatus.OK).json(role);

    }

    @UseGuards(JwtAuthGuard)
    @Put('/:roleID')
    async update(@Body() createRoleDTO: CreateRoleDTO, @Param() params, @Res() res: Response) {

        try {

            const role = await this.roleService.update(params.roleID, createRoleDTO);

            res.status(HttpStatus.OK).json(role);

        } catch (error) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'No se pudo actualizar el rol', details: error.toString() });

        }

    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:roleID')
    async delete(@Res() res: Response, @Param() params) {

        try {

            const role = await this.roleService.delete(params.roleID);

            res.status(HttpStatus.OK).json(role);

        } catch (error) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'No se pudo eliminar el rol', details: error.toString() });

        }

    }

}
