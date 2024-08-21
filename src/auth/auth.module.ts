import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategy';

//WE NEED TO ACCESS PRISMA-SERVICE here!
@Module({
  // imports: [PrismaModule, JwtModule.register({})],
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], //chu yeu la cac service
})
export class AuthModule {}
