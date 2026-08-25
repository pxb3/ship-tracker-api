import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ShipStaticDataCountOrderByAggregateInput } from './ship-static-data-count-order-by-aggregate.input';
import { ShipStaticDataAvgOrderByAggregateInput } from './ship-static-data-avg-order-by-aggregate.input';
import { ShipStaticDataMaxOrderByAggregateInput } from './ship-static-data-max-order-by-aggregate.input';
import { ShipStaticDataMinOrderByAggregateInput } from './ship-static-data-min-order-by-aggregate.input';
import { ShipStaticDataSumOrderByAggregateInput } from './ship-static-data-sum-order-by-aggregate.input';

@InputType()
export class ShipStaticDataOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    shipId?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    callSign?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    destination?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    dimensionA?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    dimensionB?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    dimensionC?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    dimensionD?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    etaDay?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    etaHour?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    etaMinute?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    etaMonth?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    maximumStaticDraught?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    valid?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;

    @Field(() => ShipStaticDataCountOrderByAggregateInput, {nullable:true})
    _count?: ShipStaticDataCountOrderByAggregateInput;

    @Field(() => ShipStaticDataAvgOrderByAggregateInput, {nullable:true})
    _avg?: ShipStaticDataAvgOrderByAggregateInput;

    @Field(() => ShipStaticDataMaxOrderByAggregateInput, {nullable:true})
    _max?: ShipStaticDataMaxOrderByAggregateInput;

    @Field(() => ShipStaticDataMinOrderByAggregateInput, {nullable:true})
    _min?: ShipStaticDataMinOrderByAggregateInput;

    @Field(() => ShipStaticDataSumOrderByAggregateInput, {nullable:true})
    _sum?: ShipStaticDataSumOrderByAggregateInput;
}
