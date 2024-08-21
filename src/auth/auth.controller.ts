import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth') //Route cho http:hostname/auth/...
export class AuthController {
  //auth service is automatically created when initializing the controller
  //khi controller được tạo ra thì service sẽ tạo ra
  constructor(private authService: AuthService) {}
  //some request from client
  //  ...../auth/register
  @Post('/register') //register a new user
  register(@Body() body: AuthDTO) {
    // not validate using class-validator AND class-transformer
    return this.authService.register(body);
  }
  //  ...../auth/login
  @Post('/login') //register a new user
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }
}
