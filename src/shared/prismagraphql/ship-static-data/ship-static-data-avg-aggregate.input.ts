import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ShipStaticDataAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    dimensionA?: true;

    @Field(() => Boolean, {nullable:true})
    dimensionB?: true;

    @Field(() => Boolean, {nullable:true})
    dimensionC?: true;

    @Field(() => Boolean, {nullable:true})
    dimensionD?: true;

    @Field(() => Boolean, {nullable:true})
    etaDay?: true;

    @Field(() => Boolean, {nullable:true})
    etaHour?: true;

    @Field(() => Boolean, {nullable:true})
    etaMinute?: true;

    @Field(() => Boolean, {nullable:true})
    etaMonth?: true;

    @Field(() => Boolean, {nullable:true})
    maximumStaticDraught?: true;
}
