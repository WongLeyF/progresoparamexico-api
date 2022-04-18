import { Test, TestingModule } from '@nestjs/testing';
import { DenounceController } from './denounce.controller';

describe('DenounceController', () => {
  let controller: DenounceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DenounceController],
    }).compile();

    controller = module.get<DenounceController>(DenounceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
