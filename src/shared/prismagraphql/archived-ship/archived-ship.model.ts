import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ArchivedShipStaticData } from '../archived-ship-static-data/archived-ship-static-data.model';

@ObjectType()
export class ArchivedShip {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    mmsi!: string | null;

    @Field(() => String, {defaultValue:'',nullable:false})
    shipName!: string;

    @Field(() => Float, {defaultValue:0,nullable:false})
    latitude!: number;

    @Field(() => Float, {defaultValue:0,nullable:false})
    longitude!: number;

    @Field(() => Float, {defaultValue:0,nullable:false})
    rateOfTurn!: number;

    @Field(() => Int, {defaultValue:0,nullable:false})
    trueHeading!: number;

    @Field(() => Float, {defaultValue:0,nullable:false})
    cog!: number;

    @Field(() => Float, {defaultValue:0,nullable:false})
    sog!: number;

    @Field(() => Int, {defaultValue:15,nullable:false})
    navigationalStatus!: number;

    @Field(() => Date, {nullable:false})
    timestamp!: Date;

    @Field(() => Date, {nullable:false})
    lastSeenAt!: Date;

    @Field(() => Date, {nullable:false})
    archivedAt!: Date;

    @Field(() => ArchivedShipStaticData, {nullable:true})
    ArchivedShipStaticData?: ArchivedShipStaticData | null;
}
