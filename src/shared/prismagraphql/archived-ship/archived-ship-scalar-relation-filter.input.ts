import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipWhereInput } from './archived-ship-where.input';

@InputType()
export class ArchivedShipScalarRelationFilter {

    @Field(() => ArchivedShipWhereInput, {nullable:true})
    is?: ArchivedShipWhereInput;

    @Field(() => ArchivedShipWhereInput, {nullable:true})
    isNot?: ArchivedShipWhereInput;
}
