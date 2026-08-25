import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Ship } from '../ship/ship.model';

@ObjectType()
export class ShipStaticData {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    shipId!: string;

    @Field(() => String, {nullable:true})
    callSign!: string | null;

    @Field(() => String, {nullable:true})
    destination!: string | null;

    @Field(() => Int, {defaultValue:0,nullable:false})
    dimensionA!: number;

    @Field(() => Int, {defaultValue:0,nullable:false})
    dimensionB!: number;

    @Field(() => Int, {defaultValue:0,nullable:false})
    dimensionC!: number;

    @Field(() => Int, {defaultValue:0,nullable:false})
    dimensionD!: number;

    @Field(() => Int, {nullable:true})
    etaDay!: number | null;

    @Field(() => Int, {nullable:true})
    etaHour!: number | null;

    @Field(() => Int, {nullable:true})
    etaMinute!: number | null;

    @Field(() => Int, {nullable:true})
    etaMonth!: number | null;

    @Field(() => Float, {defaultValue:0,nullable:false})
    maximumStaticDraught!: number;

    @Field(() => String, {defaultValue:'',nullable:false})
    name!: string;

    @Field(() => Boolean, {defaultValue:true,nullable:false})
    valid!: boolean;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Ship, {nullable:false})
    ship?: Ship;
}
