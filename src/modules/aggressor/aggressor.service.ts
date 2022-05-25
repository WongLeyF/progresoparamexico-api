import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAggressorDto } from './dto/create-aggressor.dto';
import { UpdateAggressorDto } from './dto/update-aggressor.dto';
import { Aggressor } from './entities/aggressor.entity';

@Injectable()
export class AggressorService {

  constructor(@InjectModel('Aggressor') private readonly aggressorModule: Model<Aggressor> ) {}

  create(createAggressorDto: CreateAggressorDto) {
    return this.aggressorModule.create(createAggressorDto);
  }

  findAll() {
    return `This action returns all aggressor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aggressor`;
  }

  update(id: number, updateAggressorDto: UpdateAggressorDto) {
    return `This action updates a #${id} aggressor`;
  }

  remove(id: number) {
    return `This action removes a #${id} aggressor`;
  }
}
