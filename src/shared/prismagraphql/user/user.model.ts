import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UserRole } from '../prisma/user-role.enum';
import { RefreshToken } from '../refresh-token/refresh-token.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => UserRole, {defaultValue:'REGULAR',nullable:false})
    role!: `${UserRole}`;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [RefreshToken], {nullable:true})
    refreshTokens?: Array<RefreshToken>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
