import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipStaticDataCreateWithoutShipInput } from './ship-static-data-create-without-ship.input';
import { Type } from 'class-transformer';
import { ShipStaticDataCreateOrConnectWithoutShipInput } from './ship-static-data-create-or-connect-without-ship.input';
import { ShipStaticDataUpsertWithoutShipInput } from './ship-static-data-upsert-without-ship.input';
import { ShipStaticDataWhereInput } from './ship-static-data-where.input';
import { Prisma } from '@prisma/client';
import { ShipStaticDataWhereUniqueInput } from './ship-static-data-where-unique.input';
import { ShipStaticDataUpdateToOneWithWhereWithoutShipInput } from './ship-static-data-update-to-one-with-where-without-ship.input';

@InputType()
export class ShipStaticDataUpdateOneWithoutShipNestedInput {

    @Field(() => ShipStaticDataCreateWithoutShipInput, {nullable:true})
    @Type(() => ShipStaticDataCreateWithoutShipInput)
    create?: ShipStaticDataCreateWithoutShipInput;

    @Field(() => ShipStaticDataCreateOrConnectWithoutShipInput, {nullable:true})
    @Type(() => ShipStaticDataCreateOrConnectWithoutShipInput)
    connectOrCreate?: ShipStaticDataCreateOrConnectWithoutShipInput;

    @Field(() => ShipStaticDataUpsertWithoutShipInput, {nullable:true})
    @Type(() => ShipStaticDataUpsertWithoutShipInput)
    upsert?: ShipStaticDataUpsertWithoutShipInput;

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    @Type(() => ShipStaticDataWhereInput)
    disconnect?: ShipStaticDataWhereInput;

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    @Type(() => ShipStaticDataWhereInput)
    delete?: ShipStaticDataWhereInput;

    @Field(() => ShipStaticDataWhereUniqueInput, {nullable:true})
    @Type(() => ShipStaticDataWhereUniqueInput)
    connect?: Prisma.AtLeast<ShipStaticDataWhereUniqueInput, 'id' | 'shipId'>;

    @Field(() => ShipStaticDataUpdateToOneWithWhereWithoutShipInput, {nullable:true})
    @Type(() => ShipStaticDataUpdateToOneWithWhereWithoutShipInput)
    update?: ShipStaticDataUpdateToOneWithWhereWithoutShipInput;
}
