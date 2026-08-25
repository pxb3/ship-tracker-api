import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipStaticDataWhereInput } from './ship-static-data-where.input';
import { Type } from 'class-transformer';
import { ShipStaticDataUpdateWithoutShipInput } from './ship-static-data-update-without-ship.input';

@InputType()
export class ShipStaticDataUpdateToOneWithWhereWithoutShipInput {

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    @Type(() => ShipStaticDataWhereInput)
    where?: ShipStaticDataWhereInput;

    @Field(() => ShipStaticDataUpdateWithoutShipInput, {nullable:false})
    @Type(() => ShipStaticDataUpdateWithoutShipInput)
    data!: ShipStaticDataUpdateWithoutShipInput;
}
