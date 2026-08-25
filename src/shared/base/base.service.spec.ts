import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseCrudService } from './base.service';

// getModelName() derives the Prisma model key from the class name by stripping
// the trailing "Service" (e.g. ShipService -> Ship). For the base class itself
// (BaseCrudService) that yields "BaseCrud", which is the key we mock on Prisma below.
type AnyBaseCrudService = BaseCrudService<any, any, any, any, any, any, any, any, any, any, any, any>;

describe('BaseCrudService', () => {
  let service: AnyBaseCrudService;
  let model: {
    findFirst: jest.Mock;
    findUnique: jest.Mock;
    findMany: jest.Mock;
    groupBy: jest.Mock;
    aggregate: jest.Mock;
    create: jest.Mock;
    createMany: jest.Mock;
    update: jest.Mock;
    updateMany: jest.Mock;
    delete: jest.Mock;
    deleteMany: jest.Mock;
  };

  beforeEach(async () => {
    model = {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      groupBy: jest.fn(),
      aggregate: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseCrudService,
        { provide: PrismaService, useValue: { BaseCrud: model } },
      ],
    }).compile();

    service = module.get<AnyBaseCrudService>(BaseCrudService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findFirst', () => {
    it('delegates to the Prisma model', async () => {
      model.findFirst.mockResolvedValue({ id: '1' });
      const args = { where: { id: '1' } };

      const result = await service.findFirst(args);

      expect(result).toEqual({ id: '1' });
      expect(model.findFirst).toHaveBeenCalledWith(args);
    });

    it('returns null when the Prisma call throws', async () => {
      model.findFirst.mockRejectedValue(new Error('db error'));

      const result = await service.findFirst({});

      expect(result).toBeNull();
    });
  });

  it('findUnique delegates to the Prisma model', async () => {
    model.findUnique.mockResolvedValue({ id: '1' });
    const args = { where: { id: '1' } };

    const result = await service.findUnique(args);

    expect(result).toEqual({ id: '1' });
    expect(model.findUnique).toHaveBeenCalledWith(args);
  });

  it('findMany delegates to the Prisma model', async () => {
    model.findMany.mockResolvedValue([{ id: '1' }]);
    const args = {};

    const result = await service.findMany(args);

    expect(result).toEqual([{ id: '1' }]);
    expect(model.findMany).toHaveBeenCalledWith(args);
  });

  it('groupBy delegates to the Prisma model', async () => {
    model.groupBy.mockResolvedValue([]);
    const args = {};

    const result = await service.groupBy(args);

    expect(result).toEqual([]);
    expect(model.groupBy).toHaveBeenCalledWith(args);
  });

  it('aggregate delegates to the Prisma model', async () => {
    model.aggregate.mockResolvedValue({ _count: 1 });
    const args = {};

    const result = await service.aggregate(args);

    expect(result).toEqual({ _count: 1 });
    expect(model.aggregate).toHaveBeenCalledWith(args);
  });

  it('create delegates to the Prisma model', async () => {
    model.create.mockResolvedValue({ id: '1' });
    const args = { data: {} };

    const result = await service.create(args);

    expect(result).toEqual({ id: '1' });
    expect(model.create).toHaveBeenCalledWith(args);
  });

  it('createMany delegates to the Prisma model', async () => {
    model.createMany.mockResolvedValue({ count: 2 });
    const args = { data: [] };

    const result = await service.createMany(args);

    expect(result).toEqual({ count: 2 });
    expect(model.createMany).toHaveBeenCalledWith(args);
  });

  it('update delegates to the Prisma model', async () => {
    model.update.mockResolvedValue({ id: '1' });
    const args = { where: { id: '1' }, data: {} };

    const result = await service.update(args);

    expect(result).toEqual({ id: '1' });
    expect(model.update).toHaveBeenCalledWith(args);
  });

  it('updateMany delegates to the Prisma model', async () => {
    model.updateMany.mockResolvedValue({ count: 3 });
    const args = { where: {}, data: {} };

    const result = await service.updateMany(args);

    expect(result).toEqual({ count: 3 });
    expect(model.updateMany).toHaveBeenCalledWith(args);
  });

  it('delete delegates to the Prisma model', async () => {
    model.delete.mockResolvedValue({ id: '1' });
    const args = { where: { id: '1' } };

    const result = await service.delete(args);

    expect(result).toEqual({ id: '1' });
    expect(model.delete).toHaveBeenCalledWith(args);
  });

  it('deleteMany delegates to the Prisma model', async () => {
    model.deleteMany.mockResolvedValue({ count: 4 });
    const args = { where: {} };

    const result = await service.deleteMany(args);

    expect(result).toEqual({ count: 4 });
    expect(model.deleteMany).toHaveBeenCalledWith(args);
  });
});
