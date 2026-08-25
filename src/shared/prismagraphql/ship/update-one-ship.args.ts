import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipUpdateInput } from './ship-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ShipWhereUniqueInput } from './ship-where-unique.input';

@ArgsType()
export class UpdateOneShipArgs {

    @Field(() => ShipUpdateInput, {nullable:false})
    @Type(() => ShipUpdateInput)
    data!: ShipUpdateInput;

    @Field(() => ShipWhereUniqueInput, {nullable:false})
    @Type(() => ShipWhereUniqueInput)
    where!: Prisma.AtLeast<ShipWhereUniqueInput, 'id'>;
}
