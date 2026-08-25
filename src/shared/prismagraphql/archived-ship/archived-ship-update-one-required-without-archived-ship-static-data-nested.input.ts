import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipCreateWithoutArchivedShipStaticDataInput } from './archived-ship-create-without-archived-ship-static-data.input';
import { Type } from 'class-transformer';
import { ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput } from './archived-ship-create-or-connect-without-archived-ship-static-data.input';
import { ArchivedShipUpsertWithoutArchivedShipStaticDataInput } from './archived-ship-upsert-without-archived-ship-static-data.input';
import { Prisma } from '@prisma/client';
import { ArchivedShipWhereUniqueInput } from './archived-ship-where-unique.input';
import { ArchivedShipUpdateToOneWithWhereWithoutArchivedShipStaticDataInput } from './archived-ship-update-to-one-with-where-without-archived-ship-static-data.input';

@InputType()
export class ArchivedShipUpdateOneRequiredWithoutArchivedShipStaticDataNestedInput {

    @Field(() => ArchivedShipCreateWithoutArchivedShipStaticDataInput, {nullable:true})
    @Type(() => ArchivedShipCreateWithoutArchivedShipStaticDataInput)
    create?: ArchivedShipCreateWithoutArchivedShipStaticDataInput;

    @Field(() => ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput, {nullable:true})
    @Type(() => ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput)
    connectOrCreate?: ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput;

    @Field(() => ArchivedShipUpsertWithoutArchivedShipStaticDataInput, {nullable:true})
    @Type(() => ArchivedShipUpsertWithoutArchivedShipStaticDataInput)
    upsert?: ArchivedShipUpsertWithoutArchivedShipStaticDataInput;

    @Field(() => ArchivedShipWhereUniqueInput, {nullable:true})
    @Type(() => ArchivedShipWhereUniqueInput)
    connect?: Prisma.AtLeast<ArchivedShipWhereUniqueInput, 'id'>;

    @Field(() => ArchivedShipUpdateToOneWithWhereWithoutArchivedShipStaticDataInput, {nullable:true})
    @Type(() => ArchivedShipUpdateToOneWithWhereWithoutArchivedShipStaticDataInput)
    update?: ArchivedShipUpdateToOneWithWhereWithoutArchivedShipStaticDataInput;
}
