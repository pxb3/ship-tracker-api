import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ShipStaticDataOrderByWithRelationInput } from '../ship-static-data/ship-static-data-order-by-with-relation.input';

@InputType()
export class ShipOrderByWithRelationInput {

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

    @Field(() => ShipStaticDataOrderByWithRelationInput, {nullable:true})
    ShipStaticData?: ShipStaticDataOrderByWithRelationInput;
}
