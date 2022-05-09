import { Test, TestingModule } from '@nestjs/testing';
import { VictimService } from './victim.service';

describe('VictimService', () => {
  let service: VictimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VictimService],
    }).compile();

    service = module.get<VictimService>(VictimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
