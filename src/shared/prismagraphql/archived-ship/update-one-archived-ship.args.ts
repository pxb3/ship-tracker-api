import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipUpdateInput } from './archived-ship-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ArchivedShipWhereUniqueInput } from './archived-ship-where-unique.input';

@ArgsType()
export class UpdateOneArchivedShipArgs {

    @Field(() => ArchivedShipUpdateInput, {nullable:false})
    @Type(() => ArchivedShipUpdateInput)
    data!: ArchivedShipUpdateInput;

    @Field(() => ArchivedShipWhereUniqueInput, {nullable:false})
    @Type(() => ArchivedShipWhereUniqueInput)
    where!: Prisma.AtLeast<ArchivedShipWhereUniqueInput, 'id'>;
}
