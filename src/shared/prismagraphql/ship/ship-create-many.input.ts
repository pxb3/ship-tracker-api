import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class ShipCreateManyInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    mmsi?: string;

    @Field(() => String, {nullable:true})
    shipName?: string;

    @Field(() => Float, {nullable:true})
    latitude?: number;

    @Field(() => Float, {nullable:true})
    longitude?: number;

    @Field(() => Float, {nullable:true})
    rateOfTurn?: number;

    @Field(() => Int, {nullable:true})
    trueHeading?: number;

    @Field(() => Float, {nullable:true})
    cog?: number;

    @Field(() => Float, {nullable:true})
    sog?: number;

    @Field(() => Int, {nullable:true})
    navigationalStatus?: number;

    @Field(() => Date, {nullable:true})
    timestamp?: Date | string;

    @Field(() => Date, {nullable:true})
    lastSeenAt?: Date | string;
}
