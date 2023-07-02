import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Status, TypeOfTransaction } from '@prisma/client'

export class UpdateTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    amount?: number

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    receiver?: number

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    balance?: number
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    sender?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    status?: Status

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type_of_transaction?: TypeOfTransaction
}
