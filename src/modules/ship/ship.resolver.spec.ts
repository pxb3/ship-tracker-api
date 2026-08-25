import { Test, TestingModule } from '@nestjs/testing';
import { ShipResolver } from './ship.resolver';
import { ShipService } from './ship.service';

describe('ShipResolver', () => {
  let resolver: ShipResolver;
  let shipService: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
    prisma: {
      $queryRaw: jest.Mock;
      shipStaticData: { findMany: jest.Mock };
      ship: { count: jest.Mock };
    };
  };

  const mockShip = { id: 'ship-1', shipName: 'Aurora', mmsi: '123456789' };

  beforeEach(async () => {
    shipService = {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      prisma: {
        $queryRaw: jest.fn(),
        shipStaticData: { findMany: jest.fn() },
        ship: { count: jest.fn() },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipResolver,
        { provide: ShipService, useValue: shipService },
      ],
    }).compile();

    resolver = module.get<ShipResolver>(ShipResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findUniqueShip', () => {
    it('delegates to shipService.findUnique with ShipStaticData included', () => {
      shipService.findUnique.mockReturnValue(mockShip);
      const args = { where: { id: 'ship-1' } } as any;

      const result = resolver.findUniqueShip(args);

      expect(result).toEqual(mockShip);
      expect(shipService.findUnique).toHaveBeenCalledWith({
        where: args.where,
        include: { ShipStaticData: true },
      });
    });
  });

  describe('searchShipsPage', () => {
    it('returns an empty page when the query is blank', async () => {
      const result = await resolver.searchShipsPage('', 0, 20);

      expect(result).toEqual({ ships: [], total: 0 });
      expect(shipService.prisma.$queryRaw).not.toHaveBeenCalled();
    });

    it('returns paginated ships with total count', async () => {
      shipService.prisma.$queryRaw
        .mockResolvedValueOnce([{ id: 'ship-1', shipName: 'Aurora' }])
        .mockResolvedValueOnce([{ count: '1' }]);
      shipService.prisma.shipStaticData.findMany.mockResolvedValue([]);

      const result = await resolver.searchShipsPage('aurora', 0, 20);

      expect(result).toEqual({
        ships: [{ id: 'ship-1', shipName: 'Aurora', ShipStaticData: null }],
        total: 1,
      });
    });

    it('falls back to a simple paginated search when the raw query fails', async () => {
      shipService.prisma.$queryRaw.mockRejectedValue(new Error('db error'));
      shipService.findMany.mockResolvedValue([mockShip]);
      shipService.prisma.ship.count.mockResolvedValue(1);

      const result = await resolver.searchShipsPage('aurora', 0, 20);

      expect(result).toEqual({ ships: [mockShip], total: 1 });
    });
  });
});
