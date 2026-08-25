import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipCreateWithoutShipStaticDataInput } from './ship-create-without-ship-static-data.input';
import { Type } from 'class-transformer';
import { ShipCreateOrConnectWithoutShipStaticDataInput } from './ship-create-or-connect-without-ship-static-data.input';
import { Prisma } from '@prisma/client';
import { ShipWhereUniqueInput } from './ship-where-unique.input';

@InputType()
export class ShipCreateNestedOneWithoutShipStaticDataInput {

    @Field(() => ShipCreateWithoutShipStaticDataInput, {nullable:true})
    @Type(() => ShipCreateWithoutShipStaticDataInput)
    create?: ShipCreateWithoutShipStaticDataInput;

    @Field(() => ShipCreateOrConnectWithoutShipStaticDataInput, {nullable:true})
    @Type(() => ShipCreateOrConnectWithoutShipStaticDataInput)
    connectOrCreate?: ShipCreateOrConnectWithoutShipStaticDataInput;

    @Field(() => ShipWhereUniqueInput, {nullable:true})
    @Type(() => ShipWhereUniqueInput)
    connect?: Prisma.AtLeast<ShipWhereUniqueInput, 'id'>;
}
