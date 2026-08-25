import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let authService: { validateUser: jest.Mock };

  beforeEach(async () => {
    authService = { validateUser: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('returns the user when validation succeeds', async () => {
    const user = { id: 'user-1', email: 'test@example.com' };
    authService.validateUser.mockResolvedValue(user);

    const result = await strategy.validate({
      sub: 'user-1',
      email: 'test@example.com',
      role: 'USER',
    } as any);

    expect(result).toEqual(user);
    expect(authService.validateUser).toHaveBeenCalledWith('user-1');
  });

  it('throws UnauthorizedException when the user cannot be validated', async () => {
    authService.validateUser.mockResolvedValue(null);

    await expect(
      strategy.validate({
        sub: 'missing',
        email: 'missing@example.com',
        role: 'USER',
      } as any),
    ).rejects.toThrow(UnauthorizedException);
  });
});
