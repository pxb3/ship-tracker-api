import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipWhereInput } from './archived-ship-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyArchivedShipArgs {

    @Field(() => ArchivedShipWhereInput, {nullable:true})
    @Type(() => ArchivedShipWhereInput)
    where?: ArchivedShipWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
