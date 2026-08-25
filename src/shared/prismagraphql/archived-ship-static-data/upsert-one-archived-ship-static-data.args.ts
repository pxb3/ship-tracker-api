import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ArchivedShipStaticDataWhereUniqueInput } from './archived-ship-static-data-where-unique.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataCreateInput } from './archived-ship-static-data-create.input';
import { ArchivedShipStaticDataUpdateInput } from './archived-ship-static-data-update.input';

@ArgsType()
export class UpsertOneArchivedShipStaticDataArgs {

    @Field(() => ArchivedShipStaticDataWhereUniqueInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataWhereUniqueInput)
    where!: Prisma.AtLeast<ArchivedShipStaticDataWhereUniqueInput, 'id' | 'archivedShipId'>;

    @Field(() => ArchivedShipStaticDataCreateInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataCreateInput)
    create!: ArchivedShipStaticDataCreateInput;

    @Field(() => ArchivedShipStaticDataUpdateInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataUpdateInput)
    update!: ArchivedShipStaticDataUpdateInput;
}
