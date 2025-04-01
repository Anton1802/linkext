import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Link } from './schemas/link.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';
import { Cron } from '@nestjs/schedule';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { User } from './schemas/user.schema';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectModel(Link.name) private linkModel: Model<Link>,
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async addLinkInUser(result: any, email: string) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      await this.userModel.updateOne(
        { email },
        { $push: { history: result._id } },
      );

      return;
    }

    await this.userModel.create({ email, history: [result._id] });
  }

  async createLink(url: string, email: string) {
    try {
      const cache = await this.cacheManager.get(url);

      if (cache) {
        this.logger.log('Data from cache: ', {
          origin: url,
          shorten: cache,
        });

        return {
          origin: url,
          shorten: cache,
        };
      }

      const existLink = await this.linkModel.findOne({ original: url });

      if (existLink) {
        await this.cacheManager.set(
          existLink.original,
          existLink.shorten,
          600000,
        );

        this.logger.log('Set cache data: ', {
          origin: url,
          shorten: existLink.shorten,
        });

        return existLink;
      }

      this.logger.log('Cache and exist record in database not found', url);

      const shortCode = nanoid(6);

      await this.cacheManager.set(url, shortCode, 600000);

      this.logger.log('Set cache data: ', {
        origin: url,
        shorten: shortCode,
      });

      const result = await this.linkModel.create({
        shorten: shortCode,
        original: url,
      });

      await this.addLinkInUser(result, email);

      // const user = await this.userModel
      //   .findOne({
      //     email,
      //   })
      //   .populate('history')
      //   .exec();

      return result;
    } catch (error) {
      return new HttpException(error, 500);
    }
  }

  getFullLink(shortCode: string) {
    const resultUrl = `http://${this.configService.getOrThrow<string>('LINK_HOST')}:${this.configService.getOrThrow<string>('LINK_PORT')}/${shortCode}`;

    return resultUrl;
  }

  async getLink(shortCode: string): Promise<Link | HttpException> {
    const originalUrl = await this.linkModel.findOne({ shorten: shortCode });

    if (!originalUrl) {
      this.logger.log('Link not found', {
        origin: originalUrl,
        shorten: shortCode,
      });

      return new HttpException('Not found', 404);
    }

    this.logger.log('Get link: ', originalUrl);

    return originalUrl;
  }

  async getHistoryUser(email: string) {
    const user = await this.userModel
      .findOne({
        email,
      })
      .populate('history')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user?.history;
  }

  @Cron('0 0 * * *')
  async deleteExpiredLinks() {
    await this.linkModel.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 86400000) },
    });

    this.logger.log('Delete expired links');
  }
}
