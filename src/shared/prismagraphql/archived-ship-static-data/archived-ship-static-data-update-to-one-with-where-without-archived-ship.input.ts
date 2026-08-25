import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArchivedShipStaticDataWhereInput } from './archived-ship-static-data-where.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataUpdateWithoutArchivedShipInput } from './archived-ship-static-data-update-without-archived-ship.input';

@InputType()
export class ArchivedShipStaticDataUpdateToOneWithWhereWithoutArchivedShipInput {

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereInput)
    where?: ArchivedShipStaticDataWhereInput;

    @Field(() => ArchivedShipStaticDataUpdateWithoutArchivedShipInput, {nullable:false})
    @Type(() => ArchivedShipStaticDataUpdateWithoutArchivedShipInput)
    data!: ArchivedShipStaticDataUpdateWithoutArchivedShipInput;
}
