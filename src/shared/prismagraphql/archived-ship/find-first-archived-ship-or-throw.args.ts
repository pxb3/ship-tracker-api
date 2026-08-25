import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ArchivedShipWhereInput } from './archived-ship-where.input';
import { Type } from 'class-transformer';
import { ArchivedShipOrderByWithRelationInput } from './archived-ship-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ArchivedShipWhereUniqueInput } from './archived-ship-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ArchivedShipScalarFieldEnum } from './archived-ship-scalar-field.enum';

@ArgsType()
export class FindFirstArchivedShipOrThrowArgs {

    @Field(() => ArchivedShipWhereInput, {nullable:true})
    @Type(() => ArchivedShipWhereInput)
    where?: ArchivedShipWhereInput;

    @Field(() => [ArchivedShipOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ArchivedShipOrderByWithRelationInput>;

    @Field(() => ArchivedShipWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ArchivedShipWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ArchivedShipScalarFieldEnum], {nullable:true})
    distinct?: Array<`${ArchivedShipScalarFieldEnum}`>;
}
