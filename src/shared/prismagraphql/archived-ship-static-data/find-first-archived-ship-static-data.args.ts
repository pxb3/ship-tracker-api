import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipStaticDataWhereInput } from './archived-ship-static-data-where.input';
import { Type } from 'class-transformer';
import { ArchivedShipStaticDataOrderByWithRelationInput } from './archived-ship-static-data-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ArchivedShipStaticDataWhereUniqueInput } from './archived-ship-static-data-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ArchivedShipStaticDataScalarFieldEnum } from './archived-ship-static-data-scalar-field.enum';

@ArgsType()
export class FindFirstArchivedShipStaticDataArgs {

    @Field(() => ArchivedShipStaticDataWhereInput, {nullable:true})
    @Type(() => ArchivedShipStaticDataWhereInput)
    where?: ArchivedShipStaticDataWhereInput;

    @Field(() => [ArchivedShipStaticDataOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ArchivedShipStaticDataOrderByWithRelationInput>;

    @Field(() => ArchivedShipStaticDataWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ArchivedShipStaticDataWhereUniqueInput, 'id' | 'archivedShipId'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ArchivedShipStaticDataScalarFieldEnum], {nullable:true})
    distinct?: Array<`${ArchivedShipStaticDataScalarFieldEnum}`>;
}
