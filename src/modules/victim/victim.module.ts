import { Module } from '@nestjs/common';
import { VictimService } from './victim.service';
import { VictimController } from './victim.controller';

@Module({
  controllers: [VictimController],
  providers: [VictimService]
})
export class VictimModule {}
