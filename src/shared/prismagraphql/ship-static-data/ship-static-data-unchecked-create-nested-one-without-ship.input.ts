import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipStaticDataCreateWithoutShipInput } from './ship-static-data-create-without-ship.input';
import { Type } from 'class-transformer';
import { ShipStaticDataCreateOrConnectWithoutShipInput } from './ship-static-data-create-or-connect-without-ship.input';
import { Prisma } from '@prisma/client';
import { ShipStaticDataWhereUniqueInput } from './ship-static-data-where-unique.input';

@InputType()
export class ShipStaticDataUncheckedCreateNestedOneWithoutShipInput {

    @Field(() => ShipStaticDataCreateWithoutShipInput, {nullable:true})
    @Type(() => ShipStaticDataCreateWithoutShipInput)
    create?: ShipStaticDataCreateWithoutShipInput;

    @Field(() => ShipStaticDataCreateOrConnectWithoutShipInput, {nullable:true})
    @Type(() => ShipStaticDataCreateOrConnectWithoutShipInput)
    connectOrCreate?: ShipStaticDataCreateOrConnectWithoutShipInput;

    @Field(() => ShipStaticDataWhereUniqueInput, {nullable:true})
    @Type(() => ShipStaticDataWhereUniqueInput)
    connect?: Prisma.AtLeast<ShipStaticDataWhereUniqueInput, 'id' | 'shipId'>;
}
