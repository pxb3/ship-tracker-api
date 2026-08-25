import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipWhereInput } from './ship-where.input';
import { Type } from 'class-transformer';
import { ShipUpdateWithoutShipStaticDataInput } from './ship-update-without-ship-static-data.input';

@InputType()
export class ShipUpdateToOneWithWhereWithoutShipStaticDataInput {

    @Field(() => ShipWhereInput, {nullable:true})
    @Type(() => ShipWhereInput)
    where?: ShipWhereInput;

    @Field(() => ShipUpdateWithoutShipStaticDataInput, {nullable:false})
    @Type(() => ShipUpdateWithoutShipStaticDataInput)
    data!: ShipUpdateWithoutShipStaticDataInput;
}
