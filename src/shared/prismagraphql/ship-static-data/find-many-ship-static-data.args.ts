import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipStaticDataWhereInput } from './ship-static-data-where.input';
import { Type } from 'class-transformer';
import { ShipStaticDataOrderByWithRelationInput } from './ship-static-data-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ShipStaticDataWhereUniqueInput } from './ship-static-data-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ShipStaticDataScalarFieldEnum } from './ship-static-data-scalar-field.enum';

@ArgsType()
export class FindManyShipStaticDataArgs {

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    @Type(() => ShipStaticDataWhereInput)
    where?: ShipStaticDataWhereInput;

    @Field(() => [ShipStaticDataOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ShipStaticDataOrderByWithRelationInput>;

    @Field(() => ShipStaticDataWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ShipStaticDataWhereUniqueInput, 'id' | 'shipId'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ShipStaticDataScalarFieldEnum], {nullable:true})
    distinct?: Array<`${ShipStaticDataScalarFieldEnum}`>;
}
