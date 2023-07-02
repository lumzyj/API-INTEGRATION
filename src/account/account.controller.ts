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
  UseGuards 
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Accountservice } from './account.service';
import { 
  CreateAccountDto,
  EditAccountDto
} from './dto';

@Controller('Accounts')
export class AccountController {
  constructor(
      private accountService: Accountservice,
  ) {}

  @Get('getAccounts')
  async getAccounts() {
      return this.accountService.getAccounts();
  }

  @UseGuards(JwtGuard)
  @Get('getAccountsByUser')
  async getAccountsByUser(
      @GetUser('id') userId: number,
  ) {
      return this.accountService.getAccountsByUser(userId);
  }

  @UseGuards(JwtGuard)
@Get(':accountId')
getAccountById(
@GetUser('id') userId: number,
@Param('accountId', ParseIntPipe) accountId: number,
) {
return this.accountService.getAccountById(accountId, userId);
}

  


  @UseGuards(JwtGuard) // Apply token authentication only for this method
  @Post('addAccount')
  createAccount(
      @GetUser('id') userId: number, 
      @Body() dto: CreateAccountDto,
  ) {
      return this.accountService.createAccount(userId, dto);
  }

  @UseGuards(JwtGuard) // Apply token authentication only for this method
  @Patch(':id') 
  editAccountById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) accountId: number,
      @Body() dto: EditAccountDto,
  ) {
      return this.accountService.editAccountById(userId, accountId, dto);
  }

  @UseGuards(JwtGuard) // Apply token authentication only for this method
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAccountById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) accountId: number,
  ) {
      return this.accountService.deleteAccountById(userId, accountId);
  }

  @UseGuards(JwtGuard) // Apply token authentication only for this method
  @Post(':AccountId/send-money/:userId')
  async sendMoney(
      @Param('AccountId', ParseIntPipe) accountId: number,
      @Param('userId', ParseIntPipe) userId: number,
      @Body() dto: EditAccountDto,
  ) {
      const result = await this.accountService.sendMoney(accountId, userId, dto.balance);

      return {
          message: 'Money sent successfully',
          senderAccount: result.senderAccount,
          receiverAccount: result.receiverAccount,
      };
  }
  @UseGuards(JwtGuard) // Apply token authentication only for this method
  @Post(':receiverAccountId/receive-money/:senderAccountId')
  async receiveMoney(
  @Param('receiverAccountId', ParseIntPipe) receiverAccountId: number,
  @Param('senderAccountId', ParseIntPipe) senderAccountId: number,
  @Body() dto: EditAccountDto,
  ) {
  const result = await this.accountService.receiveMoney(receiverAccountId, senderAccountId, dto.balance);

  return {
      message: 'Money received successfully',
      senderAccount: result.senderAccount,
      receiverAccount: result.receiverAccount,
  };
  }
}

