import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class ShipStaticDataUncheckedCreateInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    shipId!: string;

    @Field(() => String, {nullable:true})
    callSign?: string;

    @Field(() => String, {nullable:true})
    destination?: string;

    @Field(() => Int, {nullable:true})
    dimensionA?: number;

    @Field(() => Int, {nullable:true})
    dimensionB?: number;

    @Field(() => Int, {nullable:true})
    dimensionC?: number;

    @Field(() => Int, {nullable:true})
    dimensionD?: number;

    @Field(() => Int, {nullable:true})
    etaDay?: number;

    @Field(() => Int, {nullable:true})
    etaHour?: number;

    @Field(() => Int, {nullable:true})
    etaMinute?: number;

    @Field(() => Int, {nullable:true})
    etaMonth?: number;

    @Field(() => Float, {nullable:true})
    maximumStaticDraught?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => Boolean, {nullable:true})
    valid?: boolean;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
