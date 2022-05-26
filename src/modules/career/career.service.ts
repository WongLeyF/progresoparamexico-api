import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { Career } from './entities/career.entity';
import { Model } from 'mongoose';

@Injectable()
export class CareerService {
  constructor(@InjectModel('Career') private readonly careerModule: Model<Career> ) {}

  create(createCareerDto: CreateCareerDto) {
    return this.careerModule.create(createCareerDto);
  }

  findAll() {
    return this.careerModule.find();
  }

  findOne(id: string) {
    return this.careerModule.findById(id).exec();
  }

  update(id: string, updateCareerDto: UpdateCareerDto) {
    return this.careerModule.findByIdAndUpdate(id, updateCareerDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.careerModule.findByIdAndRemove(id).exec();
  }
  
  findByInstituteId(instituteId: string) {
    return this.careerModule.find({ instituteId: instituteId }).exec();
  }
}
