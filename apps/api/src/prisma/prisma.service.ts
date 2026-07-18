import { Injectable, OnModuleInit } from '@nestjs/common';
import { prisma } from './client';

@Injectable()
export class PrismaService implements OnModuleInit {
  public client = prisma;
  
  async onModuleInit() {
    await this.client.$connect();
  }
}

