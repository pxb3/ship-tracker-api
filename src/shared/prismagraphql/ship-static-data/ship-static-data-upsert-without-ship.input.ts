import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipStaticDataUpdateWithoutShipInput } from './ship-static-data-update-without-ship.input';
import { Type } from 'class-transformer';
import { ShipStaticDataCreateWithoutShipInput } from './ship-static-data-create-without-ship.input';
import { ShipStaticDataWhereInput } from './ship-static-data-where.input';

@InputType()
export class ShipStaticDataUpsertWithoutShipInput {

    @Field(() => ShipStaticDataUpdateWithoutShipInput, {nullable:false})
    @Type(() => ShipStaticDataUpdateWithoutShipInput)
    update!: ShipStaticDataUpdateWithoutShipInput;

    @Field(() => ShipStaticDataCreateWithoutShipInput, {nullable:false})
    @Type(() => ShipStaticDataCreateWithoutShipInput)
    create!: ShipStaticDataCreateWithoutShipInput;

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    @Type(() => ShipStaticDataWhereInput)
    where?: ShipStaticDataWhereInput;
}
