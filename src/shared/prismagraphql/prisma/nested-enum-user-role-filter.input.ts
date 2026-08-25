import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserRole } from './user-role.enum';

@InputType()
export class NestedEnumUserRoleFilter {

    @Field(() => UserRole, {nullable:true})
    equals?: `${UserRole}`;

    @Field(() => [UserRole], {nullable:true})
    in?: Array<`${UserRole}`>;

    @Field(() => [UserRole], {nullable:true})
    notIn?: Array<`${UserRole}`>;

    @Field(() => NestedEnumUserRoleFilter, {nullable:true})
    not?: NestedEnumUserRoleFilter;
}
