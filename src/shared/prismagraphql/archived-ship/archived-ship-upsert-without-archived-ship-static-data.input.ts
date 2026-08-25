import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipUpdateWithoutArchivedShipStaticDataInput } from './archived-ship-update-without-archived-ship-static-data.input';
import { Type } from 'class-transformer';
import { ArchivedShipCreateWithoutArchivedShipStaticDataInput } from './archived-ship-create-without-archived-ship-static-data.input';
import { ArchivedShipWhereInput } from './archived-ship-where.input';

@InputType()
export class ArchivedShipUpsertWithoutArchivedShipStaticDataInput {

    @Field(() => ArchivedShipUpdateWithoutArchivedShipStaticDataInput, {nullable:false})
    @Type(() => ArchivedShipUpdateWithoutArchivedShipStaticDataInput)
    update!: ArchivedShipUpdateWithoutArchivedShipStaticDataInput;

    @Field(() => ArchivedShipCreateWithoutArchivedShipStaticDataInput, {nullable:false})
    @Type(() => ArchivedShipCreateWithoutArchivedShipStaticDataInput)
    create!: ArchivedShipCreateWithoutArchivedShipStaticDataInput;

    @Field(() => ArchivedShipWhereInput, {nullable:true})
    @Type(() => ArchivedShipWhereInput)
    where?: ArchivedShipWhereInput;
}
