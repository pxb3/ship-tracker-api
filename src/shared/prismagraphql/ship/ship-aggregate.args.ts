import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipWhereInput } from './ship-where.input';
import { Type } from 'class-transformer';
import { ShipOrderByWithRelationInput } from './ship-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ShipWhereUniqueInput } from './ship-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ShipCountAggregateInput } from './ship-count-aggregate.input';
import { ShipAvgAggregateInput } from './ship-avg-aggregate.input';
import { ShipSumAggregateInput } from './ship-sum-aggregate.input';
import { ShipMinAggregateInput } from './ship-min-aggregate.input';
import { ShipMaxAggregateInput } from './ship-max-aggregate.input';

@ArgsType()
export class ShipAggregateArgs {

    @Field(() => ShipWhereInput, {nullable:true})
    @Type(() => ShipWhereInput)
    where?: ShipWhereInput;

    @Field(() => [ShipOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ShipOrderByWithRelationInput>;

    @Field(() => ShipWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ShipWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ShipCountAggregateInput, {nullable:true})
    _count?: ShipCountAggregateInput;

    @Field(() => ShipAvgAggregateInput, {nullable:true})
    _avg?: ShipAvgAggregateInput;

    @Field(() => ShipSumAggregateInput, {nullable:true})
    _sum?: ShipSumAggregateInput;

    @Field(() => ShipMinAggregateInput, {nullable:true})
    _min?: ShipMinAggregateInput;

    @Field(() => ShipMaxAggregateInput, {nullable:true})
    _max?: ShipMaxAggregateInput;
}
