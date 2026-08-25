import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ArchivedShipStaticDataCountOrderByAggregateInput } from './archived-ship-static-data-count-order-by-aggregate.input';
import { ArchivedShipStaticDataAvgOrderByAggregateInput } from './archived-ship-static-data-avg-order-by-aggregate.input';
import { ArchivedShipStaticDataMaxOrderByAggregateInput } from './archived-ship-static-data-max-order-by-aggregate.input';
import { ArchivedShipStaticDataMinOrderByAggregateInput } from './archived-ship-static-data-min-order-by-aggregate.input';
import { ArchivedShipStaticDataSumOrderByAggregateInput } from './archived-ship-static-data-sum-order-by-aggregate.input';

@InputType()
export class ArchivedShipStaticDataOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    archivedShipId?: `${SortOrder}`;

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

    @Field(() => SortOrder, {nullable:true})
    archivedAt?: `${SortOrder}`;

    @Field(() => ArchivedShipStaticDataCountOrderByAggregateInput, {nullable:true})
    _count?: ArchivedShipStaticDataCountOrderByAggregateInput;

    @Field(() => ArchivedShipStaticDataAvgOrderByAggregateInput, {nullable:true})
    _avg?: ArchivedShipStaticDataAvgOrderByAggregateInput;

    @Field(() => ArchivedShipStaticDataMaxOrderByAggregateInput, {nullable:true})
    _max?: ArchivedShipStaticDataMaxOrderByAggregateInput;

    @Field(() => ArchivedShipStaticDataMinOrderByAggregateInput, {nullable:true})
    _min?: ArchivedShipStaticDataMinOrderByAggregateInput;

    @Field(() => ArchivedShipStaticDataSumOrderByAggregateInput, {nullable:true})
    _sum?: ArchivedShipStaticDataSumOrderByAggregateInput;
}
