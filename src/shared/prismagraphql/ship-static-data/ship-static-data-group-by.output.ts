import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { ShipStaticDataCountAggregate } from './ship-static-data-count-aggregate.output';
import { ShipStaticDataAvgAggregate } from './ship-static-data-avg-aggregate.output';
import { ShipStaticDataSumAggregate } from './ship-static-data-sum-aggregate.output';
import { ShipStaticDataMinAggregate } from './ship-static-data-min-aggregate.output';
import { ShipStaticDataMaxAggregate } from './ship-static-data-max-aggregate.output';

@ObjectType()
export class ShipStaticDataGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    shipId!: string;

    @Field(() => String, {nullable:true})
    callSign?: string;

    @Field(() => String, {nullable:true})
    destination?: string;

    @Field(() => Int, {nullable:false})
    dimensionA!: number;

    @Field(() => Int, {nullable:false})
    dimensionB!: number;

    @Field(() => Int, {nullable:false})
    dimensionC!: number;

    @Field(() => Int, {nullable:false})
    dimensionD!: number;

    @Field(() => Int, {nullable:true})
    etaDay?: number;

    @Field(() => Int, {nullable:true})
    etaHour?: number;

    @Field(() => Int, {nullable:true})
    etaMinute?: number;

    @Field(() => Int, {nullable:true})
    etaMonth?: number;

    @Field(() => Float, {nullable:false})
    maximumStaticDraught!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Boolean, {nullable:false})
    valid!: boolean;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => ShipStaticDataCountAggregate, {nullable:true})
    _count?: ShipStaticDataCountAggregate;

    @Field(() => ShipStaticDataAvgAggregate, {nullable:true})
    _avg?: ShipStaticDataAvgAggregate;

    @Field(() => ShipStaticDataSumAggregate, {nullable:true})
    _sum?: ShipStaticDataSumAggregate;

    @Field(() => ShipStaticDataMinAggregate, {nullable:true})
    _min?: ShipStaticDataMinAggregate;

    @Field(() => ShipStaticDataMaxAggregate, {nullable:true})
    _max?: ShipStaticDataMaxAggregate;
}
