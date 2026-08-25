import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ShipStaticDataWhereUniqueInput } from './ship-static-data-where-unique.input';
import { Type } from 'class-transformer';
import { ShipStaticDataCreateWithoutShipInput } from './ship-static-data-create-without-ship.input';

@InputType()
export class ShipStaticDataCreateOrConnectWithoutShipInput {

    @Field(() => ShipStaticDataWhereUniqueInput, {nullable:false})
    @Type(() => ShipStaticDataWhereUniqueInput)
    where!: Prisma.AtLeast<ShipStaticDataWhereUniqueInput, 'id' | 'shipId'>;

    @Field(() => ShipStaticDataCreateWithoutShipInput, {nullable:false})
    @Type(() => ShipStaticDataCreateWithoutShipInput)
    create!: ShipStaticDataCreateWithoutShipInput;
}
