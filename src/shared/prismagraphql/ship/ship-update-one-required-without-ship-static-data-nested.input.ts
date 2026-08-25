import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipCreateWithoutShipStaticDataInput } from './ship-create-without-ship-static-data.input';
import { Type } from 'class-transformer';
import { ShipCreateOrConnectWithoutShipStaticDataInput } from './ship-create-or-connect-without-ship-static-data.input';
import { ShipUpsertWithoutShipStaticDataInput } from './ship-upsert-without-ship-static-data.input';
import { Prisma } from '@prisma/client';
import { ShipWhereUniqueInput } from './ship-where-unique.input';
import { ShipUpdateToOneWithWhereWithoutShipStaticDataInput } from './ship-update-to-one-with-where-without-ship-static-data.input';

@InputType()
export class ShipUpdateOneRequiredWithoutShipStaticDataNestedInput {

    @Field(() => ShipCreateWithoutShipStaticDataInput, {nullable:true})
    @Type(() => ShipCreateWithoutShipStaticDataInput)
    create?: ShipCreateWithoutShipStaticDataInput;

    @Field(() => ShipCreateOrConnectWithoutShipStaticDataInput, {nullable:true})
    @Type(() => ShipCreateOrConnectWithoutShipStaticDataInput)
    connectOrCreate?: ShipCreateOrConnectWithoutShipStaticDataInput;

    @Field(() => ShipUpsertWithoutShipStaticDataInput, {nullable:true})
    @Type(() => ShipUpsertWithoutShipStaticDataInput)
    upsert?: ShipUpsertWithoutShipStaticDataInput;

    @Field(() => ShipWhereUniqueInput, {nullable:true})
    @Type(() => ShipWhereUniqueInput)
    connect?: Prisma.AtLeast<ShipWhereUniqueInput, 'id'>;

    @Field(() => ShipUpdateToOneWithWhereWithoutShipStaticDataInput, {nullable:true})
    @Type(() => ShipUpdateToOneWithWhereWithoutShipStaticDataInput)
    update?: ShipUpdateToOneWithWhereWithoutShipStaticDataInput;
}
