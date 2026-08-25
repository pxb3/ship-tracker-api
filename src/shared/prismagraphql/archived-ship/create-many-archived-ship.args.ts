import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipCreateManyInput } from './archived-ship-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyArchivedShipArgs {

    @Field(() => [ArchivedShipCreateManyInput], {nullable:false})
    @Type(() => ArchivedShipCreateManyInput)
    data!: Array<ArchivedShipCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
