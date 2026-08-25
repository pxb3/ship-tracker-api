import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipStaticDataWhereInput } from './archived-ship-static-data-where.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataOrderByWithAggregationInput } from './archived-ship-static-data-order-by-with-aggregation.input';
import { ArchivedShipStaticDataScalarFieldEnum } from './archived-ship-static-data-scalar-field.enum';
import { ArchivedShipStaticDataScalarWhereWithAggregatesInput } from './archived-ship-static-data-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ArchivedShipStaticDataCountAggregateInput } from './archived-ship-static-data-count-aggregate.input';
import { ArchivedShipStaticDataAvgAggregateInput } from './archived-ship-static-data-avg-aggregate.input';
import { ArchivedShipStaticDataSumAggregateInput } from './archived-ship-static-data-sum-aggregate.input';
import { ArchivedShipStaticDataMinAggregateInput } from './archived-ship-static-data-min-aggregate.input';
import { ArchivedShipStaticDataMaxAggregateInput } from './archived-ship-static-data-max-aggregate.input';

@ArgsType()
export class ArchivedShipStaticDataGroupByArgs {

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereInput)
    where?: ArchivedShipStaticDataWhereInput;

    @Field(() => [ArchivedShipStaticDataOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ArchivedShipStaticDataOrderByWithAggregationInput>;

    @Field(() => [ArchivedShipStaticDataScalarFieldEnum], {nullable:false})
    by!: Array<`${ArchivedShipStaticDataScalarFieldEnum}`>;

    @Field(() => ArchivedShipStaticDataScalarWhereWithAggregatesInput, {nullable:true})
    having?: ArchivedShipStaticDataScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ArchivedShipStaticDataCountAggregateInput, {nullable:true})
    _count?: ArchivedShipStaticDataCountAggregateInput;

    @Field(() => ArchivedShipStaticDataAvgAggregateInput, {nullable:true})
    _avg?: ArchivedShipStaticDataAvgAggregateInput;

    @Field(() => ArchivedShipStaticDataSumAggregateInput, {nullable:true})
    _sum?: ArchivedShipStaticDataSumAggregateInput;

    @Field(() => ArchivedShipStaticDataMinAggregateInput, {nullable:true})
    _min?: ArchivedShipStaticDataMinAggregateInput;

    @Field(() => ArchivedShipStaticDataMaxAggregateInput, {nullable:true})
    _max?: ArchivedShipStaticDataMaxAggregateInput;
}
