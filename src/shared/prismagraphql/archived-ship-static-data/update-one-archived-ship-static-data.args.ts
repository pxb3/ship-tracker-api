import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipStaticDataUpdateInput } from './archived-ship-static-data-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ArchivedShipStaticDataWhereUniqueInput } from './archived-ship-static-data-where-unique.input';

@ArgsType()
export class UpdateOneArchivedShipStaticDataArgs {

    @Field(() => ArchivedShipStaticDataUpdateInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataUpdateInput)
    data!: ArchivedShipStaticDataUpdateInput;

    @Field(() => ArchivedShipStaticDataWhereUniqueInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataWhereUniqueInput)
    where!: Prisma.AtLeast<ArchivedShipStaticDataWhereUniqueInput, 'id' | 'archivedShipId'>;
}
