import { Injectable, BadRequestException } from '@nestjs/common';
import { PayloadToken } from './interfaces/payload-token.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private roleService: RolesService
    ) { }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.usersService.getByEmail(email);
        return user;
    }

    async createUser(createDto: CreateUserDto): Promise<User> {
        const role = await this.roleService.getById(createDto.roleId);
        createDto.roleId = role._id;
        return await this.usersService.create(createDto);
    }

    async validateUser(username: string, pass: string): Promise<User> {

        const user = await this.usersService.getByEmail(username);

        if (user) {

            if (!user.isActive) {
                throw new BadRequestException('Su usuario se encuentra inactivo');
            }

            const match = await user.comparePassword(pass);

            if (match) {
                return user;
            }

            return null;

        } else {
            return null;
        }

    }

    async validateStatus(email: string): Promise<boolean> {

        const user = await this.usersService.getByEmail(email);

        return user && user.isActive;

    }

    async login(user: User): Promise<LoginResponse> {

        const payload: PayloadToken = {
            sub: user._id,
            email: user.email,
            role: user.roleId.name
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                surName: user.surName,
                email: user.email,
                role: { name: user.roleId.name }
            },
        };

    }

}
