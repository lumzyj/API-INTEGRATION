import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsNumber()
  @IsNotEmpty()
  accountNumber: number;

  @IsNumber()
  @IsNotEmpty()
  pin: number;

  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
