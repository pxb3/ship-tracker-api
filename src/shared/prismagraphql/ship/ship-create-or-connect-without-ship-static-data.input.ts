import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ShipWhereUniqueInput } from './ship-where-unique.input';
import { Type } from 'class-transformer';
import { ShipCreateWithoutShipStaticDataInput } from './ship-create-without-ship-static-data.input';

@InputType()
export class ShipCreateOrConnectWithoutShipStaticDataInput {

    @Field(() => ShipWhereUniqueInput, {nullable:false})
    @Type(() => ShipWhereUniqueInput)
    where!: Prisma.AtLeast<ShipWhereUniqueInput, 'id'>;

    @Field(() => ShipCreateWithoutShipStaticDataInput, {nullable:false})
    @Type(() => ShipCreateWithoutShipStaticDataInput)
    create!: ShipCreateWithoutShipStaticDataInput;
}
