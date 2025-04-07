import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  signIn(user) {
    return this.generateJwt({
      sub: user.id,
      email: user.email,
      avatar: user.avatar,
      name: user.name,
    });
  }
}
