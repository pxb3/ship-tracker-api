import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ShipStaticDataWhereUniqueInput } from './ship-static-data-where-unique.input';
import { Type } from 'class-transformer';
import { ShipStaticDataCreateInput } from './ship-static-data-create.input';
import { ShipStaticDataUpdateInput } from './ship-static-data-update.input';

@ArgsType()
export class UpsertOneShipStaticDataArgs {

    @Field(() => ShipStaticDataWhereUniqueInput, {nullable:false})
    @Type(() => ShipStaticDataWhereUniqueInput)
    where!: Prisma.AtLeast<ShipStaticDataWhereUniqueInput, 'id' | 'shipId'>;

    @Field(() => ShipStaticDataCreateInput, {nullable:false})
    @Type(() => ShipStaticDataCreateInput)
    create!: ShipStaticDataCreateInput;

    @Field(() => ShipStaticDataUpdateInput, {nullable:false})
    @Type(() => ShipStaticDataUpdateInput)
    update!: ShipStaticDataUpdateInput;
}
