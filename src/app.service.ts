import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import { identity } from 'rxjs';

@Injectable()
export class AppService {
  private readonly db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db
  }
  getHello(): string {
    return 'Hello World!';
  }
  weather() {
    return this.db.forecast.findMany();
  }
  getSingleWeather(id: number) {
    return this.db.forecast.findUniqueOrThrow({
      where: { id }
    })
  }
  deleteSingleWeather(id: number) {
    return this.db.forecast.delete({
      where: { id }
    })
  }

}
