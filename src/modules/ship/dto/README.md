# Custom DTOs for Ship Module

This directory contains custom Data Transfer Objects (DTOs) that are **NOT auto-generated** by Prisma. These DTOs are safe from Prisma regeneration and provide a stable API layer.

## Purpose

- **Stability**: Won't be overwritten when running `prisma generate`
- **Control**: Full control over validation rules and exposed fields
- **Simplicity**: Include only the fields actually used by your application
- **Security**: Explicit validation with class-validator decorators
- **No Conflicts**: Use unique GraphQL type names to avoid conflicts with Prisma-generated types

## Avoiding GraphQL Schema Conflicts

When creating custom input types, **always use a unique GraphQL type name** to avoid conflicts with Prisma-generated types:

```typescript
// ✅ CORRECT - Uses unique GraphQL type name
@InputType('FindUniqueShipWhereInput')
export class FindUniqueShipWhereInput { ... }

// ❌ WRONG - Conflicts with Prisma's ShipWhereUniqueInput
@InputType()
export class ShipWhereUniqueInput { ... }
```

The `@InputType('UniqueName')` decorator sets the GraphQL schema type name, which is separate from the TypeScript class name.

## When to Create Custom DTOs

✅ **Do create custom DTOs for:**
- Frequently-used queries (especially from frontend)
- Queries with complex validation requirements
- Public API endpoints that need stability
- Queries where you want to limit exposed fields

❌ **Use Prisma-generated types for:**
- Internal/admin-only queries
- One-off or rarely-used queries
- Queries needing full Prisma features (complex filters, aggregations)

## Pattern to Follow

### 1. Create Input DTO

```typescript
// ship-where-unique.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

// Use a unique GraphQL type name to avoid conflicts with Prisma-generated types
@InputType('FindUniqueShipWhereInput')
export class FindUniqueShipWhereInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  id?: string;
}
```

**Important:** Use `@InputType('UniqueName')` to set a GraphQL type name that doesn't conflict with Prisma-generated types.

### 2. Create Args DTO

```typescript
// find-unique-ship.args.ts
import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { FindUniqueShipWhereInput } from './ship-where-unique.input';

@ArgsType()
export class FindUniqueShipArgs {
  @Field(() => FindUniqueShipWhereInput, { nullable: false })
  @Type(() => FindUniqueShipWhereInput)
  @ValidateNested()
  @IsNotEmpty()
  where!: FindUniqueShipWhereInput;
}
```

### 3. Export from index.ts

```typescript
export { FindUniqueShipWhereInput } from './ship-where-unique.input';
export { FindUniqueShipArgs } from './find-unique-ship.args';
```

### 4. Use in Resolver

```typescript
import { FindUniqueShipArgs } from './dto';

@Query(() => Ship, { name: 'findUniqueShip' })
findUniqueShip(@Args() args: FindUniqueShipArgs) {
  return this.shipService.findUnique({ 
    where: args.where, 
    include: { ShipStaticData: true } 
  });
}
```

## Available Decorators

### class-validator
- `@IsOptional()` - Field is optional
- `@IsNotEmpty()` - Field must not be empty
- `@IsString()` - Must be a string
- `@IsNumber()` - Must be a number
- `@IsBoolean()` - Must be a boolean
- `@ValidateNested()` - Validate nested objects

### class-transformer
- `@Type(() => SomeClass)` - Transform to specific type

### @nestjs/graphql
- `@Field(() => Type, { nullable: true })` - GraphQL field definition
- `@InputType()` - GraphQL input type
- `@ArgsType()` - GraphQL args type

## Existing Custom DTOs

- **FindUniqueShipWhereInput** - For unique ship identification (currently supports `id`)
  - Named differently from Prisma's `ShipWhereUniqueInput` to avoid GraphQL schema conflicts
- **FindUniqueShipArgs** - Args for `findUniqueShip` query
- **ShipNextCoordinate** - Output type for next coordinates query

## Migration Notes

Previously, we modified Prisma-generated files directly:
- `src/shared/prismagraphql/ship/find-unique-ship.args.ts` ❌ (deprecated)
- `src/shared/prismagraphql/ship/ship-where-unique.input.ts` ❌ (deprecated)

These are now replaced by custom DTOs in this directory. The decorators in those files can be removed if desired, as they're no longer used by resolvers.

---

**Last Updated:** May 5, 2026
