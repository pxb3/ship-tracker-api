import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipStaticDataUpdateManyMutationInput } from './archived-ship-static-data-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataWhereInput } from './archived-ship-static-data-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyArchivedShipStaticDataArgs {

    @Field(() => ArchivedShipStaticDataUpdateManyMutationInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataUpdateManyMutationInput)
    data!: ArchivedShipStaticDataUpdateManyMutationInput;

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereInput)
    where?: ArchivedShipStaticDataWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
