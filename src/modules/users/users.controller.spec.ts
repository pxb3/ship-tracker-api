import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: {
    getUserById: jest.Mock;
    getUserRole: jest.Mock;
    getAllUsers: jest.Mock;
    updateUserRole: jest.Mock;
  };

  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    role: UserRole.USER,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-02T00:00:00.000Z'),
  };

  beforeEach(async () => {
    usersService = {
      getUserById: jest.fn(),
      getUserRole: jest.fn(),
      getAllUsers: jest.fn(),
      updateUserRole: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrentUser', () => {
    it('returns the current user from the request', async () => {
      usersService.getUserById.mockResolvedValue(mockUser);

      const result = await controller.getCurrentUser({
        user: { id: 'user-1' },
      });

      expect(result).toEqual(mockUser);
      expect(usersService.getUserById).toHaveBeenCalledWith('user-1');
    });
  });

  describe('getCurrentUserRole', () => {
    it('returns the role of the current user', async () => {
      usersService.getUserRole.mockResolvedValue({ role: UserRole.ADMIN });

      const result = await controller.getCurrentUserRole({
        user: { id: 'user-1' },
      });

      expect(result).toEqual({ role: UserRole.ADMIN });
      expect(usersService.getUserRole).toHaveBeenCalledWith('user-1');
    });
  });

  describe('getAllUsers', () => {
    it('returns all users', async () => {
      usersService.getAllUsers.mockResolvedValue([mockUser]);

      const result = await controller.getAllUsers();

      expect(result).toEqual([mockUser]);
      expect(usersService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('returns the user for the given id', async () => {
      usersService.getUserById.mockResolvedValue(mockUser);

      const result = await controller.getUserById('user-1');

      expect(result).toEqual(mockUser);
      expect(usersService.getUserById).toHaveBeenCalledWith('user-1');
    });
  });

  describe('getUserRole', () => {
    it('returns the role for the given id', async () => {
      usersService.getUserRole.mockResolvedValue({ role: UserRole.USER });

      const result = await controller.getUserRole('user-1');

      expect(result).toEqual({ role: UserRole.USER });
      expect(usersService.getUserRole).toHaveBeenCalledWith('user-1');
    });
  });

  describe('updateUserRole', () => {
    it('updates the role for the given id', async () => {
      const updatedUser = { ...mockUser, role: UserRole.ADMIN };
      usersService.updateUserRole.mockResolvedValue(updatedUser);

      const result = await controller.updateUserRole('user-1', {
        role: UserRole.ADMIN,
      });

      expect(result).toEqual(updatedUser);
      expect(usersService.updateUserRole).toHaveBeenCalledWith(
        'user-1',
        UserRole.ADMIN,
      );
    });
  });
});
