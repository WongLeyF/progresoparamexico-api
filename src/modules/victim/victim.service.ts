import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';
import { Victim } from './entities/victim.entity';
import { Model } from 'mongoose';

@Injectable()
export class VictimService {

  constructor(@InjectModel('Victim') private readonly victimModule: Model<Victim> ) {}

  create(createVictimDto: CreateVictimDto) {
    return;
  }

  findAll() {
    return this.victimModule.find();
  }

  findOne(id: number) {
    return this.victimModule.findById(id).exec();
  }

  update(id: number, updateVictimDto: UpdateVictimDto) {
    return this.victimModule.findByIdAndUpdate(id, updateVictimDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.victimModule.findByIdAndRemove(id).exec();
  }
}
