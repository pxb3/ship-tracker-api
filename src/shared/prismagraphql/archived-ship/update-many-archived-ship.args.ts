import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipUpdateManyMutationInput } from './archived-ship-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ArchivedShipWhereInput } from './archived-ship-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyArchivedShipArgs {

    @Field(() => ArchivedShipUpdateManyMutationInput, {nullable:false})
    @Type(() => ArchivedShipUpdateManyMutationInput)
    data!: ArchivedShipUpdateManyMutationInput;

    @Field(() => ArchivedShipWhereInput, {nullable:true})
    @Type(() => ArchivedShipWhereInput)
    where?: ArchivedShipWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
