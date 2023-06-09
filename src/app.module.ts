import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';



@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,   
    }),  
    UserModule,
    AccountModule,
    TransactionModule, 
    PrismaModule],
   
})
export class AppModule {}
