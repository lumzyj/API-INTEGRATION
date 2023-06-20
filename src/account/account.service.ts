import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto, EditAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async createAccount(
    userId: number, 
    dto: CreateAccountDto) {
    const account = await this.prisma.account.create({
      data: {
        userId,
        ...dto,
      },
    });
    return account;
  }

  async getAccounts(userId: number) {
    return this.prisma.account.findMany({
      where: {
        userId,
      },
    });
  }

  async getAccountById(userId: number, accountId: number) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async getAccountByAccountNumber(accountNumber: number) {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountNumber,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async sendMoney(
    accountNumber: number,
    receiverAccountId: number,
    amount: number,
    dto: EditAccountDto,
  ) {
    const senderAccount = await this.getAccountByAccountNumber(accountNumber);
    const receiverAccount = await this.getAccountById(senderAccount.userId, receiverAccountId);

    if (senderAccount.balance < amount) {
      throw new ForbiddenException('Insufficient balance');
    }

    const updatedSenderAccount = await this.prisma.account.update({
      where: {
        id: senderAccount.id,
      },
      data: {
        balance: senderAccount.balance - amount,
      },
    });

    const updatedReceiverAccount = await this.prisma.account.update({
      where: {
        id: receiverAccountId,
      },
      data: {
        balance: receiverAccount.balance + amount,
      },
    });

    if (dto) {
      await this.prisma.account.update({
        where: {
          id: senderAccount.id,
        },
        data: {
          ...dto,
        },
      });

      await this.prisma.account.update({
        where: {
          id: receiverAccountId,
        },
        data: {
          ...dto,
        },
      });
    }

    return {
      senderAccount: updatedSenderAccount,
      receiverAccount: updatedReceiverAccount,
    };
  }

  async editAccountById(userId: number, accountId: number, dto: EditAccountDto) {
    const account = await this.getAccountById(userId, accountId);

    return this.prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteAccountById(userId: number, accountId: number) {
    const account = await this.getAccountById(userId, accountId);

    await this.prisma.account.delete({
      where: {
        id: account.id,
      },
    });
  }
}

