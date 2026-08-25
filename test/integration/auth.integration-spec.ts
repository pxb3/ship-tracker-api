import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createIntegrationApp } from './test-app';
import { resetDatabase } from './db.util';

describe('Auth (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const credentials = { email: 'auth-test@example.com', password: 'password123' };

  beforeAll(async () => {
    app = await createIntegrationApp();
    prisma = app.get(PrismaService);
  });

  afterEach(async () => {
    await resetDatabase(prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/signup', () => {
    it('creates a REGULAR user and returns tokens', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(credentials)
        .expect(201);

      expect(res.body).toMatchObject({
        user: { email: credentials.email, role: 'REGULAR' },
      });
      expect(res.body.accessToken).toEqual(expect.any(String));
      expect(res.body.refreshToken).toEqual(expect.any(String));

      const stored = await prisma.user.findUnique({ where: { email: credentials.email } });
      expect(stored?.password).not.toEqual(credentials.password);
    });

    it('rejects duplicate emails with 409', async () => {
      await request(app.getHttpServer()).post('/auth/signup').send(credentials).expect(201);

      await request(app.getHttpServer()).post('/auth/signup').send(credentials).expect(409);
    });

    it('rejects invalid payloads with 400', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: 'not-an-email', password: '123' })
        .expect(400);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app.getHttpServer()).post('/auth/signup').send(credentials);
    });

    it('logs in with valid credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send(credentials)
        .expect(200);

      expect(res.body.accessToken).toEqual(expect.any(String));
      expect(res.body.user.email).toEqual(credentials.email);
    });

    it('rejects an invalid password with 401', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ ...credentials, password: 'wrong-password' })
        .expect(401);
    });

    it('rejects an unknown email with 401', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@example.com', password: credentials.password })
        .expect(401);
    });
  });

  describe('refresh / me / logout flow', () => {
    it('issues a new token pair, exposes the profile, and revokes the token on logout', async () => {
      const signupRes = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(credentials)
        .expect(201);

      const { accessToken, refreshToken } = signupRes.body;

      const refreshRes = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(refreshRes.body.accessToken).toEqual(expect.any(String));
      expect(refreshRes.body.refreshToken).not.toEqual(refreshToken);

      const meRes = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(meRes.body.email).toEqual(credentials.email);

      await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ refreshToken: refreshRes.body.refreshToken })
        .expect(200);

      // the revoked refresh token can no longer mint new tokens
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: refreshRes.body.refreshToken })
        .expect(401);
    });

    it('rejects /auth/me without a bearer token', async () => {
      await request(app.getHttpServer()).get('/auth/me').expect(401);
    });
  });
});
