import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipStaticDataUpdateManyMutationInput } from './ship-static-data-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ShipStaticDataWhereInput } from './ship-static-data-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyShipStaticDataArgs {

    @Field(() => ShipStaticDataUpdateManyMutationInput, {nullable:false})
    @Type(() => ShipStaticDataUpdateManyMutationInput)
    data!: ShipStaticDataUpdateManyMutationInput;

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    @Type(() => ShipStaticDataWhereInput)
    where?: ShipStaticDataWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
