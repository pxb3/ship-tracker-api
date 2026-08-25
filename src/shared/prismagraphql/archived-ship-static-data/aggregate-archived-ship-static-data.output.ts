import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ArchivedShipStaticDataCountAggregate } from './archived-ship-static-data-count-aggregate.output';
import { ArchivedShipStaticDataAvgAggregate } from './archived-ship-static-data-avg-aggregate.output';
import { ArchivedShipStaticDataSumAggregate } from './archived-ship-static-data-sum-aggregate.output';
import { ArchivedShipStaticDataMinAggregate } from './archived-ship-static-data-min-aggregate.output';
import { ArchivedShipStaticDataMaxAggregate } from './archived-ship-static-data-max-aggregate.output';

@ObjectType()
export class AggregateArchivedShipStaticData {

    @Field(() => ArchivedShipStaticDataCountAggregate, {nullable:true})
    _count?: ArchivedShipStaticDataCountAggregate;

    @Field(() => ArchivedShipStaticDataAvgAggregate, {nullable:true})
    _avg?: ArchivedShipStaticDataAvgAggregate;

    @Field(() => ArchivedShipStaticDataSumAggregate, {nullable:true})
    _sum?: ArchivedShipStaticDataSumAggregate;

    @Field(() => ArchivedShipStaticDataMinAggregate, {nullable:true})
    _min?: ArchivedShipStaticDataMinAggregate;

    @Field(() => ArchivedShipStaticDataMaxAggregate, {nullable:true})
    _max?: ArchivedShipStaticDataMaxAggregate;
}
