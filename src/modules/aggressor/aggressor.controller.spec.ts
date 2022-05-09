import { Test, TestingModule } from '@nestjs/testing';
import { AggressorController } from './aggressor.controller';
import { AggressorService } from './aggressor.service';

describe('AggressorController', () => {
  let controller: AggressorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AggressorController],
      providers: [AggressorService],
    }).compile();

    controller = module.get<AggressorController>(AggressorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
