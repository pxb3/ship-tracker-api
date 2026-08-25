import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipWhereInput } from './archived-ship-where.input';
import { Type } from 'class-transformer';
import { ArchivedShipUpdateWithoutArchivedShipStaticDataInput } from './archived-ship-update-without-archived-ship-static-data.input';

@InputType()
export class ArchivedShipUpdateToOneWithWhereWithoutArchivedShipStaticDataInput {

    @Field(() => ArchivedShipWhereInput, {nullable:true})
    @Type(() => ArchivedShipWhereInput)
    where?: ArchivedShipWhereInput;

    @Field(() => ArchivedShipUpdateWithoutArchivedShipStaticDataInput, {nullable:false})
    @Type(() => ArchivedShipUpdateWithoutArchivedShipStaticDataInput)
    data!: ArchivedShipUpdateWithoutArchivedShipStaticDataInput;
}
