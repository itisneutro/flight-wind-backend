import { Injectable } from '@nestjs/common';
import { WindRhumb } from './wind-rhumb.interface';
import { WIND_RHUMBS } from './wind-rhumbs.data';

@Injectable()
export class WindRhumbsService {
  private readonly rhumbs: WindRhumb[] = WIND_RHUMBS;

  findAll(minAzimuth = 0): WindRhumb[] {
    return this.rhumbs.filter(
      (rhumb) =>
        rhumb.status === 'published' &&
        rhumb.rhumbGeographicAzimuthDeg >= minAzimuth,
    );
  }

  findById(id: number): WindRhumb | undefined {
    return this.rhumbs.find(
      (rhumb) => rhumb.id === id && rhumb.status !== 'deleted',
    );
  }

  findNext(id: number): WindRhumb | undefined {
    const published = this.rhumbs
      .filter((rhumb) => rhumb.status === 'published')
      .sort((left, right) => left.id - right.id);

    return published.find((rhumb) => rhumb.id > id) ?? published[0];
  }

  findDraft(): WindRhumb | undefined {
    return this.rhumbs.find((rhumb) => rhumb.status === 'draft');
  }
}
