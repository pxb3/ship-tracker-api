import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ArchivedShipCountAggregate } from './archived-ship-count-aggregate.output';
import { ArchivedShipAvgAggregate } from './archived-ship-avg-aggregate.output';
import { ArchivedShipSumAggregate } from './archived-ship-sum-aggregate.output';
import { ArchivedShipMinAggregate } from './archived-ship-min-aggregate.output';
import { ArchivedShipMaxAggregate } from './archived-ship-max-aggregate.output';

@ObjectType()
export class ArchivedShipGroupBy {

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

    @Field(() => Date, {nullable:false})
    archivedAt!: Date | string;

    @Field(() => ArchivedShipCountAggregate, {nullable:true})
    _count?: ArchivedShipCountAggregate;

    @Field(() => ArchivedShipAvgAggregate, {nullable:true})
    _avg?: ArchivedShipAvgAggregate;

    @Field(() => ArchivedShipSumAggregate, {nullable:true})
    _sum?: ArchivedShipSumAggregate;

    @Field(() => ArchivedShipMinAggregate, {nullable:true})
    _min?: ArchivedShipMinAggregate;

    @Field(() => ArchivedShipMaxAggregate, {nullable:true})
    _max?: ArchivedShipMaxAggregate;
}
