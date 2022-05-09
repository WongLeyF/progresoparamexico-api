import { Test, TestingModule } from '@nestjs/testing';
import { VictimController } from './victim.controller';
import { VictimService } from './victim.service';

describe('VictimController', () => {
  let controller: VictimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VictimController],
      providers: [VictimService],
    }).compile();

    controller = module.get<VictimController>(VictimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
