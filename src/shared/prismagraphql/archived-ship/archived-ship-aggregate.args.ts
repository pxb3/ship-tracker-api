import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipWhereInput } from './archived-ship-where.input';
import { Type } from 'class-transformer';
import { ArchivedShipOrderByWithRelationInput } from './archived-ship-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ArchivedShipWhereUniqueInput } from './archived-ship-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ArchivedShipCountAggregateInput } from './archived-ship-count-aggregate.input';
import { ArchivedShipAvgAggregateInput } from './archived-ship-avg-aggregate.input';
import { ArchivedShipSumAggregateInput } from './archived-ship-sum-aggregate.input';
import { ArchivedShipMinAggregateInput } from './archived-ship-min-aggregate.input';
import { ArchivedShipMaxAggregateInput } from './archived-ship-max-aggregate.input';

@ArgsType()
export class ArchivedShipAggregateArgs {

    @Field(() => ArchivedShipWhereInput, {nullable:true})
    @Type(() => ArchivedShipWhereInput)
    where?: ArchivedShipWhereInput;

    @Field(() => [ArchivedShipOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ArchivedShipOrderByWithRelationInput>;

    @Field(() => ArchivedShipWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ArchivedShipWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ArchivedShipCountAggregateInput, {nullable:true})
    _count?: ArchivedShipCountAggregateInput;

    @Field(() => ArchivedShipAvgAggregateInput, {nullable:true})
    _avg?: ArchivedShipAvgAggregateInput;

    @Field(() => ArchivedShipSumAggregateInput, {nullable:true})
    _sum?: ArchivedShipSumAggregateInput;

    @Field(() => ArchivedShipMinAggregateInput, {nullable:true})
    _min?: ArchivedShipMinAggregateInput;

    @Field(() => ArchivedShipMaxAggregateInput, {nullable:true})
    _max?: ArchivedShipMaxAggregateInput;
}
