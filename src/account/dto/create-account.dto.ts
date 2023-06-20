import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    AccountName: string

    @IsNumber()
    @IsNotEmpty()
    account_Number: number

    @IsNumber()
    @IsNotEmpty()
    pin: number

    @IsNumber()
    @IsNotEmpty()
    balance: number
}

