import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipUpdateWithoutShipStaticDataInput } from './ship-update-without-ship-static-data.input';
import { Type } from 'class-transformer';
import { ShipCreateWithoutShipStaticDataInput } from './ship-create-without-ship-static-data.input';
import { ShipWhereInput } from './ship-where.input';

@InputType()
export class ShipUpsertWithoutShipStaticDataInput {

    @Field(() => ShipUpdateWithoutShipStaticDataInput, {nullable:false})
    @Type(() => ShipUpdateWithoutShipStaticDataInput)
    update!: ShipUpdateWithoutShipStaticDataInput;

    @Field(() => ShipCreateWithoutShipStaticDataInput, {nullable:false})
    @Type(() => ShipCreateWithoutShipStaticDataInput)
    create!: ShipCreateWithoutShipStaticDataInput;

    @Field(() => ShipWhereInput, {nullable:true})
    @Type(() => ShipWhereInput)
    where?: ShipWhereInput;
}
