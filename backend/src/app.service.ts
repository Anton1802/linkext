import { HttpException, Injectable } from '@nestjs/common';
import { Link } from './schemas/link.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';

@Injectable()
export class AppService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  createLink(url: string) {
    try {
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
}
