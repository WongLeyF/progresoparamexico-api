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
    return this.aggressorModule.find();
  }

  findOne(id: string) {
    return this.aggressorModule.findById(id);
  }

  update(id: string, updateAggressorDto: UpdateAggressorDto) {
    return this.aggressorModule.findByIdAndUpdate(id, updateAggressorDto);
  }

  remove(id: string) {
    return this.aggressorModule.findByIdAndRemove(id);
  }

  // find by query
  search(query: any) {
    console.log(query);
    
    return this.aggressorModule.find(query);
  }
}
