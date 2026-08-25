import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ArchivedShipWhereUniqueInput } from './archived-ship-where-unique.input';
import { Type } from 'class-transformer';
import { ArchivedShipCreateInput } from './archived-ship-create.input';
import { ArchivedShipUpdateInput } from './archived-ship-update.input';

@ArgsType()
export class UpsertOneArchivedShipArgs {

    @Field(() => ArchivedShipWhereUniqueInput, {nullable:false})
    @Type(() => ArchivedShipWhereUniqueInput)
    where!: Prisma.AtLeast<ArchivedShipWhereUniqueInput, 'id'>;

    @Field(() => ArchivedShipCreateInput, {nullable:false})
    @Type(() => ArchivedShipCreateInput)
    create!: ArchivedShipCreateInput;

    @Field(() => ArchivedShipUpdateInput, {nullable:false})
    @Type(() => ArchivedShipUpdateInput)
    update!: ArchivedShipUpdateInput;
}
