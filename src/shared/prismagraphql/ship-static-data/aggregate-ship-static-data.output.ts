import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ShipStaticDataCountAggregate } from './ship-static-data-count-aggregate.output';
import { ShipStaticDataAvgAggregate } from './ship-static-data-avg-aggregate.output';
import { ShipStaticDataSumAggregate } from './ship-static-data-sum-aggregate.output';
import { ShipStaticDataMinAggregate } from './ship-static-data-min-aggregate.output';
import { ShipStaticDataMaxAggregate } from './ship-static-data-max-aggregate.output';

@ObjectType()
export class AggregateShipStaticData {

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
