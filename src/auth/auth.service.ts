import * as argon from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({}) //this is "Dependency injection"
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDTO: AuthDTO) {
    //generate hashpassword by argon2
    const hashedPassword = await argon.hash(authDTO.password); //vi method hash return Promise Data
    //insertdata
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword: hashedPassword,
          firstName: 'vinh2',
          lastName: 'vo',
        },
        // only select (response filed nao), default là trả về tất cả trong schema Prisma
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      //Return value
      return await this.signJwtToken(user.id, user.email);
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ForbiddenException('Error in credentials');
      }
      return e;
    }
  }
  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Wrong Pass or ID');
    }
    delete user.hashedPassword; //remove 1 field hashed password
    return await this.signJwtToken(user.id, user.email);
  }
  async convertToJwtString(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      accessToken: jwtString,
    };
  }
}
