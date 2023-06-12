import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { JwtGuard } from "./guard";



@Controller('auth')
export class AuthController{
   
  constructor(private authService: AuthService) {}
  @Post('signup')  
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @Post('signin')  
  signin(@Body() dto: AuthDto){
    return this.authService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @Post('signout')
  async signOut(@Request() req) {
    req.res.clearCookie('access_token');
    req.res.clearCookie('refresh_token');
    return { message: 'Sign-out successful' };
  }
  
} 