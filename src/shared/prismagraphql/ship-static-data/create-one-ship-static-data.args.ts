import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipStaticDataCreateInput } from './ship-static-data-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneShipStaticDataArgs {

    @Field(() => ShipStaticDataCreateInput, {nullable:false})
    @Type(() => ShipStaticDataCreateInput)
    data!: ShipStaticDataCreateInput;
}
