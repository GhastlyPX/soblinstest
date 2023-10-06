import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PlayService } from './play.service';

@Controller('play')
export class PlayController {
  private readonly logger = new Logger(PlayController.name);
  constructor(private readonly PlayService: PlayService) {}

  @Post('playGame')
  async playGame(
    @Body() payload: { serializedTx: string; location: string },
    @Res() res: Response,
  ) {
    try {
      const result: any = await this.PlayService.playGame({
        transaction: payload.serializedTx,
        location: payload.location,
      }).then((r) => {
        return r;
      });
      if (result?.status === 400) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: result.response.message,
          name: result.response.name,
        });
      } else if (result.status === 200) {
        return res.status(HttpStatus.OK).json({
          message: result.response.message,
          name: result.response.name,
        });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
