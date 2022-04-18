import { Test, TestingModule } from '@nestjs/testing';
import { DenounceService } from './denounce.service';

describe('DenounceService', () => {
  let service: DenounceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DenounceService],
    }).compile();

    service = module.get<DenounceService>(DenounceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
