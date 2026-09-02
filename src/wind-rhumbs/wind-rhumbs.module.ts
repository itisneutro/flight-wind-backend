import { Module } from '@nestjs/common';
import { WindRhumbsController } from './wind-rhumbs.controller';
import { WindRhumbsService } from './wind-rhumbs.service';

@Module({
  controllers: [WindRhumbsController],
  providers: [WindRhumbsService],
})
export class WindRhumbsModule {}
