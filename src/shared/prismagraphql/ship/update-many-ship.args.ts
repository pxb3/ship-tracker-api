import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipUpdateManyMutationInput } from './ship-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ShipWhereInput } from './ship-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyShipArgs {

    @Field(() => ShipUpdateManyMutationInput, {nullable:false})
    @Type(() => ShipUpdateManyMutationInput)
    data!: ShipUpdateManyMutationInput;

    @Field(() => ShipWhereInput, {nullable:true})
    @Type(() => ShipWhereInput)
    where?: ShipWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
