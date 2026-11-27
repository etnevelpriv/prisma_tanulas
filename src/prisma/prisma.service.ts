import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    const adapter = new PrismaMariaDb({
      host: configService.getOrThrow<string>('DATABASE_HOST'),
      user: configService.getOrThrow<string>('DATABASE_USER'),
      password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
      port: configService.getOrThrow<number>('DATABASE_PORT'),
      database: configService.getOrThrow<string>('DATABASE_DB'),
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
