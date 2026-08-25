import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipStaticDataCreateManyInput } from './archived-ship-static-data-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyArchivedShipStaticDataArgs {

    @Field(() => [ArchivedShipStaticDataCreateManyInput], {nullable:false})
    @Type(() => ArchivedShipStaticDataCreateManyInput)
    data!: Array<ArchivedShipStaticDataCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
