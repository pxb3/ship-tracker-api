import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipStaticDataWhereInput } from './archived-ship-static-data-where.input';

@InputType()
export class ArchivedShipStaticDataNullableScalarRelationFilter {

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    is?: ArchivedShipStaticDataWhereInput;

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    isNot?: ArchivedShipStaticDataWhereInput;
}
