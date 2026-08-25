import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipStaticDataCreateInput } from './archived-ship-static-data-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneArchivedShipStaticDataArgs {

    @Field(() => ArchivedShipStaticDataCreateInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataCreateInput)
    data!: ArchivedShipStaticDataCreateInput;
}
