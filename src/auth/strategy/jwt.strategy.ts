import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, public prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //mỗi request yêu cầu đăng nhập, phải có token, tức là mỗi request phải có header: token kèm them
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  //Must have, vì GUARD cần phải JWT, và validate
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hashedPassword //xoa luon, de khi return tu response ve no kem truong hashedpassword
    return user;
  }
}
