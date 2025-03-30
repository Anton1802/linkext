import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirects to Google authentication
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 18000000,
      sameSite: true,
      secure:
        this.configService.getOrThrow('NODE_ENV') === 'production'
          ? true
          : false,
    });

    const frontedUrl = process.env.ALLOWED_ORIGINS?.split(',') || [];

    return res.redirect(frontedUrl[0]);
  }
}
