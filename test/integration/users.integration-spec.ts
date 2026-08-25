import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createIntegrationApp } from './test-app';
import { resetDatabase } from './db.util';

describe('Users (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  async function signup(email: string, password = 'password123') {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password })
      .expect(201);
    return res.body as { accessToken: string; user: { id: string; role: UserRole } };
  }

  async function promoteToAdmin(userId: string) {
    await prisma.user.update({ where: { id: userId }, data: { role: UserRole.ADMIN } });
  }

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

  describe('GET /users/me', () => {
    it('returns the authenticated user profile', async () => {
      const { accessToken, user } = await signup('me@example.com');

      const res = await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body).toMatchObject({ id: user.id, email: 'me@example.com', role: 'REGULAR' });
    });

    it('rejects unauthenticated requests', async () => {
      await request(app.getHttpServer()).get('/users/me').expect(401);
    });
  });

  describe('GET /users/me/role', () => {
    it('returns the current role', async () => {
      const { accessToken } = await signup('role@example.com');

      const res = await request(app.getHttpServer())
        .get('/users/me/role')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body).toEqual({ role: 'REGULAR' });
    });
  });

  describe('GET /users (admin only)', () => {
    it('forbids REGULAR users', async () => {
      const { accessToken } = await signup('regular@example.com');

      await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });

    it('allows ADMIN users and lists all users', async () => {
      const admin = await signup('admin@example.com');
      await promoteToAdmin(admin.user.id);
      await signup('other@example.com');

      const res = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${admin.accessToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('PATCH /users/:id/role (admin only)', () => {
    it('forbids non-admins from changing roles', async () => {
      const { accessToken, user } = await signup('self-promote@example.com');

      await request(app.getHttpServer())
        .patch(`/users/${user.id}/role`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ role: 'ADMIN' })
        .expect(403);
    });

    it('lets an admin change another user role', async () => {
      const admin = await signup('admin2@example.com');
      await promoteToAdmin(admin.user.id);
      const target = await signup('target@example.com');

      const res = await request(app.getHttpServer())
        .patch(`/users/${target.user.id}/role`)
        .set('Authorization', `Bearer ${admin.accessToken}`)
        .send({ role: 'VIEWER' })
        .expect(200);

      expect(res.body.role).toEqual('VIEWER');
    });

    it('rejects an invalid role value', async () => {
      const admin = await signup('admin3@example.com');
      await promoteToAdmin(admin.user.id);
      const target = await signup('target2@example.com');

      await request(app.getHttpServer())
        .patch(`/users/${target.user.id}/role`)
        .set('Authorization', `Bearer ${admin.accessToken}`)
        .send({ role: 'SUPERUSER' })
        .expect(400);
    });
  });
});
