import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ArchivedShipStaticDataOrderByWithRelationInput } from '../archived-ship-static-data/archived-ship-static-data-order-by-with-relation.input';

@InputType()
export class ArchivedShipOrderByWithRelationInput {

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

    @Field(() => ArchivedShipStaticDataOrderByWithRelationInput, {nullable:true})
    ArchivedShipStaticData?: ArchivedShipStaticDataOrderByWithRelationInput;
}
