import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipWhereInput } from './ship-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { ShipStaticDataNullableScalarRelationFilter } from '../ship-static-data/ship-static-data-nullable-scalar-relation-filter.input';

@InputType()
export class ShipWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => [ShipWhereInput], {nullable:true})
    AND?: Array<ShipWhereInput>;

    @Field(() => [ShipWhereInput], {nullable:true})
    OR?: Array<ShipWhereInput>;

    @Field(() => [ShipWhereInput], {nullable:true})
    NOT?: Array<ShipWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    mmsi?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    shipName?: StringFilter;

    @Field(() => FloatFilter, {nullable:true})
    latitude?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    longitude?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    rateOfTurn?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    trueHeading?: IntFilter;

    @Field(() => FloatFilter, {nullable:true})
    cog?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    sog?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    navigationalStatus?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    timestamp?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    lastSeenAt?: DateTimeFilter;

    @Field(() => ShipStaticDataNullableScalarRelationFilter, {nullable:true})
    ShipStaticData?: ShipStaticDataNullableScalarRelationFilter;
}
