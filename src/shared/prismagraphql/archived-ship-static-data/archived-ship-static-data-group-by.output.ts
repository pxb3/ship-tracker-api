import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { ArchivedShipStaticDataCountAggregate } from './archived-ship-static-data-count-aggregate.output';
import { ArchivedShipStaticDataAvgAggregate } from './archived-ship-static-data-avg-aggregate.output';
import { ArchivedShipStaticDataSumAggregate } from './archived-ship-static-data-sum-aggregate.output';
import { ArchivedShipStaticDataMinAggregate } from './archived-ship-static-data-min-aggregate.output';
import { ArchivedShipStaticDataMaxAggregate } from './archived-ship-static-data-max-aggregate.output';

@ObjectType()
export class ArchivedShipStaticDataGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    archivedShipId!: string;

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

    @Field(() => Date, {nullable:false})
    archivedAt!: Date | string;

    @Field(() => ArchivedShipStaticDataCountAggregate, {nullable:true})
    _count?: ArchivedShipStaticDataCountAggregate;

    @Field(() => ArchivedShipStaticDataAvgAggregate, {nullable:true})
    _avg?: ArchivedShipStaticDataAvgAggregate;

    @Field(() => ArchivedShipStaticDataSumAggregate, {nullable:true})
    _sum?: ArchivedShipStaticDataSumAggregate;

    @Field(() => ArchivedShipStaticDataMinAggregate, {nullable:true})
    _min?: ArchivedShipStaticDataMinAggregate;

    @Field(() => ArchivedShipStaticDataMaxAggregate, {nullable:true})
    _max?: ArchivedShipStaticDataMaxAggregate;
}
