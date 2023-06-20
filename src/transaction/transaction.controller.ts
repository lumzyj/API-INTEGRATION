import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SendTransactionDto } from './dto/send-transaction.dto';
import { GetUser } from 'src/auth/decorator';


@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransactions(@GetUser('id') accountId: number) {
    return this.transactionService.getTransactions(accountId);
  }

  @Get(':id')
  getTransactionById(
    @GetUser('id') accountId: number,
    @Param('id', ParseIntPipe) transactionId: number,
  ) {
    return this.transactionService.getTransactionById(accountId, transactionId);
  }

  @Post()
  createTransaction(
    @GetUser('id') accountId: number,
    @Body() dto: SendTransactionDto,
  ) {
    return this.transactionService.createTransaction(accountId, dto);
  }

  @Patch(':id')
  editTransactionById(
    @GetUser('id') accountId: number,
    @Param('id', ParseIntPipe) transactionId: number,
    @Body() dto: SendTransactionDto,
  ) {
    return this.transactionService.editTransactionById(accountId, transactionId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTransactionById(
    @GetUser('id') accountId: number,
    @Param('id', ParseIntPipe) transactionId: number,
  ) {
    return this.transactionService.deleteTransactionById(accountId, transactionId);
  }
}

