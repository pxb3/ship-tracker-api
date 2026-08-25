import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutRefreshTokensInput } from './user-update-without-refresh-tokens.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutRefreshTokensInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutRefreshTokensInput, {nullable:false})
    @Type(() => UserUpdateWithoutRefreshTokensInput)
    data!: UserUpdateWithoutRefreshTokensInput;
}
