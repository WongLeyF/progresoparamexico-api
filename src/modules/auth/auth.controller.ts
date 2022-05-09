import { Controller, UseGuards, Post, Req, Body, BadRequestException, HttpStatus, Get, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import * as randomstring from 'randomstring';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req) {
        // if (body.isAdmin && !(req.user.roleId.name === UserRole.ADMINISTRADOR || req.user.roleId.name === UserRole.SUPER_ADMINISTRADOR)) {
        //     throw new BadRequestException('El usuario no es un administrador');
        // }
        // if (!body.isAdmin && (req.user.roleId.name === UserRole.ADMINISTRADOR || req.user.roleId.name === UserRole.SUPER_ADMINISTRADOR)) {
        //     throw new BadRequestException('El usuario no es válido');
        // }
        return this.authService.login(req.user);

    }
}
