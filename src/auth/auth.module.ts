import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';



@Module({
   imports: [
     PrismaModule,
     PassportModule,
     JwtModule.register({
     }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
 })
 export class AuthModule {}