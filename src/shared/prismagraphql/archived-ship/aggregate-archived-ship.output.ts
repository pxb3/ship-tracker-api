import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ArchivedShipCountAggregate } from './archived-ship-count-aggregate.output';
import { ArchivedShipAvgAggregate } from './archived-ship-avg-aggregate.output';
import { ArchivedShipSumAggregate } from './archived-ship-sum-aggregate.output';
import { ArchivedShipMinAggregate } from './archived-ship-min-aggregate.output';
import { ArchivedShipMaxAggregate } from './archived-ship-max-aggregate.output';

@ObjectType()
export class AggregateArchivedShip {

    @Field(() => ArchivedShipCountAggregate, {nullable:true})
    _count?: ArchivedShipCountAggregate;

    @Field(() => ArchivedShipAvgAggregate, {nullable:true})
    _avg?: ArchivedShipAvgAggregate;

    @Field(() => ArchivedShipSumAggregate, {nullable:true})
    _sum?: ArchivedShipSumAggregate;

    @Field(() => ArchivedShipMinAggregate, {nullable:true})
    _min?: ArchivedShipMinAggregate;

    @Field(() => ArchivedShipMaxAggregate, {nullable:true})
    _max?: ArchivedShipMaxAggregate;
}
