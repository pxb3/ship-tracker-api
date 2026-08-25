import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ShipCountAggregate } from './ship-count-aggregate.output';
import { ShipAvgAggregate } from './ship-avg-aggregate.output';
import { ShipSumAggregate } from './ship-sum-aggregate.output';
import { ShipMinAggregate } from './ship-min-aggregate.output';
import { ShipMaxAggregate } from './ship-max-aggregate.output';

@ObjectType()
export class ShipGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    mmsi?: string;

    @Field(() => String, {nullable:false})
    shipName!: string;

    @Field(() => Float, {nullable:false})
    latitude!: number;

    @Field(() => Float, {nullable:false})
    longitude!: number;

    @Field(() => Float, {nullable:false})
    rateOfTurn!: number;

    @Field(() => Int, {nullable:false})
    trueHeading!: number;

    @Field(() => Float, {nullable:false})
    cog!: number;

    @Field(() => Float, {nullable:false})
    sog!: number;

    @Field(() => Int, {nullable:false})
    navigationalStatus!: number;

    @Field(() => Date, {nullable:false})
    timestamp!: Date | string;

    @Field(() => Date, {nullable:false})
    lastSeenAt!: Date | string;

    @Field(() => ShipCountAggregate, {nullable:true})
    _count?: ShipCountAggregate;

    @Field(() => ShipAvgAggregate, {nullable:true})
    _avg?: ShipAvgAggregate;

    @Field(() => ShipSumAggregate, {nullable:true})
    _sum?: ShipSumAggregate;

    @Field(() => ShipMinAggregate, {nullable:true})
    _min?: ShipMinAggregate;

    @Field(() => ShipMaxAggregate, {nullable:true})
    _max?: ShipMaxAggregate;
}
