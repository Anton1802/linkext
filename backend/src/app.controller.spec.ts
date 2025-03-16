import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  // Regular expression to match 6 alphanumeric characters after the base URL
  const shortenUrlRegex = /^http:\/\/localhost:3000\/[a-zA-Z0-9]{6}$/;

  beforeEach(async () => {
    const mockAppService = {
      createLink: jest.fn(),
      getLink: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
        ConfigService,
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
    mockRequest = {
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost:3000'),
    };
    mockResponse = {
      redirect: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('createLink', () => {
    it('should return shortened URL that matches the expected pattern', async () => {
      const mockUrl = 'http://example.com';
      const mockShortenedUrl = { shorten: 'abc123' };

      appService.createLink = jest.fn().mockResolvedValue(mockShortenedUrl);

      const result = await appController.createLink(
        { url: mockUrl },
        mockRequest as Request,
      );

      // Check if the shortened URL matches the regular expression pattern
      expect(result).toEqual({
        original: mockUrl,
        shorten: expect.stringMatching(shortenUrlRegex), // Use regex to validate the shortened URL
      });

      expect(appService.createLink).toHaveBeenCalledWith(mockUrl);
    });

    it('should throw error if createLink fails', async () => {
      const mockUrl = 'http://example.com';
      const mockError = new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      appService.createLink = jest.fn().mockResolvedValue(mockError);

      try {
        await appController.createLink(
          { url: mockUrl },
          mockRequest as Request,
        );
      } catch (error) {
        expect(error.response).toBe('Internal server error');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('getLink', () => {
    it('should redirect to original link', async () => {
      const randomShortCode = 'abc123'; // This is just a mock short code
      const mockLink = { original: 'http://example.com' };
      appService.getLink = jest.fn().mockResolvedValue(mockLink);

      await appController.getLink(randomShortCode, mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(mockLink.original);
    });

    it('should throw error if link is not found', async () => {
      const randomShortCode = 'abc123'; // This is just a mock short code
      const mockError = new HttpException('Not found', HttpStatus.NOT_FOUND);
      appService.getLink = jest.fn().mockResolvedValue(mockError);

      try {
        await appController.getLink(randomShortCode, mockResponse as Response);
      } catch (error) {
        expect(error.response).toBe('Not found');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
