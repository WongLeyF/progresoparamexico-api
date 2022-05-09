import { Test, TestingModule } from '@nestjs/testing';
import { AggressorService } from './aggressor.service';

describe('AggressorService', () => {
  let service: AggressorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AggressorService],
    }).compile();

    service = module.get<AggressorService>(AggressorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
