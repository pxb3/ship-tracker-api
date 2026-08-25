import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { FindUniqueShipWhereInput } from './ship-where-unique.input';

/**
 * Custom Args for findUniqueShip query.
 * This is NOT auto-generated and won't be overwritten by Prisma.
 * 
 * Use this instead of the Prisma-generated FindUniqueShipArgs to avoid
 * regeneration issues with class-validator decorators.
 */
@ArgsType()
export class FindUniqueShipArgs {
  @Field(() => FindUniqueShipWhereInput, { nullable: false })
  @Type(() => FindUniqueShipWhereInput)
  @ValidateNested()
  @IsNotEmpty()
  where!: FindUniqueShipWhereInput;
}
