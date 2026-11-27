import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class LocationsService {
  constructor (private readonly db: PrismaService) {}
  create(createLocationDto: CreateLocationDto) {
    return this.db.location.create({
      data:createLocationDto
    });
  }

  findAll() {
    return this.db.location.findMany()
  }

  findOne(id: number) {
    return this.db.location.findUniqueOrThrow({
      where:{id}
    })
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.db.location.update(
      {
        data:updateLocationDto,
        where:{id}
      }
    )
  }

  remove(id: number) {
    return this.db.location.delete({where:{id}});
  }
}
