import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ArchivedShipOrderByWithRelationInput } from '../archived-ship/archived-ship-order-by-with-relation.input';

@InputType()
export class ArchivedShipStaticDataOrderByWithRelationInput {

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

    @Field(() => ArchivedShipOrderByWithRelationInput, {nullable:true})
    archivedShip?: ArchivedShipOrderByWithRelationInput;
}
