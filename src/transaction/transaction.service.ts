import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendTransactionDto } from './dto/send-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(AccountId: number, dto: SendTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        AccountId,
        ...dto,
      },
    });
    return transaction;
  }

  getTransactions(AccountId: number) {
    return this.prisma.transaction.findMany({
      where: {
        AccountId,
      },
    });
  }

  getTransactionById(AccountId: number, transactionId: number) {
    return this.prisma.transaction.findFirst({
      where: {
        id: transactionId,
        AccountId,
      },
    });
  }

  async editTransactionById(AccountId: number, transactionId: number, dto: SendTransactionDto) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (!transaction || transaction.AccountId !== AccountId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTransactionById(AccountId: number, transactionId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (!transaction || transaction.AccountId !== AccountId) {
      throw new ForbiddenException('Access to the resources denied');
    }
    await this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }
}


  
  


