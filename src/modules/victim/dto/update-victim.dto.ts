import { PartialType } from '@nestjs/mapped-types';
import { CreateVictimDto } from './create-victim.dto';

export class UpdateVictimDto extends PartialType(CreateVictimDto) {
    _id: string;
    name?: string;
    lastName?: string;
    age?: number;
    address?: string;
    phone?: string;
    email?: string;
    career?: string;
    institute?: string;
}
