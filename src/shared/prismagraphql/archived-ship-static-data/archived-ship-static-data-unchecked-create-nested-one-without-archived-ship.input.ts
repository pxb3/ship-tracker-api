import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipStaticDataCreateWithoutArchivedShipInput } from './archived-ship-static-data-create-without-archived-ship.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput } from './archived-ship-static-data-create-or-connect-without-archived-ship.input';
import { Prisma } from '@prisma/client';
import { ArchivedShipStaticDataWhereUniqueInput } from './archived-ship-static-data-where-unique.input';

@InputType()
export class ArchivedShipStaticDataUncheckedCreateNestedOneWithoutArchivedShipInput {

    @Field(() => ArchivedShipStaticDataCreateWithoutArchivedShipInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataCreateWithoutArchivedShipInput)
    create?: ArchivedShipStaticDataCreateWithoutArchivedShipInput;

    @Field(() => ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput)
    connectOrCreate?: ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput;

    @Field(() => ArchivedShipStaticDataWhereUniqueInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereUniqueInput)
    connect?: Prisma.AtLeast<ArchivedShipStaticDataWhereUniqueInput, 'id' | 'archivedShipId'>;
}
