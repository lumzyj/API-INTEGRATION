import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AccountService } from './account.service';
import { CreateAccountDto, EditAccountDto } from './dto';

@UseGuards(JwtGuard)
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  getAccounts(@GetUser('id') userId: number) {
    return this.accountService.getAccounts(userId);
  }

  @Get(':id')
  getAccountById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) accountId: number,
  ) {
    return this.accountService.getAccountById(userId, accountId);
  }

  @Post('addAccount')
  createAccount(
    @GetUser('id') userId: number,
    @Body() dto: CreateAccountDto,
  ) {
    return this.accountService.createAccount(userId, dto);
  }

  @Patch(':id')
  editAccountById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) accountId: number,
    @Body() dto: EditAccountDto,
  ) {
    return this.accountService.editAccountById(userId, accountId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAccountById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) accountId: number,
  ) {
    return this.accountService.deleteAccountById(userId, accountId);
  }

  @Post(':senderAccountId/send-money/:receiverAccountId')
  async sendMoney(
    @Param('senderAccountId', ParseIntPipe) senderAccountId: number,
    @Param('receiverAccountId', ParseIntPipe) receiverAccountId: number,
    @Body() dto: EditAccountDto,
  ) {
    const amount = dto.balance; // Assuming the balance from the DTO represents the amount to be sent

    const result = await this.accountService.sendMoney(
      senderAccountId,
      receiverAccountId,
      amount,
      dto,
    );

    return {
      message: 'Money sent successfully',
      senderAccount: result.senderAccount,
      receiverAccount: result.receiverAccount,
    };
  }
}

