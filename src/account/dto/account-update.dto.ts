import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AccountUpdateDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsNumber()
  @IsOptional()
  account_Number?: number;

  @IsNumber()
  @IsOptional()
  pin?: number;
}
