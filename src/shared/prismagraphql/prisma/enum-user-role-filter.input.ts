import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserRole } from './user-role.enum';
import { NestedEnumUserRoleFilter } from './nested-enum-user-role-filter.input';

@InputType()
export class EnumUserRoleFilter {

    @Field(() => UserRole, {nullable:true})
    equals?: `${UserRole}`;

    @Field(() => [UserRole], {nullable:true})
    in?: Array<`${UserRole}`>;

    @Field(() => [UserRole], {nullable:true})
    notIn?: Array<`${UserRole}`>;

    @Field(() => NestedEnumUserRoleFilter, {nullable:true})
    not?: NestedEnumUserRoleFilter;
}
