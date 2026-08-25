import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: {
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

  const mockUser = { id: 'user-1', email: 'test@example.com' };

  beforeEach(async () => {
    usersService = {
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
        UsersResolver,
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('findFirstUser delegates to usersService.findFirst', async () => {
    usersService.findFirst.mockResolvedValue(mockUser);
    const args = { where: { id: { equals: 'user-1' } } } as any;

    const result = await resolver.findFirstUser(args);

    expect(result).toEqual(mockUser);
    expect(usersService.findFirst).toHaveBeenCalledWith(args);
  });

  it('findUniqueUser delegates to usersService.findUnique', async () => {
    usersService.findUnique.mockResolvedValue(mockUser);
    const args = { where: { id: 'user-1' } } as any;

    const result = await resolver.findUniqueUser(args);

    expect(result).toEqual(mockUser);
    expect(usersService.findUnique).toHaveBeenCalledWith(args);
  });

  it('listUsers delegates to usersService.findMany', async () => {
    usersService.findMany.mockResolvedValue([mockUser]);
    const args = {} as any;

    const result = await resolver.listUsers(args);

    expect(result).toEqual([mockUser]);
    expect(usersService.findMany).toHaveBeenCalledWith(args);
  });

  it('groupByUser delegates to usersService.groupBy', async () => {
    usersService.groupBy.mockResolvedValue([]);
    const args = {} as any;

    const result = await resolver.groupByUser(args);

    expect(result).toEqual([]);
    expect(usersService.groupBy).toHaveBeenCalledWith(args);
  });

  it('aggregateUser delegates to usersService.aggregate', async () => {
    usersService.aggregate.mockResolvedValue({ _count: 1 });
    const args = {} as any;

    const result = await resolver.aggregateUser(args);

    expect(result).toEqual({ _count: 1 });
    expect(usersService.aggregate).toHaveBeenCalledWith(args);
  });

  it('createUser delegates to usersService.create', async () => {
    usersService.create.mockResolvedValue(mockUser);
    const args = { data: mockUser } as any;

    const result = await resolver.createUser(args);

    expect(result).toEqual(mockUser);
    expect(usersService.create).toHaveBeenCalledWith(args);
  });

  it('createManyUser delegates to usersService.createMany', async () => {
    usersService.createMany.mockResolvedValue({ count: 1 });
    const args = { data: [mockUser] } as any;

    const result = await resolver.createManyUser(args);

    expect(result).toEqual({ count: 1 });
    expect(usersService.createMany).toHaveBeenCalledWith(args);
  });

  it('updateUser delegates to usersService.update', async () => {
    usersService.update.mockResolvedValue(mockUser);
    const args = { where: { id: 'user-1' }, data: {} } as any;

    const result = await resolver.updateUser(args);

    expect(result).toEqual(mockUser);
    expect(usersService.update).toHaveBeenCalledWith(args);
  });

  it('updateManyUser delegates to usersService.updateMany', async () => {
    usersService.updateMany.mockResolvedValue({ count: 2 });
    const args = { where: {}, data: {} } as any;

    const result = await resolver.updateManyUser(args);

    expect(result).toEqual({ count: 2 });
    expect(usersService.updateMany).toHaveBeenCalledWith(args);
  });

  it('deleteUser delegates to usersService.delete', async () => {
    usersService.delete.mockResolvedValue(mockUser);
    const args = { where: { id: 'user-1' } } as any;

    const result = await resolver.deleteUser(args);

    expect(result).toEqual(mockUser);
    expect(usersService.delete).toHaveBeenCalledWith(args);
  });

  it('deleteManyUser delegates to usersService.deleteMany', async () => {
    usersService.deleteMany.mockResolvedValue({ count: 3 });
    const args = { where: {} } as any;

    const result = await resolver.deleteManyUser(args);

    expect(result).toEqual({ count: 3 });
    expect(usersService.deleteMany).toHaveBeenCalledWith(args);
  });
});
