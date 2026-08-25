import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShipStaticDataWhereInput } from './ship-static-data-where.input';

@InputType()
export class ShipStaticDataNullableScalarRelationFilter {

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    is?: ShipStaticDataWhereInput;

    @Field(() => ShipStaticDataWhereInput, {nullable:true})
    isNot?: ShipStaticDataWhereInput;
}
