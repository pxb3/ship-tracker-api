import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ArchivedShipMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    mmsi?: true;

    @Field(() => Boolean, {nullable:true})
    shipName?: true;

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

    @Field(() => Boolean, {nullable:true})
    timestamp?: true;

    @Field(() => Boolean, {nullable:true})
    lastSeenAt?: true;

    @Field(() => Boolean, {nullable:true})
    archivedAt?: true;
}
