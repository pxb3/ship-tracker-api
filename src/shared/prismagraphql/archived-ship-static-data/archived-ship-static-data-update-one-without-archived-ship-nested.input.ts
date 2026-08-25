import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipStaticDataCreateWithoutArchivedShipInput } from './archived-ship-static-data-create-without-archived-ship.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput } from './archived-ship-static-data-create-or-connect-without-archived-ship.input';
import { ArchivedShipStaticDataUpsertWithoutArchivedShipInput } from './archived-ship-static-data-upsert-without-archived-ship.input';
import { ArchivedShipStaticDataWhereInput } from './archived-ship-static-data-where.input';
import { Prisma } from '@prisma/client';
import { ArchivedShipStaticDataWhereUniqueInput } from './archived-ship-static-data-where-unique.input';
import { ArchivedShipStaticDataUpdateToOneWithWhereWithoutArchivedShipInput } from './archived-ship-static-data-update-to-one-with-where-without-archived-ship.input';

@InputType()
export class ArchivedShipStaticDataUpdateOneWithoutArchivedShipNestedInput {

    @Field(() => ArchivedShipStaticDataCreateWithoutArchivedShipInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataCreateWithoutArchivedShipInput)
    create?: ArchivedShipStaticDataCreateWithoutArchivedShipInput;

    @Field(() => ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput)
    connectOrCreate?: ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput;

    @Field(() => ArchivedShipStaticDataUpsertWithoutArchivedShipInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataUpsertWithoutArchivedShipInput)
    upsert?: ArchivedShipStaticDataUpsertWithoutArchivedShipInput;

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereInput)
    disconnect?: ArchivedShipStaticDataWhereInput;

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereInput)
    delete?: ArchivedShipStaticDataWhereInput;

    @Field(() => ArchivedShipStaticDataWhereUniqueInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereUniqueInput)
    connect?: Prisma.AtLeast<ArchivedShipStaticDataWhereUniqueInput, 'id' | 'archivedShipId'>;

    @Field(() => ArchivedShipStaticDataUpdateToOneWithWhereWithoutArchivedShipInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataUpdateToOneWithWhereWithoutArchivedShipInput)
    update?: ArchivedShipStaticDataUpdateToOneWithWhereWithoutArchivedShipInput;
}
