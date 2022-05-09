import { Injectable } from '@nestjs/common';
import { CreateAggressorDto } from './dto/create-aggressor.dto';
import { UpdateAggressorDto } from './dto/update-aggressor.dto';

@Injectable()
export class AggressorService {
  create(createAggressorDto: CreateAggressorDto) {
    return 'This action adds a new aggressor';
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
