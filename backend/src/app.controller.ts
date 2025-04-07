import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { EmailInterceptor } from './auth/interceptors/user.interceptor';
import { RequestWithUser } from './interfaces/request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(EmailInterceptor)
  @Post()
  async createLink(
    @Body() link: { url: string },
    @Req() request: RequestWithUser,
  ) {
    const linkUrl = await this.appService.createLink(
      link.url,
      request.user?.email,
    );

    if (linkUrl instanceof HttpException) {
      throw new HttpException(
        linkUrl.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (linkUrl.shorten && typeof linkUrl.shorten === 'string') {
      const resultUrl = this.appService.getFullLink(linkUrl.shorten);

      return {
        original: link.url,
        shorten: resultUrl,
      };
    }
  }

  @UseInterceptors(EmailInterceptor)
  @Get('/:shortCode')
  async getLink(
    @Param('shortCode') shortCode: string,
    @Res() response: Response,
  ) {
    const link = await this.appService.getLink(shortCode);

    if (link instanceof HttpException) {
      throw new HttpException('Not found', 404);
    }

    return response.redirect(link.original);
  }

  @UseInterceptors(EmailInterceptor)
  @Get('/user-history/:email')
  async getHistoryUser(@Param('email') email: string) {
    if (!email) {
      return new BadRequestException('Not transfer email!');
    }
    const history = await this.appService.getHistoryUser(email);
    return history;
  }
}
