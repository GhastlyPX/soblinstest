import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayModule } from './play/play.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // BullModule.forRoot({
    //   redis: {
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    //   url: process.env.REDIS_URL,
    // }),
    ScheduleModule.forRoot(),
    // BullBoardModule.forRoot({
    //   route: '/',
    //   adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    // }),
    PlayModule,
    CronModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
