import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ShipNextCoordinate {
  @Field()
  id: string;

  @Field()
  routeName: string;

  @Field(() => [Float])
  coordinates: number[];
}