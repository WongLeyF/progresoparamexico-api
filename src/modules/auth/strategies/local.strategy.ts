import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../../modules/users/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {

        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new BadRequestException('El correo o la contraseña son incorrectos');
        }

        return user;

    }

}