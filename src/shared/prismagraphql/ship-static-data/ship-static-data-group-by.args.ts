import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipStaticDataWhereInput } from './ship-static-data-where.input';
import { Type } from 'class-transformer';
import { ShipStaticDataOrderByWithAggregationInput } from './ship-static-data-order-by-with-aggregation.input';
import { ShipStaticDataScalarFieldEnum } from './ship-static-data-scalar-field.enum';
import { ShipStaticDataScalarWhereWithAggregatesInput } from './ship-static-data-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ShipStaticDataCountAggregateInput } from './ship-static-data-count-aggregate.input';
import { ShipStaticDataAvgAggregateInput } from './ship-static-data-avg-aggregate.input';
import { ShipStaticDataSumAggregateInput } from './ship-static-data-sum-aggregate.input';
import { ShipStaticDataMinAggregateInput } from './ship-static-data-min-aggregate.input';
import { ShipStaticDataMaxAggregateInput } from './ship-static-data-max-aggregate.input';

@ArgsType()
export class ShipStaticDataGroupByArgs {

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    @Type(() => ShipStaticDataWhereInput)
    where?: ShipStaticDataWhereInput;

    @Field(() => [ShipStaticDataOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ShipStaticDataOrderByWithAggregationInput>;

    @Field(() => [ShipStaticDataScalarFieldEnum], {nullable:false})
    by!: Array<`${ShipStaticDataScalarFieldEnum}`>;

    @Field(() => ShipStaticDataScalarWhereWithAggregatesInput, {nullable:true})
    having?: ShipStaticDataScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ShipStaticDataCountAggregateInput, {nullable:true})
    _count?: ShipStaticDataCountAggregateInput;

    @Field(() => ShipStaticDataAvgAggregateInput, {nullable:true})
    _avg?: ShipStaticDataAvgAggregateInput;

    @Field(() => ShipStaticDataSumAggregateInput, {nullable:true})
    _sum?: ShipStaticDataSumAggregateInput;

    @Field(() => ShipStaticDataMinAggregateInput, {nullable:true})
    _min?: ShipStaticDataMinAggregateInput;

    @Field(() => ShipStaticDataMaxAggregateInput, {nullable:true})
    _max?: ShipStaticDataMaxAggregateInput;
}
