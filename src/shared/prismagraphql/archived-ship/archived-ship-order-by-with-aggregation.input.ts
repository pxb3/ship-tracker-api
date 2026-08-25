import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ArchivedShipCountOrderByAggregateInput } from './archived-ship-count-order-by-aggregate.input';
import { ArchivedShipAvgOrderByAggregateInput } from './archived-ship-avg-order-by-aggregate.input';
import { ArchivedShipMaxOrderByAggregateInput } from './archived-ship-max-order-by-aggregate.input';
import { ArchivedShipMinOrderByAggregateInput } from './archived-ship-min-order-by-aggregate.input';
import { ArchivedShipSumOrderByAggregateInput } from './archived-ship-sum-order-by-aggregate.input';

@InputType()
export class ArchivedShipOrderByWithAggregationInput {

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

    @Field(() => SortOrder, {nullable:true})
    archivedAt?: `${SortOrder}`;

    @Field(() => ArchivedShipCountOrderByAggregateInput, {nullable:true})
    _count?: ArchivedShipCountOrderByAggregateInput;

    @Field(() => ArchivedShipAvgOrderByAggregateInput, {nullable:true})
    _avg?: ArchivedShipAvgOrderByAggregateInput;

    @Field(() => ArchivedShipMaxOrderByAggregateInput, {nullable:true})
    _max?: ArchivedShipMaxOrderByAggregateInput;

    @Field(() => ArchivedShipMinOrderByAggregateInput, {nullable:true})
    _min?: ArchivedShipMinOrderByAggregateInput;

    @Field(() => ArchivedShipSumOrderByAggregateInput, {nullable:true})
    _sum?: ArchivedShipSumOrderByAggregateInput;
}
