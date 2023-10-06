import { Module } from '@nestjs/common';
import { PlayController } from './play.controller';
import { BullModule } from '@nestjs/bull';
import { PlayService } from './play.service';
import { PlayProcessor } from './play.processor';
import { PrismaService } from 'src/prisma.service';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'games',
    }),
    // BullBoardModule.forFeature({
    //   name: 'games',
    //   adapter: BullMQAdapter,
    // }),
    ConfigModule,
  ],
  controllers: [PlayController],
  providers: [PlayService, PlayProcessor, PrismaService],
})
export class PlayModule {}
