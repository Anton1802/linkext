import { HttpException, Injectable } from '@nestjs/common';
import { Link } from './schemas/link.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  async createLink(url: string) {
    try {
      const existLink = await this.linkModel.findOne({ original: url });

      if (existLink) {
        return existLink;
      }

      const shortCode = nanoid(6);

      return this.linkModel.create({ shorten: shortCode, original: url });
    } catch (error) {
      return new HttpException(error, 500);
    }
  }

  async getLink(shortCode: string): Promise<Link | HttpException> {
    const originalUrl = await this.linkModel.findOne({ shorten: shortCode });

    if (!originalUrl) {
      return new HttpException('Not found', 404);
    }

    return originalUrl;
  }

  @Cron('0 0 * * *')
  async deleteExpiredLinks() {
    await this.linkModel.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 86400000) },
    });
  }
}
