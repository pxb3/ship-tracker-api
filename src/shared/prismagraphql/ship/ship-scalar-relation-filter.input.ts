import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipWhereInput } from './ship-where.input';

@InputType()
export class ShipScalarRelationFilter {

    @Field(() => ShipWhereInput, {nullable:true})
    is?: ShipWhereInput;

    @Field(() => ShipWhereInput, {nullable:true})
    isNot?: ShipWhereInput;
}
