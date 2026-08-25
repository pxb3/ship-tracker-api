import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipCreateWithoutArchivedShipStaticDataInput } from './archived-ship-create-without-archived-ship-static-data.input';
import { Type } from 'class-transformer';
import { ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput } from './archived-ship-create-or-connect-without-archived-ship-static-data.input';
import { Prisma } from '@prisma/client';
import { ArchivedShipWhereUniqueInput } from './archived-ship-where-unique.input';

@InputType()
export class ArchivedShipCreateNestedOneWithoutArchivedShipStaticDataInput {

    @Field(() => ArchivedShipCreateWithoutArchivedShipStaticDataInput, {nullable:true})
    @Type(() => ArchivedShipCreateWithoutArchivedShipStaticDataInput)
    create?: ArchivedShipCreateWithoutArchivedShipStaticDataInput;

    @Field(() => ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput, {nullable:true})
    @Type(() => ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput)
    connectOrCreate?: ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput;

    @Field(() => ArchivedShipWhereUniqueInput, {nullable:true})
    @Type(() => ArchivedShipWhereUniqueInput)
    connect?: Prisma.AtLeast<ArchivedShipWhereUniqueInput, 'id'>;
}
