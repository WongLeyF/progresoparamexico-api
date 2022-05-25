import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './entities/institute.entity';
import { Model } from 'mongoose';

@Injectable()
export class InstituteService {
  constructor(@InjectModel('Institute') private readonly instituteModule: Model<Institute> ) {}

  create(createInstituteDto: CreateInstituteDto) {
    return this.instituteModule.create(createInstituteDto);
  }

  findAll() {
    return this.instituteModule.find();
  }

  findOne(id: number) {
    return this.instituteModule.findById(id).exec();
  }

  findBySchoolGrade(grade: string) {
    return this.instituteModule.find({ schoolGrade: grade }).exec();
  }

  update(id: number, updateInstituteDto: UpdateInstituteDto) {
    return this.instituteModule.findByIdAndUpdate(id, updateInstituteDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.instituteModule.findByIdAndRemove(id).exec();
  }
}
