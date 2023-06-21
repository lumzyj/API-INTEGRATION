import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Status, TypeOfTransaction} from '@prisma/client';

export class SendTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  receiver: number;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  status:  Status;

  @IsString()
  @IsNotEmpty()
  type_of_transaction: TypeOfTransaction;
}

