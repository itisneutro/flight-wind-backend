import { Module } from '@nestjs/common';
import { WindRhumbsModule } from './wind-rhumbs/wind-rhumbs.module';

@Module({
  imports: [WindRhumbsModule],
})
export class AppModule {}
