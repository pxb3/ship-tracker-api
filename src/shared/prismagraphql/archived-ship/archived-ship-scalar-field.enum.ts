import { registerEnumType } from '@nestjs/graphql';

export enum ArchivedShipScalarFieldEnum {
    id = "id",
    mmsi = "mmsi",
    shipName = "shipName",
    latitude = "latitude",
    longitude = "longitude",
    rateOfTurn = "rateOfTurn",
    trueHeading = "trueHeading",
    cog = "cog",
    sog = "sog",
    navigationalStatus = "navigationalStatus",
    timestamp = "timestamp",
    lastSeenAt = "lastSeenAt",
    archivedAt = "archivedAt"
}


registerEnumType(ArchivedShipScalarFieldEnum, { name: 'ArchivedShipScalarFieldEnum', description: undefined })
