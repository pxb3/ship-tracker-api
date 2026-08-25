import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ShipCreateManyInput } from './ship-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyShipArgs {

    @Field(() => [ShipCreateManyInput], {nullable:false})
    @Type(() => ShipCreateManyInput)
    data!: Array<ShipCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
