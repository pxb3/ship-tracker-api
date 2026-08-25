import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipCreateInput } from './ship-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneShipArgs {

    @Field(() => ShipCreateInput, {nullable:false})
    @Type(() => ShipCreateInput)
    data!: ShipCreateInput;
}
