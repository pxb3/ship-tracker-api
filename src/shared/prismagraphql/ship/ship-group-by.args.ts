import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipWhereInput } from './ship-where.input';
import { Type } from 'class-transformer';
import { ShipOrderByWithAggregationInput } from './ship-order-by-with-aggregation.input';
import { ShipScalarFieldEnum } from './ship-scalar-field.enum';
import { ShipScalarWhereWithAggregatesInput } from './ship-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ShipCountAggregateInput } from './ship-count-aggregate.input';
import { ShipAvgAggregateInput } from './ship-avg-aggregate.input';
import { ShipSumAggregateInput } from './ship-sum-aggregate.input';
import { ShipMinAggregateInput } from './ship-min-aggregate.input';
import { ShipMaxAggregateInput } from './ship-max-aggregate.input';

@ArgsType()
export class ShipGroupByArgs {

    @Field(() => ShipWhereInput, {nullable:true})
    @Type(() => ShipWhereInput)
    where?: ShipWhereInput;

    @Field(() => [ShipOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ShipOrderByWithAggregationInput>;

    @Field(() => [ShipScalarFieldEnum], {nullable:false})
    by!: Array<`${ShipScalarFieldEnum}`>;

    @Field(() => ShipScalarWhereWithAggregatesInput, {nullable:true})
    having?: ShipScalarWhereWithAggregatesInput;

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
