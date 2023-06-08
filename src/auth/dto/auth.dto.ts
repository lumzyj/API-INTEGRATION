import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  pin: string;

  @IsNumber()
  @IsNotEmpty()
  account: number;
}
