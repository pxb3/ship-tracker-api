import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ShipStaticDataMinOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    shipId?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    callSign?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    destination?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    dimensionA?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    dimensionB?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    dimensionC?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    dimensionD?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    etaDay?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    etaHour?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    etaMinute?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    etaMonth?: `${SortOrder}`;

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
}
