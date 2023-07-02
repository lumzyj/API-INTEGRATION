import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Status, TypeOfTransaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { TransactionService } from 'src/transaction/transaction.service';
import { UpdateTransactionDto } from 'src/transaction/dto/update-transaction.dto';

import { 
    CreateAccountDto, 
    EditAccountDto, 
} from './dto';
import { SendTransactionDto } from 'src/transaction/dto/send-transaction.dto';

@Injectable()
export class Accountservice {
    constructor(private prisma: PrismaService,
      private transactionService: TransactionService
      ){}
    
    
async createAccount(
    userId: number, 
    dto: CreateAccountDto
    ) {
        const account = await this.prisma.account.create({
            data: {
                userId,
                ...dto,
            },
        });
        return account;
    }

    
getAccounts(
    // userId: number
    ) {
        return this.prisma.account.findMany({
            // where: {
            //     userId,
            // },
        });
    }

    getAccountsByUser(
      userId: number
      ) {
          return this.prisma.account.findMany({
              where: {
                  userId,
              },
          });
      }

      async getAccountById(accountId: number, userId: number) {
        return this.prisma.account.findFirst({
          where: {
            id: accountId,
            userId: userId,
          },
        });
      }
      
      
      

getAccountByAccountNumber(
        account_Number: number,
        ) {
            return this.prisma.account.findUnique({
                where: {
                    id: account_Number,
                },
            });
        }
async sendMoney(
          AccountId: number,
          userId: number,
          amount: number,
        ) {
          const senderAccount = await this.prisma.account.findUnique({
            where: {
              id: AccountId,
            },
          });
        
          const receiverAccount = await this.prisma.account.findUnique({
            where: {
              id: userId,
            },
          });
        
          if (!senderAccount || !receiverAccount) {
            throw new NotFoundException('Account not found');
          }
        
          if (senderAccount.balance < amount) {
            throw new ForbiddenException('Insufficient balance');
          }
        
          // Deduct the amount from the sender's account balance
          const updatedSenderAccount = await this.prisma.account.update({
            where: {
              id: AccountId,
            },
            data: {
              balance: senderAccount.balance - amount,
            },
          });
        
          // Update the receiver's account balance
          const updatedReceiverAccount = await this.prisma.account.update({
            where: {
              id: userId,
            },
            data: {
              balance: receiverAccount.balance + amount,
            },
          });
          
          await this.transactionService.createTransaction(AccountId, {
            receiver: userId,
            amount: amount,
            balance: amount,
            sender: "",
            status: 'successful',
            type_of_transaction: 'Send',
          });
          // const transaction = await this.prisma.transaction.create({
          //   data: {
          //     AccountId,
          //     amount,
          //     receiver: userId,
          //     status: 'pending',
          //     type_of_transaction: 'Send',
          //     balance: amount,
          //   },
          // });
        
          return {
            senderAccount: updatedSenderAccount,
            receiverAccount: updatedReceiverAccount,
            // transaction
          };
        }
        async receiveMoney(receiverAccountId: number, senderAccountId: number, amount: number) {
          const receiverAccount = await this.prisma.account.findUnique({
            where: {
              id: receiverAccountId,
            },
          });
        
          const senderAccount = await this.prisma.account.findUnique({
            where: {
              id: senderAccountId,
            },
          });
        
          if (!receiverAccount || !senderAccount) {
            throw new NotFoundException('Account not found');
          }
        
          // Deduct the amount from the sender's account balance
          const updatedSenderAccount = await this.prisma.account.update({
            where: {
              id: senderAccountId,
            },
            data: {
              balance: senderAccount.balance - amount,
            },
          });
        
          // Update the receiver's account balance
          const updatedReceiverAccount = await this.prisma.account.update({
            where: {
              id: receiverAccountId,
            },
            data: {
              balance: receiverAccount.balance + amount,
            },
          });
        
          await this.transactionService.createTransaction(receiverAccountId, {
            receiver: receiverAccountId,
            amount: amount,
            balance: receiverAccount.balance + amount,
            sender: "",
            status: 'successful',
            type_of_transaction: 'Deposit',
          });
        
          return {
            senderAccount: updatedSenderAccount,
            receiverAccount: updatedReceiverAccount,
          };
        }
        
        
 async editAccountById(
    userId: number, 
    AccountId: number,
    dto: EditAccountDto, 
    ) {
        const account = await this.prisma.account.findUnique({
            where: {
                id: AccountId,
            },
        });
        if (!account || account.userId !== userId)
        throw new ForbiddenException(
            'Access to resources denied',
        );
        return this.prisma.account.update({
            where: {
                id: AccountId,
            },
            data: {
                ...dto,
            },
        });
    }

    async deleteAccountById(
        userId: number,
        AccountId: number,
    ){
        const account = await this.prisma.account.findUnique({
            where: {
                id: AccountId,
            },
        });
        if(!account || account.userId !== userId)
        throw new ForbiddenException(
            'Access to resources denied',
        );
        await this.prisma.account.delete({
            where: {
                id: AccountId,
            }
        })
    }
    
}

