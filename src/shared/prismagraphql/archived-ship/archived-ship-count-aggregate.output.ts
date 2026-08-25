import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ArchivedShipCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    mmsi!: number;

    @Field(() => Int, {nullable:false})
    shipName!: number;

    @Field(() => Int, {nullable:false})
    latitude!: number;

    @Field(() => Int, {nullable:false})
    longitude!: number;

    @Field(() => Int, {nullable:false})
    rateOfTurn!: number;

    @Field(() => Int, {nullable:false})
    trueHeading!: number;

    @Field(() => Int, {nullable:false})
    cog!: number;

    @Field(() => Int, {nullable:false})
    sog!: number;

    @Field(() => Int, {nullable:false})
    navigationalStatus!: number;

    @Field(() => Int, {nullable:false})
    timestamp!: number;

    @Field(() => Int, {nullable:false})
    lastSeenAt!: number;

    @Field(() => Int, {nullable:false})
    archivedAt!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
