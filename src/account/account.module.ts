import { Module } from '@nestjs/common';
import { Accountservice } from './account.service';
import { AccountController } from './account.controller';

@Module({
  providers: [Accountservice],
  controllers: [AccountController],
})
export class AccountModule {}
