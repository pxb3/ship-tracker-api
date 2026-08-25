import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ArchivedShipStaticDataAvgAggregate {

    @Field(() => Float, {nullable:true})
    dimensionA?: number;

    @Field(() => Float, {nullable:true})
    dimensionB?: number;

    @Field(() => Float, {nullable:true})
    dimensionC?: number;

    @Field(() => Float, {nullable:true})
    dimensionD?: number;

    @Field(() => Float, {nullable:true})
    etaDay?: number;

    @Field(() => Float, {nullable:true})
    etaHour?: number;

    @Field(() => Float, {nullable:true})
    etaMinute?: number;

    @Field(() => Float, {nullable:true})
    etaMonth?: number;

    @Field(() => Float, {nullable:true})
    maximumStaticDraught?: number;
}
