import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ArchivedShipWhereUniqueInput } from './archived-ship-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneArchivedShipArgs {

    @Field(() => ArchivedShipWhereUniqueInput, {nullable:false})
    @Type(() => ArchivedShipWhereUniqueInput)
    where!: Prisma.AtLeast<ArchivedShipWhereUniqueInput, 'id'>;
}
