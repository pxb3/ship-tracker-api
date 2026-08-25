import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipStaticDataUpdateWithoutArchivedShipInput } from './archived-ship-static-data-update-without-archived-ship.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataCreateWithoutArchivedShipInput } from './archived-ship-static-data-create-without-archived-ship.input';
import { ArchivedShipStaticDataWhereInput } from './archived-ship-static-data-where.input';

@InputType()
export class ArchivedShipStaticDataUpsertWithoutArchivedShipInput {

    @Field(() => ArchivedShipStaticDataUpdateWithoutArchivedShipInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataUpdateWithoutArchivedShipInput)
    update!: ArchivedShipStaticDataUpdateWithoutArchivedShipInput;

    @Field(() => ArchivedShipStaticDataCreateWithoutArchivedShipInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataCreateWithoutArchivedShipInput)
    create!: ArchivedShipStaticDataCreateWithoutArchivedShipInput;

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereInput)
    where?: ArchivedShipStaticDataWhereInput;
}
