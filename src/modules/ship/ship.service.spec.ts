import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ShipService } from './ship.service';

describe('ShipService', () => {
  let service: ShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<ShipService>(ShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
