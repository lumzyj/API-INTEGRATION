import { Module } from '@nestjs/common';
import { Accountservice } from './account.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { AccountController } from './account.controller';

@Module({
  providers: [Accountservice, TransactionService],
  controllers: [AccountController]
})
export class AccountModule {}
