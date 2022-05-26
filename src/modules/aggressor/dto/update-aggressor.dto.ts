import { PartialType } from '@nestjs/mapped-types';
import { CreateAggressorDto } from './create-aggressor.dto';

export class UpdateAggressorDto extends PartialType(CreateAggressorDto) {
    _id?: string;
    name?: string;
    lastName?: string;
    age?: number;
    type?: string;
    gender?:string;
    instituteId?: string;
}
