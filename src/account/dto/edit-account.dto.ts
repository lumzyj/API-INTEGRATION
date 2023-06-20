import { IsNumber, IsOptional, IsString } from "class-validator"

export class EditAccountDto {
    @IsString()
    @IsOptional()
    AccountName?: string

    @IsNumber()
    @IsOptional()
    account_Number?: number

    @IsNumber()
    @IsOptional()
    pin?: number

    @IsNumber()
    @IsOptional()
    balance?: number
}
