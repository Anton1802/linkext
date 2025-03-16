import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module'; // Adjust the path to your app module
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /links', () => {
    it('should create and return a shortened URL', async () => {
      const originalUrl = 'http://example.com';

      const response = await request(app.getHttpServer())
        .post('/')
        .send({ url: originalUrl })
        .expect(201);

      expect(response.body).toEqual({
        original: originalUrl,
        shorten: expect.stringMatching(
          /^http:\/\/127.0.0.1:\d{1,5}\/[a-zA-Z0-9]{6}$/,
        ),
      });
    });
  });

  describe('GET /:shortCode', () => {
    it('should redirect to the original URL', async () => {
      const shortCode = 'abc123';
      const originalUrl = 'http://example.com';

      appService = app.get(AppService);
      jest
        .spyOn(appService, 'getLink')
        .mockResolvedValue({ original: originalUrl, shorten: shortCode });

      const response = await request(app.getHttpServer())
        .get(`/${shortCode}`)
        .expect(302);

      expect(response.headers.location).toBe(originalUrl);
    });
  });
});
