import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Render,
} from '@nestjs/common';
import { WindRhumbsService } from './wind-rhumbs.service';

const MINIO_URL = 'http://localhost:9000/wind-rhumbs';

@Controller('rhumbs')
export class WindRhumbsController {
  constructor(private readonly windRhumbs: WindRhumbsService) {}

  @Get()
  @Render('wind-tiles')
  tiles(@Query('minWindSpeed') minWindSpeed?: string) {
    const parsed = Number(minWindSpeed);
    const threshold =
      minWindSpeed === undefined || minWindSpeed === '' || Number.isNaN(parsed)
        ? 0
        : parsed;

    const rhumbs = this.windRhumbs.findAll(threshold).map((rhumb) => ({
      ...rhumb,
      likesCount: rhumb.likes.length,
    }));

    return {
      rhumbs,
      minWindSpeed: minWindSpeed ?? '',
      minioUrl: MINIO_URL,
    };
  }

  @Get('draft')
  @Render('wind-draft')
  draft() {
    const rhumb = this.windRhumbs.findDraft();

    if (!rhumb) {
      throw new NotFoundException('Черновик румба не найден');
    }

    return {
      rhumb,
      likesCount: rhumb.likes.length,
      minioUrl: MINIO_URL,
    };
  }

  @Get('feed/:id')
  @Render('wind-feed')
  feed(
    @Param('id', ParseIntPipe) id: number,
    @Query('next') next?: string,
  ) {
    const rhumb =
      next === 'true' ? this.windRhumbs.findNext(id) : this.windRhumbs.findById(id);

    if (!rhumb) {
      throw new NotFoundException('Румб ветра не найден');
    }

    return {
      rhumb,
      likesCount: rhumb.likes.length,
      minioUrl: MINIO_URL,
    };
  }
}
