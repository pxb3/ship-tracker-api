import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: {
    signup: jest.Mock;
    login: jest.Mock;
    refreshTokens: jest.Mock;
    logout: jest.Mock;
  };

  const mockAuthResponse = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    user: {
      id: 'user-1',
      email: 'test@example.com',
      role: UserRole.REGULAR,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-02T00:00:00.000Z'),
    },
  };

  beforeEach(async () => {
    authService = {
      signup: jest.fn(),
      login: jest.fn(),
      refreshTokens: jest.fn(),
      logout: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('delegates to authService.signup', async () => {
      authService.signup.mockResolvedValue(mockAuthResponse);
      const dto = { email: 'test@example.com', password: 'password123' };

      const result = await controller.signup(dto);

      expect(result).toEqual(mockAuthResponse);
      expect(authService.signup).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('delegates to authService.login', async () => {
      authService.login.mockResolvedValue(mockAuthResponse);
      const dto = { email: 'test@example.com', password: 'password123' };

      const result = await controller.login(dto);

      expect(result).toEqual(mockAuthResponse);
      expect(authService.login).toHaveBeenCalledWith(dto);
    });
  });

  describe('refresh', () => {
    it('delegates to authService.refreshTokens', async () => {
      const tokens = { accessToken: 'a', refreshToken: 'b' };
      authService.refreshTokens.mockResolvedValue(tokens);

      const result = await controller.refresh({ refreshToken: 'old-token' });

      expect(result).toEqual(tokens);
      expect(authService.refreshTokens).toHaveBeenCalledWith('old-token');
    });
  });

  describe('logout', () => {
    it('logs out the current user and returns a confirmation message', async () => {
      authService.logout.mockResolvedValue(undefined);

      const result = await controller.logout(
        { user: { id: 'user-1' } },
        { refreshToken: 'old-token' },
      );

      expect(authService.logout).toHaveBeenCalledWith('user-1', 'old-token');
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('getProfile', () => {
    it('returns the authenticated user from the request', async () => {
      const user = { id: 'user-1', email: 'test@example.com' };

      const result = await controller.getProfile({ user });

      expect(result).toEqual(user);
    });
  });
});
