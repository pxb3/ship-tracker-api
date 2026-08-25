import { registerEnumType } from '@nestjs/graphql';

export enum ShipStaticDataScalarFieldEnum {
    id = "id",
    shipId = "shipId",
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
    updatedAt = "updatedAt"
}


registerEnumType(ShipStaticDataScalarFieldEnum, { name: 'ShipStaticDataScalarFieldEnum', description: undefined })
