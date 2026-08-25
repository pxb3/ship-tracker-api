import { Ship } from "../../shared/prismagraphql/ship";
import { Resolver, Query, Args, Int, ObjectType, Field } from "@nestjs/graphql";
import { ShipService } from "./ship.service";
// Import custom DTOs (safe from Prisma regeneration)
import { FindUniqueShipArgs } from './dto';

@ObjectType()
class ShipSearchPage {
    @Field(() => [Ship], { nullable: false })
    ships!: Ship[];

    @Field(() => Int)
    total!: number;
}

@Resolver(() => Ship)
export class ShipResolver {
    constructor(
        private readonly shipService: ShipService,
    ) {}

    @Query(() => Ship, { name: 'findUniqueShip', nullable: false })
    findUniqueShip(@Args() args: FindUniqueShipArgs) {
        // Using custom DTO with proper validation decorators
        // This won't be affected by Prisma regeneration
        return this.shipService.findUnique({ 
            where: args.where, 
            include: { ShipStaticData: true } 
        } as any);
    }

    // Paginated server-backed search with fuzzy matching: returns items + total count for client-side paging
    // Uses PostgreSQL trigram similarity (pg_trgm) for typo tolerance
    @Query(() => ShipSearchPage, { name: 'searchShipsPage' })
    async searchShipsPage(@Args('q') q: string, @Args('skip', { type: () => Int }) skip = 0, @Args('take', { type: () => Int }) take = 20) {
        const term = (q || '').trim();
        if (!term) return { ships: [], total: 0 };

        try {
            // Use PostgreSQL trigram similarity for fuzzy search
            // SIMILARITY() returns a value between 0 and 1 (1 = exact match)
            // We use a threshold of 0.2 (20% similarity) to catch typos while avoiding too many false positives
            const similarityThreshold = 0.2;

            // Query with fuzzy matching using trigram similarity
            const ships = await (this.shipService.prisma as any).$queryRaw`
                SELECT 
                    s.*,
                    GREATEST(
                        SIMILARITY(COALESCE(s."shipName", ''), ${term}),
                        SIMILARITY(CAST(COALESCE(s.mmsi, '') AS TEXT), ${term})
                    ) as relevance_score
                FROM "Ship" s
                WHERE 
                    SIMILARITY(COALESCE(s."shipName", ''), ${term}) > ${similarityThreshold}
                    OR SIMILARITY(CAST(COALESCE(s.mmsi, '') AS TEXT), ${term}) > ${similarityThreshold}
                    OR s."shipName" ILIKE ${`%${term}%`}
                    OR CAST(s.mmsi AS TEXT) LIKE ${`%${term}%`}
                ORDER BY relevance_score DESC, s."shipName" ASC
                LIMIT ${take}
                OFFSET ${skip}
            `;

            // Count total matching results for pagination
            const countResult = await (this.shipService.prisma as any).$queryRaw`
                SELECT COUNT(*) as count
                FROM "Ship" s
                WHERE 
                    SIMILARITY(COALESCE(s."shipName", ''), ${term}) > ${similarityThreshold}
                    OR SIMILARITY(CAST(COALESCE(s.mmsi, '') AS TEXT), ${term}) > ${similarityThreshold}
                    OR s."shipName" ILIKE ${`%${term}%`}
                    OR CAST(s.mmsi AS TEXT) LIKE ${`%${term}%`}
            `;

            const total = Number(countResult[0]?.count || 0);

            // Fetch static data for results if needed
            if (ships.length > 0) {
                const shipIds = ships.map((s: any) => s.id);
                const staticData = await (this.shipService.prisma as any).shipStaticData.findMany({
                    where: { shipId: { in: shipIds } }
                });

                const staticDataMap = new Map(staticData.map((sd: any) => [sd.shipId, sd]));
                ships.forEach((ship: any) => {
                    ship.ShipStaticData = staticDataMap.get(ship.id) || null;
                });
            }

            return { ships, total };
        } catch (e) {
            console.error('Fuzzy search error:', e);
            // Fallback to simple search if fuzzy search fails
            const where: any = {
                OR: [
                    { shipName: { contains: term, mode: 'insensitive' } },
                    { mmsi: { contains: term } },
                ],
            };

            const [items, total] = await Promise.all([
                this.shipService.findMany({ where, skip: Number(skip), take: Number(take), include: { ShipStaticData: true } } as any),
                (this.shipService.prisma as any).ship.count({ where }),
            ]);
            return { ships: items, total };
        }
    }
}