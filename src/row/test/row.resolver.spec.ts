import { Test, TestingModule } from '@nestjs/testing';
import { RowResolver } from '../row.resolver';

describe('RowResolver', () => {
  let resolver: RowResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RowResolver],
    }).compile();

    resolver = module.get<RowResolver>(RowResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
