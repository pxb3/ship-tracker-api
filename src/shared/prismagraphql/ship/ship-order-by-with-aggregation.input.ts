import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ShipCountOrderByAggregateInput } from './ship-count-order-by-aggregate.input';
import { ShipAvgOrderByAggregateInput } from './ship-avg-order-by-aggregate.input';
import { ShipMaxOrderByAggregateInput } from './ship-max-order-by-aggregate.input';
import { ShipMinOrderByAggregateInput } from './ship-min-order-by-aggregate.input';
import { ShipSumOrderByAggregateInput } from './ship-sum-order-by-aggregate.input';

@InputType()
export class ShipOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    mmsi?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    shipName?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    latitude?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    longitude?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    rateOfTurn?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    trueHeading?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    cog?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    sog?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    navigationalStatus?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    timestamp?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    lastSeenAt?: `${SortOrder}`;

    @Field(() => ShipCountOrderByAggregateInput, {nullable:true})
    _count?: ShipCountOrderByAggregateInput;

    @Field(() => ShipAvgOrderByAggregateInput, {nullable:true})
    _avg?: ShipAvgOrderByAggregateInput;

    @Field(() => ShipMaxOrderByAggregateInput, {nullable:true})
    _max?: ShipMaxOrderByAggregateInput;

    @Field(() => ShipMinOrderByAggregateInput, {nullable:true})
    _min?: ShipMinOrderByAggregateInput;

    @Field(() => ShipSumOrderByAggregateInput, {nullable:true})
    _sum?: ShipSumOrderByAggregateInput;
}
