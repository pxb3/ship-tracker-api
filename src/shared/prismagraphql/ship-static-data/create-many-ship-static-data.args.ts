import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipStaticDataCreateManyInput } from './ship-static-data-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyShipStaticDataArgs {

    @Field(() => [ShipStaticDataCreateManyInput], {nullable:false})
    @Type(() => ShipStaticDataCreateManyInput)
    data!: Array<ShipStaticDataCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
