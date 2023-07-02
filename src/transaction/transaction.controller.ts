import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SendTransactionDto } from './dto/send-transaction.dto';
import { GetUser } from 'src/auth/decorator';


@Controller('transaction')
export class TransactionController {
    constructor(
        private TransactionService: TransactionService
    ) {}

    @Get(':accountId/transactions')
    getTransactionsByAccountId(
      @Param('accountId', ParseIntPipe) accountId: number,
    ) {
      return this.TransactionService.getTransactionsByAccountId(accountId);
    }

// @Get(':id')
// getTransactionsById(
//     @Param('id', ParseIntPipe)  AccountId: number,
//     @Param('id', ParseIntPipe) transactionId: number,
// ){
//     return this.TransactionService.getTransactionById(
//         AccountId,
//         transactionId,
//     );
// }
@Post(':AccountId') // Use 'accountId' instead of 'id'
createTransaction(
  @GetUser('id') userId: number, // Assuming you are using 'id' as the user ID decorator
  @Param('accountId', ParseIntPipe) AccountId: number, // Use 'accountId' instead of 'id' and add ParseIntPipe to convert it to a number
  @Body() dto: SendTransactionDto,
) {
  return this.TransactionService.createTransaction(
    AccountId, // Pass the 'accountId' to the service method
    dto,
  );
}

// @Patch(':id')
// editTransactionById(
//     @GetUser('id') userId: number,
//     @Param('id', ParseIntPipe) AccountId: number,
//     @Body() dto: SendTransactionDto,
//     ) {
//         return this.TransactionService.editTransactionById(
//             userId,
//             AccountId,
//             dto,
//         );
//     }

// @HttpCode(HttpStatus.NO_CONTENT)
// @Delete(':id')
// deleteAccountById(
//     @GetUser('id') userId: number,
//     @Param('id', ParseIntPipe) AccountId: number,
// ){
//     return this.TransactionService.deleteTransactionById(
//         userId, 
//         AccountId
//     );
// }
}

