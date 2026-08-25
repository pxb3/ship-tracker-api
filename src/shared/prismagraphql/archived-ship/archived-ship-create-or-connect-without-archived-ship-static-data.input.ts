import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ArchivedShipWhereUniqueInput } from './archived-ship-where-unique.input';
import { Type } from 'class-transformer';
import { ArchivedShipCreateWithoutArchivedShipStaticDataInput } from './archived-ship-create-without-archived-ship-static-data.input';

@InputType()
export class ArchivedShipCreateOrConnectWithoutArchivedShipStaticDataInput {

    @Field(() => ArchivedShipWhereUniqueInput, {nullable:false})
    @Type(() => ArchivedShipWhereUniqueInput)
    where!: Prisma.AtLeast<ArchivedShipWhereUniqueInput, 'id'>;

    @Field(() => ArchivedShipCreateWithoutArchivedShipStaticDataInput, {nullable:false})
    @Type(() => ArchivedShipCreateWithoutArchivedShipStaticDataInput)
    create!: ArchivedShipCreateWithoutArchivedShipStaticDataInput;
}
