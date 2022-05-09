import { Controller, Get, Res, Query, HttpStatus, Param, NotFoundException, Post, Body, BadRequestException, UseGuards, Put, OnModuleInit, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from './users.service';
import { Response } from 'express';
import { FilterUsersDto } from './dto/filter-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as randomstring from 'randomstring';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesService } from '../roles/roles.service';
import { PayloadToken } from '../auth/interfaces/payload-token.interface';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserRole } from 'src/shared/enums/user-role.enum';


@Controller('users')
export class UsersController implements OnModuleInit {

    private roleService: RolesService;

    constructor(
        private userService: UsersService,
        private readonly moduleRef: ModuleRef,
        private configService: ConfigService
    ) { }

    async onModuleInit() {
        this.roleService = this.moduleRef.get(RolesService, { strict: false });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/my-profile')
    async getProfile(@Res() res: Response, @Req() req) {

        const userSession: PayloadToken = req.user;

        const user = await this.userService.getById(userSession.sub);

        res.status(HttpStatus.OK).json(user);

    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAll(@Res() res: Response, @Query() query: FilterUsersDto) {

        const users = await this.userService.getAll(query);

        res.status(HttpStatus.OK).json(users);

    }

    @UseGuards(JwtAuthGuard)
    @Get('/resumen')
    async getResumen(@Res() res) {

        const resumen = await this.userService.getResumen();

        return res.status(HttpStatus.OK).json(resumen);

    }

    @UseGuards(JwtAuthGuard)
    @Get('/email/:email')
    async getByEmail(@Res() res: Response, @Param() params) {

        const user = await this.userService.getByEmail(params.email);

        if (!user) {
            throw new NotFoundException(`No se encontro a un usuario con el correo: ${params.email}`);
        }

        res.status(HttpStatus.OK).json(user);

    }

    @Get('/verified-code/:verifiedCode')
    async getByVerifiedCode(@Res() res: Response, @Param() params) {

        const user = await this.userService.getByVerifiedCode(params.verifiedCode);

        if (!user) {
            throw new NotFoundException('El código no es válido o ya no se encuentra disponible');
        }

        res.status(HttpStatus.OK).json(user);

    }

    @Post('/')
    async create(@Body() createUserDTO: CreateUserDto, @Res() res: Response) {

        const existsMail = await this.userService.getByEmail(createUserDTO.email);

        if (existsMail) {
            throw new BadRequestException(`Ya existe un usuario con el correo: ${createUserDTO.email}`);
        }

        createUserDTO.verifiedCode = randomstring.generate({ length: 15 });

        const role = await this.roleService.getById(createUserDTO.roleId);

        createUserDTO.roleId = role._id;

        const user = await this.userService.create(createUserDTO);

        res.status(HttpStatus.OK).json(user);

    }

    @UseGuards(JwtAuthGuard)
    @Post('/validate-password')
    async validatePassword(@Body() updatePasswordDTO: UpdatePasswordDTO, @Res() res, @Req() req, @Param() params) {

        const userSession: PayloadToken = req.user;

        const user = await this.userService.getById(userSession.sub);

        if (user) {

            if (!user.isActive) {
                throw new BadRequestException('Su usuario se encuentra inactivo');
            }

            const match = await user.comparePassword(updatePasswordDTO.password);

            if (match) {
                return res.status(HttpStatus.OK).json({ message: 'CONTRASEÑA VALIDA' });

            }

            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'CONTRASEÑA NO VALIDA' });


        } else {
            throw new NotFoundException('El suario no existe');
        }

    }

    @UseGuards(JwtAuthGuard)
    @Put('/password')
    async updateUserPassword(@Body() createUserDTO: CreateUserDto, @Res() res, @Req() req, @Param() params) {

        const hashed = await bcrypt.hash(createUserDTO.password, 10);

        const userSession: PayloadToken = req.user;

        const userUpdateData: UpdatePasswordDTO = {
            password: hashed,
        };

        await this.userService.updatePassword(userSession.sub, userUpdateData);

        res.status(HttpStatus.OK).json({ message: 'Contraseña actualizada' });

    }

    @UseGuards(JwtAuthGuard)
    @Put('/:userId')
    async update(@Body() createUserDTO: CreateUserDto, @Res() res: Response, @Req() req, @Param() params) {

        const userSession: PayloadToken = req.user;

        const existsMail = await this.userService.getByEmail(createUserDTO.email);

        if (existsMail && userSession.sub != existsMail._id) {

            throw new BadRequestException(`Ya existe un usuario con el correo: ${createUserDTO.email}`);

        }

        try {

            const user = await this.userService.update(params.userId, createUserDTO);

            res.status(HttpStatus.OK).json(user);

        } catch (error) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'No se pudo actualizar el usuario', details: error.toString() });

        }

    }


    @UseGuards(JwtAuthGuard)
    @Put('/status/:userId')
    async updateStatus(@Body() updateDto: UpdateUserStatusDto, @Res() res: Response, @Req() req, @Param() params) {

        try {

            const user = await this.userService.updateStatus(params.userId, updateDto);

            res.status(HttpStatus.OK).json(user);

        } catch (error) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'No se pudo actualizar el usuario', details: error.toString() });

        }

    }

}
