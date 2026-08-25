import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipStaticDataUpdateInput } from './ship-static-data-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ShipStaticDataWhereUniqueInput } from './ship-static-data-where-unique.input';

@ArgsType()
export class UpdateOneShipStaticDataArgs {

    @Field(() => ShipStaticDataUpdateInput, {nullable:false})
    @Type(() => ShipStaticDataUpdateInput)
    data!: ShipStaticDataUpdateInput;

    @Field(() => ShipStaticDataWhereUniqueInput, {nullable:false})
    @Type(() => ShipStaticDataWhereUniqueInput)
    where!: Prisma.AtLeast<ShipStaticDataWhereUniqueInput, 'id' | 'shipId'>;
}
