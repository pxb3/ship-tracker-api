import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    ADMIN = "ADMIN",
    REGULAR = "REGULAR",
    VIEWER = "VIEWER"
}


registerEnumType(UserRole, { name: 'UserRole', description: undefined })
