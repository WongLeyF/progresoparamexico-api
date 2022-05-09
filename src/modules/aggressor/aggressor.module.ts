import { Module } from '@nestjs/common';
import { AggressorService } from './aggressor.service';
import { AggressorController } from './aggressor.controller';

@Module({
  controllers: [AggressorController],
  providers: [AggressorService]
})
export class AggressorModule {}
