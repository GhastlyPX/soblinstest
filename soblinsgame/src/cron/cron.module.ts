import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MissedGamesCron } from './missedGamesCron';

@Module({
  providers: [MissedGamesCron, PrismaService],
})
export class CronModule {}
