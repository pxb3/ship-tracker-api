import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ArchivedShipStaticDataWhereUniqueInput } from './archived-ship-static-data-where-unique.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataCreateWithoutArchivedShipInput } from './archived-ship-static-data-create-without-archived-ship.input';

@InputType()
export class ArchivedShipStaticDataCreateOrConnectWithoutArchivedShipInput {

    @Field(() => ArchivedShipStaticDataWhereUniqueInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataWhereUniqueInput)
    where!: Prisma.AtLeast<ArchivedShipStaticDataWhereUniqueInput, 'id' | 'archivedShipId'>;

    @Field(() => ArchivedShipStaticDataCreateWithoutArchivedShipInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataCreateWithoutArchivedShipInput)
    create!: ArchivedShipStaticDataCreateWithoutArchivedShipInput;
}
