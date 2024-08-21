import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  constructor() {}
  // path: .../users/me
  //   @UseGuards(AuthGuard('jwt')) //co the dung AuthGuard
  @UseGuards(MyJwtGuard) //custom AuthGuard decorator
  @Get('me')
  //   me(@Req() request: Request) { //Cach dung cu~
  me(@GetUser() user: User) {
    //sau khi co Decorator
    //no protection !
    //we need "Guard" to protect
    return user;
  }
}
