import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ArchivedShipStaticDataWhereUniqueInput } from './archived-ship-static-data-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueArchivedShipStaticDataArgs {

    @Field(() => ArchivedShipStaticDataWhereUniqueInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataWhereUniqueInput)
    where!: Prisma.AtLeast<ArchivedShipStaticDataWhereUniqueInput, 'id' | 'archivedShipId'>;
}
