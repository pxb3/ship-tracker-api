import {
  User,
  FindFirstUserArgs,
  FindUniqueUserArgs,
  FindManyUserArgs,
  UserGroupBy,
  UserGroupByArgs,
  AggregateUser,
  UserAggregateArgs,
  CreateOneUserArgs,
  CreateManyUserArgs,
  UpdateOneUserArgs,
  UpdateManyUserArgs,
  DeleteOneUserArgs,
  DeleteManyUserArgs,
} from "../../shared/prismagraphql/user";
import { AffectedRows } from "../../shared/prismagraphql/prisma";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UsersService } from "./users.service";
// import { CognitoAuthGuard } from "src/shared/guards/cognito-auth/cognito-auth.guard";
// import { RolesGuard } from "src/shared/guards/roles/roles.guard";
// import { UseGuards } from "@nestjs/common";
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: false })
  findFirstUser(@Args() args: FindFirstUserArgs) {
    return this.usersService.findFirst(args);
  }

  @Query(() => User, { nullable: false })
  findUniqueUser(@Args() args: FindUniqueUserArgs) {
    return this.usersService.findUnique(args);
  }

  @Query(() => [User], { nullable: false })
  listUsers(@Args() args: FindManyUserArgs) {
    return this.usersService.findMany(args);
  }

  @Query(() => [UserGroupBy], { nullable: false })
  groupByUser(@Args() args: UserGroupByArgs) {
    return this.usersService.groupBy(args);
  }

  @Query(() => AggregateUser, { nullable: false })
  aggregateUser(@Args() args: UserAggregateArgs) {
    return this.usersService.aggregate(args);
  }

  @Mutation(() => User, { nullable: true })
  createUser(@Args() args: CreateOneUserArgs) {
    return this.usersService.create(args);
  }

  @Mutation(() => AffectedRows, { nullable: true })
  createManyUser(@Args() args: CreateManyUserArgs) {
    return this.usersService.createMany(args);
  }

  @Mutation(() => User, { nullable: true })
  updateUser(@Args() args: UpdateOneUserArgs) {
    return this.usersService.update(args);
  }

  @Mutation(() => AffectedRows, { nullable: true })
  updateManyUser(@Args() args: UpdateManyUserArgs) {
    return this.usersService.updateMany(args);
  }

  @Mutation(() => User, { nullable: true })
  deleteUser(@Args() args: DeleteOneUserArgs) {
    return this.usersService.delete(args);
  }

  @Mutation(() => AffectedRows, { nullable: true })
  deleteManyUser(@Args() args: DeleteManyUserArgs) {
    return this.usersService.deleteMany(args);
  }
}