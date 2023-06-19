import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto, EditAccountDto } from './dto';

@Injectable()
export class Accountservice {
  constructor(private prisma: PrismaService) {}

  async createAccount(userId: number, dto: CreateAccountDto) {
    const account = await this.prisma.account.create({
      data: {
        userId,
        ...dto,
      },
    });
    return account;
  }

  getAccounts(userId: number) {
    return this.prisma.account.findMany({
      where: {
        userId,
      },
    });
  }

  getAccountById(userId: number, accountId: number) {
    return this.prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });
  }

  getAccountByAccountNumber(accountNumber: number) {
    return this.prisma.account.findUnique({
      where: {
        id: accountNumber,
      },
    });
  }

  async editAccountById(userId: number, accountId: number, dto: EditAccountDto) {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });
    if (!account || account.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteAccountById(userId: number, accountId: number) {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });
    if (!account || account.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    await this.prisma.account.delete({
      where: {
        id: accountId,
      },
    });
  }
}
