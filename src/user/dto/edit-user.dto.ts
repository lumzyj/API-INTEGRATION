import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email: string
}