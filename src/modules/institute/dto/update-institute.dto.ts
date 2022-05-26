import { PartialType } from '@nestjs/mapped-types';
import { Career } from 'src/modules/career/entities/career.entity';
import { CreateInstituteDto } from './create-institute.dto';

export class UpdateInstituteDto extends PartialType(CreateInstituteDto) {
    _id?: string;
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    schoolGrade?: string;
    careers?: Array<Career>;
}
