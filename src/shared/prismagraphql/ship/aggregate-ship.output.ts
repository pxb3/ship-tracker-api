import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ShipCountAggregate } from './ship-count-aggregate.output';
import { ShipAvgAggregate } from './ship-avg-aggregate.output';
import { ShipSumAggregate } from './ship-sum-aggregate.output';
import { ShipMinAggregate } from './ship-min-aggregate.output';
import { ShipMaxAggregate } from './ship-max-aggregate.output';

@ObjectType()
export class AggregateShip {

    @Field(() => ShipCountAggregate, {nullable:true})
    _count?: ShipCountAggregate;

    @Field(() => ShipAvgAggregate, {nullable:true})
    _avg?: ShipAvgAggregate;

    @Field(() => ShipSumAggregate, {nullable:true})
    _sum?: ShipSumAggregate;

    @Field(() => ShipMinAggregate, {nullable:true})
    _min?: ShipMinAggregate;

    @Field(() => ShipMaxAggregate, {nullable:true})
    _max?: ShipMaxAggregate;
}
