import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body()  dto: AuthDto) {
        return this.authService.signup(dto);
    }
 
    @Post('signin')
    signin(@Body()  dto: AuthDto) {
        return this.authService.login(dto);
    }

    @Get('logout')
    logout(@Req() req: any) {

    // req.session.destroy(); 
    
    return {
      message: 'Logout successful',
    };
  }
}