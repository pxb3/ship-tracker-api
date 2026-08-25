import { registerEnumType } from '@nestjs/graphql';

export enum RefreshTokenScalarFieldEnum {
    id = "id",
    token = "token",
    userId = "userId",
    createdAt = "createdAt"
}


registerEnumType(RefreshTokenScalarFieldEnum, { name: 'RefreshTokenScalarFieldEnum', description: undefined })
