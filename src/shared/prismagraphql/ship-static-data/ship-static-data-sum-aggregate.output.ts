import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ShipStaticDataSumAggregate {

    @Field(() => Int, {nullable:true})
    dimensionA?: number;

    @Field(() => Int, {nullable:true})
    dimensionB?: number;

    @Field(() => Int, {nullable:true})
    dimensionC?: number;

    @Field(() => Int, {nullable:true})
    dimensionD?: number;

    @Field(() => Int, {nullable:true})
    etaDay?: number;

    @Field(() => Int, {nullable:true})
    etaHour?: number;

    @Field(() => Int, {nullable:true})
    etaMinute?: number;

    @Field(() => Int, {nullable:true})
    etaMonth?: number;

    @Field(() => Float, {nullable:true})
    maximumStaticDraught?: number;
}
