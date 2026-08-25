import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ArchivedShipStaticDataCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    archivedShipId!: number;

    @Field(() => Int, {nullable:false})
    callSign!: number;

    @Field(() => Int, {nullable:false})
    destination!: number;

    @Field(() => Int, {nullable:false})
    dimensionA!: number;

    @Field(() => Int, {nullable:false})
    dimensionB!: number;

    @Field(() => Int, {nullable:false})
    dimensionC!: number;

    @Field(() => Int, {nullable:false})
    dimensionD!: number;

    @Field(() => Int, {nullable:false})
    etaDay!: number;

    @Field(() => Int, {nullable:false})
    etaHour!: number;

    @Field(() => Int, {nullable:false})
    etaMinute!: number;

    @Field(() => Int, {nullable:false})
    etaMonth!: number;

    @Field(() => Int, {nullable:false})
    maximumStaticDraught!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @Field(() => Int, {nullable:false})
    valid!: number;

    @Field(() => Int, {nullable:false})
    createdAt!: number;

    @Field(() => Int, {nullable:false})
    updatedAt!: number;

    @Field(() => Int, {nullable:false})
    archivedAt!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
