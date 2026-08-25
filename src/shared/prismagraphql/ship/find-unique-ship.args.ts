import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ShipWhereUniqueInput } from './ship-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueShipArgs {

    @Field(() => ShipWhereUniqueInput, {nullable:false})
    @Type(() => ShipWhereUniqueInput)
    where!: Prisma.AtLeast<ShipWhereUniqueInput, 'id'>;
}
