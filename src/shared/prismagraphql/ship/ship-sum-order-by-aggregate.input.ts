import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ShipSumOrderByAggregateInput {

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
}
