import { registerEnumType } from '@nestjs/graphql';

export enum ArchivedShipStaticDataScalarFieldEnum {
    id = "id",
    archivedShipId = "archivedShipId",
    callSign = "callSign",
    destination = "destination",
    dimensionA = "dimensionA",
    dimensionB = "dimensionB",
    dimensionC = "dimensionC",
    dimensionD = "dimensionD",
    etaDay = "etaDay",
    etaHour = "etaHour",
    etaMinute = "etaMinute",
    etaMonth = "etaMonth",
    maximumStaticDraught = "maximumStaticDraught",
    name = "name",
    valid = "valid",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    archivedAt = "archivedAt"
}


registerEnumType(ArchivedShipStaticDataScalarFieldEnum, { name: 'ArchivedShipStaticDataScalarFieldEnum', description: undefined })
