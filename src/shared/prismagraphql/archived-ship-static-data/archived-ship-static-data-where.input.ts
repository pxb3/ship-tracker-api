import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { ArchivedShipScalarRelationFilter } from '../archived-ship/archived-ship-scalar-relation-filter.input';

@InputType()
export class ArchivedShipStaticDataWhereInput {

    @Field(() => [ArchivedShipStaticDataWhereInput], {nullable:true})
    AND?: Array<ArchivedShipStaticDataWhereInput>;

    @Field(() => [ArchivedShipStaticDataWhereInput], {nullable:true})
    OR?: Array<ArchivedShipStaticDataWhereInput>;

    @Field(() => [ArchivedShipStaticDataWhereInput], {nullable:true})
    NOT?: Array<ArchivedShipStaticDataWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    archivedShipId?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    callSign?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    destination?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    dimensionA?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    dimensionB?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    dimensionC?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    dimensionD?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    etaDay?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    etaHour?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    etaMinute?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    etaMonth?: IntNullableFilter;

    @Field(() => FloatFilter, {nullable:true})
    maximumStaticDraught?: FloatFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => BoolFilter, {nullable:true})
    valid?: BoolFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    archivedAt?: DateTimeFilter;

    @Field(() => ArchivedShipScalarRelationFilter, {nullable:true})
    archivedShip?: ArchivedShipScalarRelationFilter;
}
