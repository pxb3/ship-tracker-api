import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipCreateInput } from './archived-ship-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneArchivedShipArgs {

    @Field(() => ArchivedShipCreateInput, {nullable:false})
    @Type(() => ArchivedShipCreateInput)
    data!: ArchivedShipCreateInput;
}
