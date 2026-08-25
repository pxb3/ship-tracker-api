import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ShipSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    latitude?: true;

    @Field(() => Boolean, {nullable:true})
    longitude?: true;

    @Field(() => Boolean, {nullable:true})
    rateOfTurn?: true;

    @Field(() => Boolean, {nullable:true})
    trueHeading?: true;

    @Field(() => Boolean, {nullable:true})
    cog?: true;

    @Field(() => Boolean, {nullable:true})
    sog?: true;

    @Field(() => Boolean, {nullable:true})
    navigationalStatus?: true;
}
