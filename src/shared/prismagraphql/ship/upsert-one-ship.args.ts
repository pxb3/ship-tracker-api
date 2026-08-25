import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ShipWhereUniqueInput } from './ship-where-unique.input';
import { Type } from 'class-transformer';
import { ShipCreateInput } from './ship-create.input';
import { ShipUpdateInput } from './ship-update.input';

@ArgsType()
export class UpsertOneShipArgs {

    @Field(() => ShipWhereUniqueInput, {nullable:false})
    @Type(() => ShipWhereUniqueInput)
    where!: Prisma.AtLeast<ShipWhereUniqueInput, 'id'>;

    @Field(() => ShipCreateInput, {nullable:false})
    @Type(() => ShipCreateInput)
    create!: ShipCreateInput;

    @Field(() => ShipUpdateInput, {nullable:false})
    @Type(() => ShipUpdateInput)
    update!: ShipUpdateInput;
}
