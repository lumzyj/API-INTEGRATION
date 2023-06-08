import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'; 

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {
        // Generate the password hash
        const hash = await argon.hash(dto.password); 

        // Save the new user in the database
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hash,
                fullName: dto.fullName,
                pin: dto.pin,
            
            },
        });

        // Return the saved user
        return user;
    }

    signin() {
        return { msg: 'I have signed in' };
    }
}


