import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    fullName?: string;

    @IsNumber()
    @IsOptional()
    pin?: number

    @IsNumber()
    @IsOptional()
    account?: number
}