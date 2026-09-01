import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseCrudService } from "../../shared/base/base.service";
import { 
    CreateManyShipArgs,
    CreateOneShipArgs,
    DeleteManyShipArgs,
    DeleteOneShipArgs,
    FindFirstShipArgs,
    FindManyShipArgs,
    FindUniqueShipArgs,
    UpdateManyShipArgs,
    UpdateOneShipArgs,
    Ship,
    ShipAggregateArgs,
    ShipGroupByArgs,
} from "../../shared/prismagraphql/ship";

/**
 * API-side read/CRUD access to ships (used by GraphQL). Ingestion-only
 * write orchestration lives in ShipIngestionService (ingestion worker process).
 */
@Injectable()
export class ShipService extends BaseCrudService<
    Ship,
    FindFirstShipArgs,
    FindUniqueShipArgs,
    FindManyShipArgs,
    ShipGroupByArgs,
    ShipAggregateArgs,
    CreateOneShipArgs,
    CreateManyShipArgs,
    UpdateOneShipArgs,
    UpdateManyShipArgs,
    DeleteOneShipArgs,
    DeleteManyShipArgs
> {
  private readonly logger = new Logger(ShipService.name);

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
