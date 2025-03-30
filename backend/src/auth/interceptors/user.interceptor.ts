import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    let token = null;

    if (request && request.cookies) {
      token = request.cookies['access_token'];
    }

    if (!token) {
      request.user = null;

      return next.handle();
    }

    try {
      const secretKey = this.configService.getOrThrow<string>('JWT_SECRET');
      const decoded: any = jwt.verify(token, secretKey);
      request.user = {
        email: decoded.email,
        avatar: decoded.avatar,
        name: decoded.name,
      };
      return next.handle();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
