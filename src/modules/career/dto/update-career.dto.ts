import { PartialType } from '@nestjs/mapped-types';
import { CreateCareerDto } from './create-career.dto';

export class UpdateCareerDto extends PartialType(CreateCareerDto) {
    _id: string;
    name?: string;
    description?: string;
    instituteId?: string;
}
