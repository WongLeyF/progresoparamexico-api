import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadToken } from '../interfaces/payload-token.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private configService: ConfigService,
        private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get<string>('SECRET_JWT'),
        });
    }

    async validate(payload: PayloadToken): Promise<PayloadToken> {

        const isActive = await this.authService.validateStatus(payload.email);

        if (!isActive) {
            throw new UnauthorizedException('Su usuario se encuentra inactivo');
        }

        return payload;

    }

}