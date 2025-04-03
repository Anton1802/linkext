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

  private async ensureUserExists(email: string) {
    if (!email) return;
    await this.userModel.findOneAndUpdate(
      { email },
      { $setOnInsert: { email, history: [] } },
      { upsert: true, new: false },
    );
  }

  private async addLinkToUserHistory(linkId: string, email: string) {
    if (!email) return;
    await this.userModel.updateOne({ email }, { $push: { history: linkId } });
  }

  async createLink(url: string, email: string) {
    try {
      await this.ensureUserExists(email);

      const cachedShort = await this.cacheManager.get<string>(url);
      if (cachedShort) {
        await this.addLinkToUserHistory(cachedShort, email);
        return { origin: url, shorten: cachedShort };
      }

      const existingLink = await this.linkModel.findOne({ original: url });
      if (existingLink) {
        await this.cacheManager.set(url, existingLink.shorten, 600000);
        await this.addLinkToUserHistory(existingLink.id as string, email);
        return existingLink;
      }

      const shortCode = nanoid(6);
      const newLink = await this.linkModel.create({
        shorten: shortCode,
        original: url,
      });

      await this.cacheManager.set(url, shortCode, 600000);
      await this.addLinkToUserHistory(newLink.id as string, email);

      return newLink;
    } catch (error) {
      throw new HttpException('Error: Create link, success with error', 500);
    }
  }

  getFullLink(shortCode: string) {
    return `http://${this.configService.get<string>('LINK_HOST')}:${this.configService.get<string>('LINK_PORT')}/${shortCode}`;
  }

  async getLink(shortCode: string): Promise<Link> {
    const link = await this.linkModel.findOne({ shorten: shortCode });
    if (!link) throw new HttpException('Not found', 404);
    return link;
  }

  async getHistoryUser(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .populate('history')
      .exec();
    if (!user) throw new NotFoundException('User not found!');
    return user.history;
  }

  @Cron('0 0 * * *')
  async deleteExpiredLinks() {
    await this.linkModel.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 86400000) },
    });
    this.logger.log('Deleted expired links');
  }
}
