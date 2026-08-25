import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipStaticDataWhereInput } from './archived-ship-static-data-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyArchivedShipStaticDataArgs {

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereInput)
    where?: ArchivedShipStaticDataWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
