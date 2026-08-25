import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createIntegrationApp } from './test-app';
import { resetDatabase } from './db.util';

describe('Ship GraphQL (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

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

  function graphql(query: string, variables?: Record<string, unknown>) {
    return request(app.getHttpServer()).post('/graphql').send({ query, variables });
  }

  describe('findUniqueShip', () => {
    it('returns a ship seeded directly in the database', async () => {
      const ship = await prisma.ship.create({
        data: {
          id: 'ship-1',
          mmsi: '123456789',
          shipName: 'Test Vessel',
          latitude: 12.34,
          longitude: 56.78,
        },
      });

      const res = await graphql(
        `
          query FindShip($id: String!) {
            findUniqueShip(where: { id: $id }) {
              id
              shipName
              mmsi
              latitude
              longitude
            }
          }
        `,
        { id: ship.id },
      );

      expect(res.status).toBe(200);
      expect(res.body.errors).toBeUndefined();
      expect(res.body.data.findUniqueShip).toMatchObject({
        id: 'ship-1',
        shipName: 'Test Vessel',
        mmsi: '123456789',
      });
    });

    it('returns a GraphQL error when the ship does not exist', async () => {
      const res = await graphql(
        `
          query FindShip($id: String!) {
            findUniqueShip(where: { id: $id }) {
              id
            }
          }
        `,
        { id: 'does-not-exist' },
      );

      expect(res.status).toBe(200);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('searchShipsPage', () => {
    it('finds ships by fuzzy name match', async () => {
      await prisma.ship.create({
        data: { id: 'ship-2', shipName: 'Ever Given', mmsi: '111111111' },
      });

      const res = await graphql(
        `
          query Search($q: String!) {
            searchShipsPage(q: $q, skip: 0, take: 10) {
              total
              ships {
                id
                shipName
              }
            }
          }
        `,
        { q: 'Ever Given' },
      );

      expect(res.status).toBe(200);
      expect(res.body.errors).toBeUndefined();
      expect(res.body.data.searchShipsPage.total).toBeGreaterThanOrEqual(1);
      expect(res.body.data.searchShipsPage.ships).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: 'ship-2' })]),
      );
    });
  });
});
