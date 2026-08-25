import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ArchivedShipAvgAggregate {

    @Field(() => Float, {nullable:true})
    latitude?: number;

    @Field(() => Float, {nullable:true})
    longitude?: number;

    @Field(() => Float, {nullable:true})
    rateOfTurn?: number;

    @Field(() => Float, {nullable:true})
    trueHeading?: number;

    @Field(() => Float, {nullable:true})
    cog?: number;

    @Field(() => Float, {nullable:true})
    sog?: number;

    @Field(() => Float, {nullable:true})
    navigationalStatus?: number;
}
