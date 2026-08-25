import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

/**
 * Custom DTO for Ship unique identifier queries.
 * This is NOT auto-generated and won't be overwritten by Prisma.
 * 
 * Named differently from Prisma's ShipWhereUniqueInput to avoid GraphQL schema conflicts.
 * For findUniqueShip queries, we typically only need the 'id' field.
 */
@InputType('FindUniqueShipWhereInput')
export class FindUniqueShipWhereInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  // Add other unique identifiers if needed in the future
  // For example: mmsi, if it becomes a unique field
}
