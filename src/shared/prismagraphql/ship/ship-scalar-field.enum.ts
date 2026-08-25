import { registerEnumType } from '@nestjs/graphql';

export enum ShipScalarFieldEnum {
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
    lastSeenAt = "lastSeenAt"
}


registerEnumType(ShipScalarFieldEnum, { name: 'ShipScalarFieldEnum', description: undefined })
