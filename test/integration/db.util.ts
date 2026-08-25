import { PrismaService } from '../../src/prisma/prisma.service';

/**
 * Truncates all app tables between tests. Order respects FK constraints
 * (children before parents).
 */
export async function resetDatabase(prisma: PrismaService): Promise<void> {
  await prisma.$transaction([
    prisma.refreshToken.deleteMany(),
    prisma.shipStaticData.deleteMany(),
    prisma.ship.deleteMany(),
    prisma.archivedShipStaticData.deleteMany(),
    prisma.archivedShip.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
