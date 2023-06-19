import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Accountservice } from './account.service';
import { CreateAccountDto, EditAccountDto } from './dto';

@UseGuards(JwtGuard)
@Controller('accounts')
export class AccountController {
  constructor(private accountService: Accountservice) {}

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

  @Post()
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
    @Body() dto: AccountUpdateDto,
  ) {
    return this.accountService.editAccountById(userId, dto);
  }
  

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAccountById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) accountId: number,
  ) {
    return this.accountService.deleteAccountById(userId, accountId);
  }
}

