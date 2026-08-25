import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ShipStaticDataWhereUniqueInput } from './ship-static-data-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueShipStaticDataOrThrowArgs {

    @Field(() => ShipStaticDataWhereUniqueInput, {nullable:false})
    @Type(() => ShipStaticDataWhereUniqueInput)
    where!: Prisma.AtLeast<ShipStaticDataWhereUniqueInput, 'id' | 'shipId'>;
}
