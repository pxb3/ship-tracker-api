import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutRefreshTokensInput } from './user-create-without-refresh-tokens.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutRefreshTokensInput } from './user-create-or-connect-without-refresh-tokens.input';
import { UserUpsertWithoutRefreshTokensInput } from './user-upsert-without-refresh-tokens.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutRefreshTokensInput } from './user-update-to-one-with-where-without-refresh-tokens.input';

@InputType()
export class UserUpdateOneRequiredWithoutRefreshTokensNestedInput {

    @Field(() => UserCreateWithoutRefreshTokensInput, {nullable:true})
    @Type(() => UserCreateWithoutRefreshTokensInput)
    create?: UserCreateWithoutRefreshTokensInput;

    @Field(() => UserCreateOrConnectWithoutRefreshTokensInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutRefreshTokensInput)
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput;

    @Field(() => UserUpsertWithoutRefreshTokensInput, {nullable:true})
    @Type(() => UserUpsertWithoutRefreshTokensInput)
    upsert?: UserUpsertWithoutRefreshTokensInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

    @Field(() => UserUpdateToOneWithWhereWithoutRefreshTokensInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutRefreshTokensInput)
    update?: UserUpdateToOneWithWhereWithoutRefreshTokensInput;
}
